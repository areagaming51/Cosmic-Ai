
import React, { useState } from 'react';
import { AnalysisResult, CompatibilityReport, DecisionAnalysis } from '../types';
import { 
  Heart, Briefcase, Zap, ShieldAlert, Star, 
  ArrowLeft, Leaf, User, Calendar, Share2, Printer, CheckCircle2, XCircle,
  MessageCircle, AlertTriangle, Gamepad2, Sun,
  Wind, Link, Sparkles, Flame, Coins, Lock, Users,
  Compass, AlertOctagon, TrafficCone
} from 'lucide-react';

interface ResultsViewProps {
  data: AnalysisResult;
  onReset: () => void;
}

// Simplified Labels
const UI_LABELS: Record<string, any> = {
  en: {
    relationshipAnalysis: "Relationship Match",
    match: "Score",
    coupleWeeklyForecast: "Shared Week Ahead",
    doTogether: "Do Together",
    avoidConflicts: "Avoid",
    communication: "Talk",
    betterConnectionTips: "Connection",
    pitfalls: "Watch Out",
    chemistryWealth: "Chemistry & Money",
    intimacyVibe: "Intimacy",
    financialLuck: "Finances",
    auspiciousMilestones: "Future Milestones",
    culturalVibe: "Cosmic Vibe",
    luckyFactors: "Lucky Items",
    luckyElements: "Elements",
    colors: "Colors",
    direction: "Path",
    numbers: "Numbers",
    places: "Places",
    activities: "Activities",
    deity: "Symbol",
    cosmicSummary: "Cosmic Profile",
    spiritAnimal: "Spirit Animal",
    weeklyForecast: "Weekly Forecast",
    focusOn: "Focus On",
    avoidThisWeek: "Avoid",
    lifeBalance: "Balance",
    relationshipBalance: "Relationship Balance",
    luckyDays: "Lucky Days",
    personalityVibe: "Personality",
    loveRelationships: "Love Life",
    careerWealth: "Career & Cash",
    vitalityHealth: "Health",
    areasToAvoid: "Pitfalls",
    strengthBoosters: "Strengths",
    practicalTips: "Quick Tips",
    share: "Share",
    print: "PDF",
    newAnalysis: "New",
    pokemonPartner: "Pokemon Match",
    linkCopied: "Link Copied",
    decisionSupport: "Decision Compass",
    verdict: "Verdict",
    bestAction: "Best Action",
    riskNote: "Risk Note",
    timingTip: "Timing Tip"
  }
};

