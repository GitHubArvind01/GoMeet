import bycrypt from "bcryptjs";
import userModel from "../models/User.js";
import transporter from "../config/nodemailer.js";
import {generateToken} from "../services/tokenService.js";
import addMinutes from "../utils/addMinutes.js";
import generateCode from "../utils/generateCode.js";
import {
  EMAIL_VERIFY_TEMPLATE,
  PASSWORD_RESET_TEMPLATE,
} from "../services/emailService.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Missing details" });
  }

  try {
    let user = await userModel.findOne({ email });

    // If user exists and is already verified
    if (user && user.isAccountVerified) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bycrypt.hash(password, 10);

    // If user exists but not verified → update password & resend OTP
    if (user && !user.isAccountVerified) {
      user.name = name; // optional, update name if needed
      user.password = hashedPassword;

      // Generate OTP
      const otp = generateCode();
      user.verifyOtp = otp;
      user.verifyOtpExpireAt = addMinutes(new Date(), 24 * 60);
      await user.save();

      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: user.email,
        subject: "Verify your account",
        html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}", user.email),
      };
      await transporter.sendMail(mailOptions);

      return res.json({
        success: true,
        message: "user not verified yet. OTP resent to your email.",
        userId: user._id,
      });
    }

    // If user does not exist → create new
    user = new userModel({ name, email, password: hashedPassword });

    // Generate OTP
    const otp = generateCode();
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = addMinutes(new Date(), 24 * 60);
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Verify your account",
      html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}", user.email),
    };
    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "Registration successful! Please verify your email.",
      userId: user._id,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// Verify the Email using the OTP
export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    return res.json({ success: false, message: "Missing details" });
  }

  try {
    const user = await userModel.findById(userId);
    if(user.isAccountVerified){
      return res.json({success:false , message : "user already verified!"});
    }
    if (!user) return res.json({ success: false, message: "User not found" });

    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();

    // Generate token now that the user is verified
    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: "Email verified successfully"});
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};




export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and Password are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invalid Email" });
    }

    const isMatch = await bycrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Password" });
    }
    
    //if user would not verified yet but still trying to login then 
    // New (Returns userId for client to use in verification step)
      if (user && !user.isAccountVerified){
        return res.json({
          success: false, 
          code: "UNVERIFIED", // Added code for robust client checks
          message: "Please verify your email!",
          userId: user._id 
        });
      }
    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Check if user is authenticated
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Send Password Reset OTP
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const otp = generateCode();
    user.resetOtp = otp;
    user.resetOtpExpireAt = addMinutes(new Date(), 24 * 60);

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      // text: `Your OTP for resetting your password is ${otp}. Use this OTP to proceed with resetting your password.`,
      html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace(
        "{{email}}",
        user.email
      ),
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Reset User Password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res.json({
      success: false,
      message: "Email, OTP, and New Password are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }

    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" });
    }

    const hashedPassword = await bycrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    await user.save();

    return res.json({
      success: true,
      message: "Password has been reset successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


// Resend Verification OTP
export const resendCode = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.isAccountVerified) {
      return res.status(400).json({ success: false, message: "User is already verified" });
    }

    // Generate a new OTP
    const otp = generateCode();
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = addMinutes(new Date(), 24 * 60); // 24 hours
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Verify your account - OTP Resent",
      html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email),
    };

    await transporter.sendMail(mailOptions);

    return res.json({ 
      success: true, 
      message: "OTP has been resent to your email", 
      userId: user._id 
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
