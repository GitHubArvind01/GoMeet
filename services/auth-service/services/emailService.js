export const EMAIL_VERIFY_TEMPLATE = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Email Verify</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background: #f4f4f4;
    }
    .container {
      max-width: 600px;
      margin: 50px auto;
      padding: 30px;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      text-align: center;
    }
    h2 {
      color: #333;
      font-size: 22px;
      margin-bottom: 20px;
    }
    p {
      font-size: 16px;
      color: #555;
      margin: 10px 0;
    }
    .otp {
      display: inline-block;
      font-size: 28px;
      font-weight: bold;
      letter-spacing: 6px;
      color: #4CAF50;
      background: #e6f7ee;
      padding: 15px 25px;
      border-radius: 8px;
      margin: 20px 0;
    }
    small {
      font-size: 12px;
      color: #999;
      display: block;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Verify your email</h2>
    <p>You are just one step away to verify your account for this email: <strong>{{email}}</strong>.</p>
    <p>Use the OTP below to verify your account.</p>
    <div class="otp">{{otp}}</div>
    <p>This OTP is valid for 24 hours.</p>
    <small>If you didn't request this, you can safely ignore this email.</small>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Password Reset</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background: #f4f4f4;
    }
    .container {
      max-width: 600px;
      margin: 50px auto;
      padding: 30px;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      text-align: center;
    }
    h2 {
      color: #333;
      font-size: 22px;
      margin-bottom: 20px;
    }
    p {
      font-size: 16px;
      color: #555;
      margin: 10px 0;
    }
    .otp {
      display: inline-block;
      font-size: 28px;
      font-weight: bold;
      letter-spacing: 6px;
      color: #4CAF50;
      background: #e6f7ee;
      padding: 15px 25px;
      border-radius: 8px;
      margin: 20px 0;
    }
    small {
      font-size: 12px;
      color: #999;
      display: block;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Forgot your password?</h2>
    <p>We received a password reset request for your account: <strong>{{email}}</strong>.</p>
    <p>Use the OTP below to reset your password.</p>
    <div class="otp">{{otp}}</div>
    <p>The password reset OTP is only valid for the next 15 minutes.</p>
    <small>If you didn't request this, you can safely ignore this email.</small>
  </div>
</body>
</html>
`;
