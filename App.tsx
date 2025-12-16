
import React, { useState, useEffect } from 'react';
import { AppState, UserInputs, AnalysisResult } from './types';
import { InputForm } from './components/InputForm';
import { LoadingView } from './components/LoadingView';
import { ResultsView } from './components/ResultsView';
import { generateAstrologyInsights } from './services/geminiService';
import { AlertCircle, Moon, Sun, Stars } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INPUT);
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  useEffect(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleAnalysis = async (inputs: UserInputs) => {
    setAppState(AppState.LOADING);
    setErrorMsg('');
    
    try {
      const result = await generateAstrologyInsights(inputs);
      setAnalysisData(result);
      setAppState(AppState.RESULTS);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Please check your inputs and try again.");
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setAnalysisData(null);
    setAppState(AppState.INPUT);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden font-sans transition-colors duration-500 flex flex-col">
        
        {/* Dynamic Background */}
        <div className="fixed inset-0 z-0 transition-opacity duration-1000 pointer-events-none">
            {isDarkMode ? (
                // Dark Mode: Deep Space
                <>
                    <div className="absolute inset-0 bg-slate-900"></div>
                    <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-900/20 rounded-full blur-[80px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-900/20 rounded-full blur-[80px]"></div>
                    {/* Simple Stars */}
                    <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full opacity-50"></div>
                    <div className="absolute top-1/4 left-1/3 w-0.5 h-0.5 bg-white rounded-full opacity-70"></div>
                    <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-purple-300 rounded-full opacity-60"></div>
                </>
            ) : (
                // Light Mode: Ethereal Dawn
                <>
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px]"></div>
                </>
            )}
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 container mx-auto px-4 flex-grow flex flex-col min-h-screen">
            
            {/* Header - Now part of the flex flow (prevents overlap) */}
            <div className="flex items-center justify-between py-6 shrink-0">
                <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity cursor-pointer" onClick={handleReset}>
                    <Stars className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span className="font-serif font-bold tracking-widest text-sm text-slate-800 dark:text-slate-100">COSMIC.AI</span>
                </div>
                
                <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md border border-black/5 dark:border-white/10 hover:bg-white/30 dark:hover:bg-white/10 transition-colors text-slate-700 dark:text-slate-200 shadow-sm"
                    title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                    {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
            </div>

            {/* Main Content Area - Flex grow ensures centering when space allows, but scrolling when needed */}
            <div className="flex-grow flex flex-col justify-center py-4">
                {appState === AppState.INPUT && (
                    <InputForm onSubmit={handleAnalysis} isLoading={false} />
                )}

                {appState === AppState.LOADING && (
                   <LoadingView />
                )}

                {appState === AppState.RESULTS && analysisData && (
                    <ResultsView data={analysisData} onReset={handleReset} />
                )}

                {appState === AppState.ERROR && (
                    <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in-up">
                        <div className="p-8 glass-panel rounded-2xl max-w-md text-center border border-red-500/30 shadow-lg">
                            <div className="w-16 h-16 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                                <AlertCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-slate-800 dark:text-white mb-3">Connection Interrupted</h3>
                            <p className="text-slate-600 dark:text-slate-300 mb-8 font-light leading-relaxed">{errorMsg}</p>
                            <button 
                                onClick={handleReset}
                                className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-500 hover:to-orange-500 transition-all font-medium tracking-wide shadow-md"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Footer space/copyright if needed, or just bottom padding */}
            <div className="h-6 shrink-0"></div>
        </div>
    </div>
  );
};

export default App;
