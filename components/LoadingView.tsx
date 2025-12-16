
import React from 'react';

export const LoadingView: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in-up">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Outer Ring */}
        <div className="absolute inset-0 border border-purple-500/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
        <div className="absolute inset-0 border-t border-purple-400/60 rounded-full animate-[spin_3s_linear_infinite]"></div>
        
        {/* Middle Ring */}
        <div className="absolute inset-4 border border-blue-500/20 rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>
        <div className="absolute inset-4 border-b border-blue-400/60 rounded-full animate-[spin_4s_linear_infinite_reverse]"></div>
        
        {/* Inner Core */}
        <div className="absolute inset-0 m-auto w-24 h-24 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-full blur-xl animate-pulse-glow opacity-80"></div>
        <div className="absolute inset-0 m-auto w-20 h-20 bg-black rounded-full flex items-center justify-center z-10 border border-white/10 backdrop-blur-md">
            <span className="text-3xl animate-bounce">✨</span>
        </div>
      </div>
      
      <div className="mt-12 text-center space-y-2">
        <h3 className="text-2xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-blue-200 tracking-widest">
            ALIGNING STARS
        </h3>
        <div className="flex justify-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce delay-0"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce delay-100"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce delay-200"></span>
        </div>
        <p className="text-slate-400 text-xs font-light tracking-wide uppercase opacity-70">
            Translating celestial coordinates
        </p>
      </div>
    </div>
  );
};
