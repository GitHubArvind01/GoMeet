import { Video, Keyboard } from 'lucide-react'; 

const Hero = () => {
  return (

    
    <div className="relative bg-gradient-to-br from-blue-100 to-purple-200 min-h-[calc(100vh-61.5px)] flex items-center px-8 py-16 overflow-hidden">
      {/* Text Section */}
      <div className="z-10 max-w-xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Schedule and join secure interviews, 24/7
        </h1>
        <p className="text-gray-600 mb-8">
          Built-in anti-cheat features for honest hiring
        </p>
        <div className="flex gap-4 flex-wrap">
          <a href="/schedule">
             <button className="cursor-pointer flex items-center gap-2 bg-indigo-900 text-white px-6 py-3 rounded-full text-base font-semibold shadow-md hover:bg-indigo-800 transition ">
            <Video className="w-5 h-5" />
            Schedule a new Meeting
          </button>
          </a>
          <a href="/JoinMeet">
            <button className="cursor-pointer flex items-center gap-2 bg-gray-200 text-indigo-900 px-6 py-3 rounded-full text-base font-semibold hover:bg-gray-300 transition">
            <Keyboard className="w-5 h-5" />
            Join a Meeting
          </button>
          </a>
        </div>
      </div>

      {/* Purple Circle */}
      <div className="absolute -right-70 -bottom-80 w-[700px] h-[700px] bg-purple-500 rounded-full opacity-70 z-0"></div>
    </div>
  );
};

export default Hero;