const PlanetaryBalance: React.FC<{ scores: any, labels: any, mode?: 'individual' | 'compatibility' }> = ({ scores, labels, mode = 'individual' }) => {
    
    const safeScores = scores || {};

    const individualPlanets = [
        { key: 'love', label: labels.love || 'Love', color: 'bg-rose-500', radius: 60, speed: '25s' },
        { key: 'career', label: labels.career || 'Career', color: 'bg-amber-400', radius: 95, speed: '32s' },
        { key: 'health', label: labels.health || 'Health', color: 'bg-emerald-400', radius: 130, speed: '40s' },
        { key: 'family', label: labels.family || 'Family', color: 'bg-blue-400', radius: 165, speed: '48s' },
        { key: 'spirituality', label: labels.spirituality || 'Spirit', color: 'bg-purple-400', radius: 200, speed: '60s' },
    ];

    const compatibilityPlanets = [
        { key: 'intimacy', label: 'Intimacy', color: 'bg-rose-500', radius: 60, speed: '25s' },
        { key: 'trust', label: 'Trust', color: 'bg-blue-400', radius: 95, speed: '32s' },
        { key: 'communication', label: 'Talk', color: 'bg-purple-400', radius: 130, speed: '40s' },
        { key: 'fun', label: 'Fun', color: 'bg-amber-400', radius: 165, speed: '48s' },
        { key: 'growth', label: 'Growth', color: 'bg-emerald-400', radius: 200, speed: '60s' },
    ];

    const planets = mode === 'compatibility' ? compatibilityPlanets : individualPlanets;

    return (
        <div className="relative w-full aspect-square max-w-[420px] mx-auto flex items-center justify-center my-10 group select-none">
            <div className="absolute z-10 w-20 h-20 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-[0_0_30px_rgba(250,204,21,0.4)] flex items-center justify-center border-4 border-yellow-100/20">
                {mode === 'compatibility' ? (
                    <Users className="w-10 h-10 text-yellow-900" />
                ) : (
                    <User className="w-10 h-10 text-yellow-900" />
                )}
            </div>

            {planets.map((planet, i) => (
                <div 
                    key={`ring-${i}`}
                    className="absolute rounded-full border border-slate-200 dark:border-white/5 pointer-events-none"
                    style={{ 
                        width: `${planet.radius * 2}px`, 
                        height: `${planet.radius * 2}px`,
                    }}
                />
            ))}

            {planets.map((planet, i) => {
                const score = safeScores[planet.key] || 50;
                const scale = 0.8 + ((score - 50) / 120); 

                return (
                    <div 
                        key={`planet-${i}`}
                        className="absolute rounded-full flex items-center justify-center animate-orbit pause-on-hover transform-gpu will-change-transform"
                        style={{ 
                            width: `${planet.radius * 2}px`, 
                            height: `${planet.radius * 2}px`,
                            '--duration': planet.speed,
                        } as React.CSSProperties}
                    >
                        <div 
                            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center animate-orbit-reverse pause-on-hover transform-gpu will-change-transform"
                            style={{ '--duration': planet.speed } as React.CSSProperties}
                        >
                             <div 
                                className={`relative w-6 h-6 rounded-full ${planet.color} shadow-lg ring-2 ring-white/20 cursor-pointer transition-transform duration-300 hover:scale-125 z-20`}
                                style={{ transform: `scale(${scale})` }}
                             >
                                 <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full border border-black/5 dark:border-white/10 shadow-sm z-30 pointer-events-none">
                                     <span className="text-[9px] font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                                        {planet.label} {score}%
                                     </span>
                                 </div>
                             </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const HolographicCard: React.FC<{ 
    title: string; 
    name: string; 
    sub: string; 
    desc: string; 
    icon: React.ReactNode; 
    color: string 
}> = ({ title, name, sub, desc, icon, color }) => {
    return (
        <div className="group relative w-full h-full">
            <div className="relative w-full h-full bg-white/60 dark:bg-black/40 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-2xl p-5 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded bg-white/30 dark:bg-white/5 border border-white/30 dark:border-white/10 ${color}`}>
                            {title}
                        </span>
                        <div className="p-1.5 bg-white/30 dark:bg-white/10 rounded-full">
                            {icon}
                        </div>
                    </div>
                    
                    <div className="mt-auto">
                        <h3 className="text-xl font-serif font-bold text-slate-800 dark:text-white mb-1 leading-tight">
                            {name}
                        </h3>
                        <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">{sub}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-light opacity-90">
                            {desc}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InsightCard: React.FC<{
  title: string;
  items: string[];
  icon: React.ReactNode;
}> = ({ title, items, icon }) => (
  <div className="glass-card-premium p-5 rounded-2xl h-full flex flex-col">
    <div className="flex items-center gap-3 mb-4 border-b border-slate-200 dark:border-white/5 pb-2">
      <div className="p-1.5 bg-purple-100 dark:bg-white/10 rounded-lg text-purple-600 dark:text-purple-200">
        {icon}
      </div>
      <h3 className="font-serif font-bold text-base text-slate-800 dark:text-slate-100 tracking-wide">{title}</h3>
    </div>
    <ul className="space-y-3 flex-grow">
      {items.map((item, idx) => (
        <li key={idx} className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed flex items-start gap-2.5">
          <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400 flex-shrink-0" />
          <span className="font-light">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const DecisionDashboard: React.FC<{ data: AnalysisResult, decision: DecisionAnalysis, labels: any }> = ({ data, decision, labels }) => {
    const getVerdictColor = (v: string) => {
        switch(v) {
            case 'Green': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
            case 'Yellow': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
            case 'Red': return 'text-red-500 bg-red-500/10 border-red-500/20';
            default: return 'text-slate-500';
        }
    };

    const getTrafficLight = (v: string) => {
         switch(v) {
            case 'Green': return <div className="w-16 h-16 rounded-full bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.5)] animate-pulse"></div>;
            case 'Yellow': return <div className="w-16 h-16 rounded-full bg-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.5)] animate-pulse"></div>;
            case 'Red': return <div className="w-16 h-16 rounded-full bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)] animate-pulse"></div>;
            default: return null;
        }
    }

    return (
        <div className="space-y-8">
            {/* COMPASS HEADER */}
            <div className="relative rounded-3xl overflow-hidden p-8 flex flex-col items-center justify-center text-center isolate shadow-xl border border-white/20 dark:border-white/5 bg-slate-100 dark:bg-cosmic-900">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-slate-200 dark:bg-white/5 rounded-full blur-[80px]"></div>
                
                <div className="relative z-10 flex flex-col items-center gap-6">
                    <div className="flex items-center gap-2 opacity-60">
                        <Compass className="w-4 h-4" />
                        <span className="text-xs uppercase tracking-[0.3em] font-bold">{labels.decisionSupport}</span>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        {getTrafficLight(decision.verdict)}
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-800 dark:text-white">
                            {decision.verdict.toUpperCase()}
                        </h2>
                    </div>

                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-200 max-w-lg font-light leading-relaxed">
                        {decision.reasoning}
                    </p>

                    <div className="flex gap-4 mt-2">
                        <div className="px-4 py-2 rounded-lg bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs font-mono">
                            MOON: {decision.moonPhase}
                        </div>
                        <div className="px-4 py-2 rounded-lg bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs font-mono">
                            NAKSHATRA: {decision.nakshatra}
                        </div>
                    </div>
                </div>
            </div>

            {/* ACTION GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* BEST ACTION */}
                <div className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center border-t-4 border-blue-500">
                    <div className="mb-4 p-3 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600">
                        <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-lg mb-2">{labels.bestAction}</h3>
                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-300 dark:to-indigo-300">
                        {decision.bestAction}
                    </p>
                </div>

                {/* TIMING TIP */}
                <div className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center border-t-4 border-purple-500">
                    <div className="mb-4 p-3 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600">
                        <Calendar className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-lg mb-2">{labels.timingTip}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {decision.timingTip}
                    </p>
                </div>

                {/* RISK NOTE */}
                <div className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center border-t-4 border-rose-500">
                    <div className="mb-4 p-3 rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-600">
                        <AlertOctagon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif font-bold text-lg mb-2">{labels.riskNote}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {decision.riskNote}
                    </p>
                </div>
            </div>

            {/* SCORE BAR */}
            <div className="glass-panel p-6 rounded-2xl">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider opacity-60">Readiness Score</span>
                    <span className="text-xl font-bold font-serif">{decision.score}/100</span>
                </div>
                <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                            decision.score > 75 ? 'bg-emerald-500' : 
                            decision.score > 40 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${decision.score}%` }}
                    ></div>
                </div>
            </div>

            {/* DISCLAIMER */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 flex gap-3 items-start">
                <TrafficCone className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {decision.disclaimer}
                </p>
            </div>
        </div>
    );
}

const CompatibilityDashboard: React.FC<{ data: AnalysisResult, report: CompatibilityReport, labels: any }> = ({ data, report, labels }) => {
    return (
        <div className="space-y-12">
            
            {/* HERO: SOUL MERGE (Static Optimized) */}
            <div className="relative rounded-3xl overflow-hidden p-8 min-h-[350px] flex flex-col items-center justify-center text-center isolate shadow-xl border border-white/20 dark:border-white/5 bg-slate-100 dark:bg-cosmic-900 group">
                
                {/* Generated Art Layer (Background) */}
                {data.generatedImage && (
                    <div className="absolute inset-0 z-0">
                         <img 
                            src={data.generatedImage} 
                            alt="Cosmic Synergy" 
                            className="w-full h-full object-cover opacity-20 dark:opacity-30 group-hover:scale-105 transition-transform duration-1000" 
                         />
                         <div className="absolute inset-0 bg-gradient-to-t from-slate-100 via-slate-100/80 to-transparent dark:from-cosmic-900 dark:via-cosmic-900/80 dark:to-transparent"></div>
                    </div>
                )}
                
                {/* Fallback Static Orbs if no image */}
                {!data.generatedImage && (
                    <>
                        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-48 h-48 bg-rose-400/40 dark:bg-rose-600/30 rounded-full blur-[50px]"></div>
                        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-48 h-48 bg-blue-400/40 dark:bg-blue-600/30 rounded-full blur-[50px]"></div>
                    </>
                )}

                {/* Content */}
                <div className="relative z-10 space-y-4 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-200 dark:border-white/20 bg-white/40 dark:bg-white/5 backdrop-blur-md shadow-sm">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-purple-800 dark:text-purple-100">{labels.relationshipAnalysis}</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-800 dark:text-white">
                        {report.loveLevel}
                    </h2>
                    
                    <div className="flex flex-col items-center gap-1">
                        <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-blue-500 dark:from-rose-300 dark:to-blue-300 tracking-tighter">
                            {report.overallScore}%
                        </div>
                        <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest">{labels.match}</span>
                    </div>

                    <p className="text-base text-slate-600 dark:text-slate-200 font-light leading-relaxed max-w-md mx-auto pt-4">
                        {report.relationshipDynamic}
                    </p>
                </div>
            </div>

            {/* RELATIONSHIP BALANCE */}
            <div className="py-4">
                <div className="text-center mb-6">
                    <h3 className="text-xl font-serif text-slate-800 dark:text-white">{labels.relationshipBalance}</h3>
                </div>
                <PlanetaryBalance scores={report.relationshipBalance} labels={labels} mode="compatibility" />
            </div>

            {/* SHARED CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <HolographicCard 
                    title="Synergy"
                    name={report.elementalVibe}
                    sub="Foundation"
                    desc="Your basic energy mix."
                    icon={<Wind className="w-5 h-5 text-slate-700 dark:text-white" />}
                    color="text-blue-600 dark:text-blue-200"
                />
                <HolographicCard 
                    title={labels.pokemonPartner}
                    name={data.pokemonPersona.name}
                    sub={data.pokemonPersona.type}
                    desc={data.pokemonPersona.description}
                    icon={<Gamepad2 className="w-5 h-5 text-slate-700 dark:text-white" />}
                    color="text-purple-600 dark:text-purple-200"
                />
            </div>

            {/* COUPLE'S WEEKLY FORECAST */}
            <div className="glass-panel p-6 rounded-2xl border-t-4 border-indigo-500">
               <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-2">
                    <h3 className="text-xl font-serif font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-indigo-500" />
                        {labels.coupleWeeklyForecast}
                    </h3>
                    <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-[10px] font-bold uppercase">
                        {report.coupleWeeklyForecast?.title || "This Week"}
                    </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mb-3 uppercase tracking-widest flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3" /> {labels.doTogether}
                        </h4>
                        <ul className="space-y-2">
                            {report.coupleWeeklyForecast?.dos?.map((item, i) => (
                                <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                                    <span className="mt-1.5 w-1 h-1 bg-emerald-500 rounded-full flex-shrink-0"></span>
                                    {item}
                                </li>
                            )) || <li className="text-sm text-slate-500">Insights hidden...</li>}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-bold text-rose-600 dark:text-rose-400 mb-3 uppercase tracking-widest flex items-center gap-2">
                            <XCircle className="w-3 h-3" /> {labels.avoidConflicts}
                        </h4>
                        <ul className="space-y-2">
                            {report.coupleWeeklyForecast?.avoids?.map((item, i) => (
                                <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                                    <span className="mt-1.5 w-1 h-1 bg-rose-500 rounded-full flex-shrink-0"></span>
                                    {item}
                                </li>
                            )) || <li className="text-sm text-slate-500">Insights hidden...</li>}
                        </ul>
                    </div>
                </div>
            </div>

            {/* MILESTONES */}
            <div className="glass-panel p-6 rounded-2xl">
                <h3 className="text-xl font-serif font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 dark:text-yellow-400" /> {labels.auspiciousMilestones}
                </h3>
                <div className="space-y-6 relative pl-4 border-l border-slate-300 dark:border-white/10">
                    {report.auspiciousMilestones.map((m, i) => (
                        <div key={i} className="relative pl-6">
                            <div className="absolute left-[-21px] top-1.5 w-3 h-3 bg-slate-100 dark:bg-slate-800 border-2 border-purple-400 rounded-full"></div>
                            <div className="">
                                <span className="text-[10px] font-bold text-purple-600 dark:text-purple-300 uppercase tracking-wider block mb-1">
                                    {m.period}
                                </span>
                                <h4 className="text-base font-bold text-slate-800 dark:text-white mb-1">{m.event}</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 font-light">{m.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

             {/* DETAILED GRIDS */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InsightCard 
                    title={labels.communication} 
                    items={report.communicationTips} 
                    icon={<MessageCircle className="w-5 h-5" />} 
                />
                 <InsightCard 
                    title={labels.pitfalls} 
                    items={report.challengesToAvoid} 
                    icon={<AlertTriangle className="w-5 h-5" />} 
                />
                 <InsightCard 
                    title={labels.intimacyVibe} 
                    items={report.sexualChemistry} 
                    icon={<Flame className="w-5 h-5" />} 
                />
                 <InsightCard 
                    title={labels.financialLuck} 
                    items={report.financialCompatibility} 
                    icon={<Coins className="w-5 h-5" />} 
                />
            </div>

            {/* SHARED LUCKY FACTORS */}
            <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
               <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-yellow-500/10 rounded-full border border-yellow-500/20">
                        <Sun className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                        <h3 className="font-serif font-bold text-slate-800 dark:text-white text-base">{labels.luckyFactors}</h3>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest">Shared Energy</p>
                    </div>
               </div>
               
               <div className="flex flex-wrap gap-3 justify-center md:justify-end">
                   {[
                       { label: labels.colors, val: report.sharedLuckyElements?.colors },
                       { label: labels.numbers, val: report.sharedLuckyElements?.numbers },
                       { label: labels.places, val: report.sharedLuckyElements?.places },
                       { label: labels.activities, val: report.sharedLuckyElements?.activities }
                   ].map((item, i) => (
                       <div key={i} className="px-3 py-2 bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-lg text-center min-w-[80px] shadow-sm">
                           <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">{item.label}</span>
                           <span className="text-xs font-medium text-slate-800 dark:text-slate-200">{item.val || '-'}</span>
                       </div>
                   ))}
               </div>
            </div>
        </div>
    );
};

const IndividualDashboard: React.FC<{ data: AnalysisResult, labels: any }> = ({ data, labels }) => {
  return (
    <div className="space-y-10">
      {/* HERO: COSMIC PROFILE */}
      <div className="relative min-h-[450px] flex items-center p-6 md:p-10 rounded-3xl overflow-hidden shadow-xl border border-white/20 dark:border-white/5 isolate group">
        
        {/* Background Base */}
        <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900 transition-colors z-0"></div>

        {/* Generated Art Layer - Visible on Mobile and Desktop */}
        {data.generatedImage ? (
             <div className="absolute inset-0 z-0 pointer-events-none">
                 {/* Mobile: Full cover, low opacity. Desktop: Right half, higher opacity */}
                 <img 
                    src={data.generatedImage} 
                    alt="Cosmic Art" 
                    className="absolute inset-0 w-full h-full object-cover opacity-30 dark:opacity-40 md:opacity-100 md:w-1/2 md:left-auto md:right-0 mask-fade-left transition-transform duration-1000 group-hover:scale-105" 
                 />
                 
                 {/* Text Readability Overlays */}
                 {/* 1. Mobile specific gradient: Fades from solid background color on left to transparent on right/bottom to reveal image slightly but keep text clear */}
                 <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent dark:from-slate-900 dark:via-slate-900/90 dark:to-transparent md:hidden"></div>
                 
                 {/* 2. Desktop specific gradient: Seamless blend in middle */}
                 <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-slate-50 via-slate-50/50 to-transparent dark:from-slate-900 dark:via-slate-900/50 dark:to-transparent w-3/4"></div>
             </div>
        ) : (
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-100/50 to-blue-100/50 dark:from-purple-900/30 dark:to-blue-900/30"></div>
        )}
        
        {/* Content Container */}
        <div className="relative z-10 w-full max-w-xl">
            <div className="flex items-center gap-2 mb-4 opacity-70">
                <span className="w-6 h-[1px] bg-slate-800 dark:bg-white"></span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-700 dark:text-slate-200">{labels.cosmicSummary}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 dark:text-white mb-3 tracking-wide">
                {data.sunSign}
            </h1>
            
            {/* Tags - Better Flex Alignment */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-white/10 text-purple-800 dark:text-purple-100 text-sm font-medium">
                    {data.moonSign} Moon
                </span>
                <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-white/10 text-indigo-800 dark:text-indigo-100 text-sm font-medium">
                    {data.nakshatra}
                </span>
            </div>

            {/* Description - Left Aligned for readability */}
            <div className="p-5 bg-white/40 dark:bg-black/20 backdrop-blur-sm border-l-4 border-purple-500 rounded-r-lg shadow-sm">
                <p className="text-base text-slate-800 dark:text-slate-100 font-light leading-relaxed text-left">
                    {data.basicSummary}
                </p>
            </div>
        </div>
      </div>

      {/* PLANETARY BALANCE */}
      <div className="py-4">
        <div className="text-center mb-6">
            <h3 className="text-xl font-serif text-slate-800 dark:text-white">{labels.lifeBalance}</h3>
        </div>
        <PlanetaryBalance scores={data.lifeBalanceScores} labels={labels} mode="individual" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <HolographicCard 
              title={labels.spiritAnimal}
              name={data.animalPersona.animal}
              sub="Guide"
              desc={data.animalPersona.description}
              icon={<span className="text-xl">{data.animalPersona.emoji}</span>}
              color="text-emerald-600 dark:text-emerald-200"
          />
          <HolographicCard 
              title={labels.pokemonPartner}
              name={data.pokemonPersona.name}
              sub={data.pokemonPersona.type}
              desc={data.pokemonPersona.description}
              icon={<Gamepad2 className="w-6 h-6 text-slate-700 dark:text-white" />}
              color="text-purple-600 dark:text-purple-200"
          />
      </div>

      {/* WEEKLY FORECAST */}
      <div className="glass-panel p-6 rounded-2xl border-t-4 border-indigo-500">
           <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-2">
                <h3 className="text-xl font-serif font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-500" />
                    {labels.weeklyForecast}
                </h3>
                <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-[10px] font-bold uppercase">
                    {data.weeklyForecast.title}
                </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mb-3 uppercase tracking-widest flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3" /> {labels.focusOn}
                    </h4>
                    <ul className="space-y-2">
                        {data.weeklyForecast.dos.map((item, i) => (
                            <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                                <span className="mt-1.5 w-1 h-1 bg-emerald-500 rounded-full flex-shrink-0"></span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4 className="text-[10px] font-bold text-rose-600 dark:text-rose-400 mb-3 uppercase tracking-widest flex items-center gap-2">
                        <XCircle className="w-3 h-3" /> {labels.avoidThisWeek}
                    </h4>
                    <ul className="space-y-2">
                        {data.weeklyForecast.avoids.map((item, i) => (
                            <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                                <span className="mt-1.5 w-1 h-1 bg-rose-500 rounded-full flex-shrink-0"></span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <InsightCard 
              title={labels.personalityVibe} 
              items={data.personality} 
              icon={<User className="w-5 h-5" />} 
          />
          <InsightCard 
              title={labels.loveRelationships} 
              items={data.loveMarriage} 
              icon={<Heart className="w-5 h-5" />} 
          />
          <InsightCard 
              title={labels.careerWealth} 
              items={data.careerMoney} 
              icon={<Briefcase className="w-5 h-5" />} 
          />
          <InsightCard 
              title={labels.vitalityHealth} 
              items={data.health} 
              icon={<Leaf className="w-5 h-5" />} 
          />
          <InsightCard 
              title={labels.areasToAvoid} 
              items={data.areasToAvoid} 
              icon={<ShieldAlert className="w-5 h-5" />} 
          />
          <InsightCard 
              title={labels.practicalTips} 
              items={data.practicalTips} 
              icon={<Sparkles className="w-5 h-5" />} 
          />
      </div>

      {/* LUCKY FACTORS */}
      <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-4">
                <div className="p-2.5 bg-yellow-500/10 rounded-full border border-yellow-500/20">
                    <Sun className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                    <h3 className="font-serif font-bold text-slate-800 dark:text-white text-base">{labels.luckyFactors}</h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest">{labels.luckyDays}: {data.luckyDays.join(", ")}</p>
                </div>
           </div>
           
           <div className="flex flex-wrap gap-3 justify-center md:justify-end">
               {[
                   { label: labels.colors, val: data.luckyElements.colors },
                   { label: labels.numbers, val: data.luckyElements.numbers },
                   { label: labels.direction, val: data.luckyElements.direction },
                   { label: labels.deity, val: data.luckyElements.deityOrMantra }
               ].map((item, i) => (
                   <div key={i} className="px-3 py-2 bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-lg text-center min-w-[80px] shadow-sm">
                       <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">{item.label}</span>
                       <span className="text-xs font-medium text-slate-800 dark:text-slate-200">{item.val}</span>
                   </div>
               ))}
           </div>
      </div>
    </div>
  );
};

export const ResultsView: React.FC<ResultsViewProps> = ({ data, onReset }) => {
  const [showToast, setShowToast] = useState(false);
  const lang = (data.language || 'en') as keyof typeof UI_LABELS; 
  const labels = UI_LABELS[lang] || UI_LABELS['en'];

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    let shareTitle = "Cosmic.AI";
    let shareText = "";
    
    if (data.decisionAnalysis) {
        shareText = `My Cosmic Decision Verdict: ${data.decisionAnalysis.verdict}! ${data.decisionAnalysis.score}/100 Readiness. Checked on Cosmic.AI.`;
        shareTitle = "Cosmic Decision Compass";
    } else if (data.compatibilityReport) {
        shareText = `We are a ${data.compatibilityReport.overallScore}% Match! ${data.compatibilityReport.loveLevel} on Cosmic.AI. Check your synergy!`;
        shareTitle = "Our Cosmic Synergy";
    } else {
        shareText = `I'm a ${data.sunSign} Sun + ${data.moonSign} Moon. My Spirit Animal is a ${data.animalPersona.animal}! Discovered on Cosmic.AI.`;
        shareTitle = "My Cosmic Blueprint";
    }

    const shareUrl = window.location.href;

    const shareData = {
      title: shareTitle,
      text: shareText,
      url: shareUrl,
    };

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled, ignore
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } catch (err) {
        console.error('Clipboard failed', err);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24 animate-fade-in-up relative z-10 text-slate-800 dark:text-white">
       
       {showToast && (
         <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded-full shadow-lg z-50 flex items-center gap-2 font-bold text-sm">
           <CheckCircle2 className="w-4 h-4 text-green-600" />
           <span>{labels.linkCopied}</span>
         </div>
       )}

       {/* Toolbar */}
       <div className="sticky top-4 z-40 flex justify-between items-center bg-white/80 dark:bg-black/60 backdrop-blur-md p-2 rounded-xl border border-black/5 dark:border-white/10 shadow-sm mb-6 print:hidden">
         <button 
           onClick={onReset} 
           className="px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg text-slate-700 dark:text-slate-300 font-medium transition-all flex items-center gap-2 text-xs"
         >
           <ArrowLeft className="w-3 h-3" /> <span>{labels.newAnalysis}</span>
         </button>
         
         <div className="flex items-center gap-1">
            <button onClick={handleShare} className="flex items-center gap-2 px-3 py-1.5 bg-purple-600/10 hover:bg-purple-600/20 text-purple-600 dark:text-purple-300 rounded-lg transition-colors" title={labels.share}>
               <span className="text-xs font-bold uppercase hidden md:inline">{labels.share}</span>
               {typeof navigator !== 'undefined' && navigator.share ? (
                   <Share2 className="w-4 h-4" />
                ) : (
                   <Link className="w-4 h-4" />
                )}
            </button>
            <button onClick={handlePrint} className="p-1.5 hover:bg-black/5 dark:hover:bg-white/10 text-blue-600 dark:text-blue-300 rounded-lg" title={labels.print}>
                <Printer className="w-4 h-4" />
            </button>
         </div>
       </div>

       {data.decisionAnalysis ? (
         <DecisionDashboard data={data} decision={data.decisionAnalysis} labels={labels} />
       ) : data.compatibilityReport ? (
         <CompatibilityDashboard data={data} report={data.compatibilityReport} labels={labels} />
       ) : (
         <IndividualDashboard data={data} labels={labels} />
       )}

       <div className="text-center pt-8 opacity-40 print:hidden">
           <p className="text-[10px] text-slate-400 font-mono uppercase tracking-[0.2em]">
               Cosmic Intelligence Engine
           </p>
       </div>
    </div>
  );
};
