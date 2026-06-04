import { useNavigate } from "react-router-dom";
import { Brain, ArrowLeft, Home } from "lucide-react";
import Button from "./ui/button";
import Card from "./ui/card";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-col justify-center items-center bg-[#4356D6] dark:bg-[#0F172A] min-h-screen w-screen overflow-hidden selection:bg-indigo-500/30 transition-colors duration-200">
      
      {/* Decorative background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-white/10 dark:bg-indigo-600/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-400/20 dark:bg-blue-600/20 blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center justify-center p-6 md:p-8 max-w-2xl w-full mx-auto text-center">
        
        {/* Animated Brain Icon Container */}
        <div className="mb-6 md:mb-8 relative group">
          <div className="absolute inset-0 bg-white/20 dark:bg-indigo-500/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative bg-white/10 dark:bg-slate-800/50 p-5 md:p-6 rounded-full border border-white/20 dark:border-slate-700/50 backdrop-blur-md shadow-2xl animate-bounce">
            <Brain className="w-14 h-14 md:w-16 md:h-16 text-white dark:text-indigo-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] dark:drop-shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-transform duration-300 group-hover:scale-110" />
          </div>
        </div>

        {/* 404 Typography */}
        <h1 className="text-7xl md:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 dark:from-white dark:to-slate-400 drop-shadow-sm mb-2 select-none">
          404
        </h1>
        
        {/* Messages */}
        <Card variant="none" size="none" className="bg-white/10 dark:bg-slate-900/40 backdrop-blur-lg border border-white/20 dark:border-slate-700/50 rounded-3xl p-8 md:p-10 shadow-2xl w-full max-w-lg mb-8 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/10">
          
          <h2 className="text-2xl md:text-3xl font-bold text-white dark:text-slate-100 mb-2">
            Page Not Found
          </h2>
          
          <p className="text-indigo-100 dark:text-slate-400 text-xs md:text-sm mb-6 font-semibold tracking-widest uppercase opacity-90">
            Lost in your second brain?
          </p>
          
          <p className="text-white/90 dark:text-slate-300 text-sm md:text-base mb-8 leading-relaxed max-w-sm mx-auto">
            The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
            <Button
              variant="none"
              size="none"
              onClick={() => navigate(-1)}
              className="group flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 dark:bg-slate-800/50 hover:bg-white/20 dark:hover:bg-slate-700/80 text-white border border-white/20 dark:border-slate-600 transition-all duration-300 font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              Go Back
            </Button>
            <Button
              variant="none"
              size="none"
              onClick={() => navigate('/')}
              className="group flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-white dark:bg-indigo-600 hover:bg-gray-100 dark:hover:bg-indigo-500 text-[#4356D6] dark:text-white shadow-[0_0_20px_rgba(255,255,255,0.3)] dark:shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all duration-300 font-semibold cursor-pointer"
            >
              <Home className="w-5 h-5 transition-transform group-hover:scale-110" />
              Go Home
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PageNotFound;
