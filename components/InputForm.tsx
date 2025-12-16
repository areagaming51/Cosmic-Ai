
import React, { useState, useEffect } from 'react';
import { UserInputs } from '../types';
import { 
  Sparkles, Users, UserCircle, Globe, ChevronDown, Star, Compass, Check
} from 'lucide-react';

interface InputFormProps {
  onSubmit: (data: UserInputs) => void;
  isLoading: boolean;
}

// --- Helpers for Date Component ---
const MONTHS = [
  { value: '01', label: 'Jan' }, { value: '02', label: 'Feb' }, { value: '03', label: 'Mar' },
  { value: '04', label: 'Apr' }, { value: '05', label: 'May' }, { value: '06', label: 'Jun' },
  { value: '07', label: 'Jul' }, { value: '08', label: 'Aug' }, { value: '09', label: 'Sep' },
  { value: '10', label: 'Oct' }, { value: '11', label: 'Nov' }, { value: '12', label: 'Dec' }
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 120 }, (_, i) => currentYear - i); // Last 120 years
const DAYS = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));

const ModernDateSelector: React.FC<{ 
    value: string; 
    onChange: (val: string) => void; 
    name: string;
}> = ({ value, onChange, name }) => {
    // Parse existing YYYY-MM-DD or default to empty
    const [year, month, day] = value ? value.split('-') : ['', '', ''];

    const handlePartChange = (part: 'year' | 'month' | 'day', val: string) => {
        const newYear = part === 'year' ? val : year;
        const newMonth = part === 'month' ? val : month;
        const newDay = part === 'day' ? val : day;

        if (newYear && newMonth && newDay) {
            onChange(`${newYear}-${newMonth}-${newDay}`);
        } else if (!newYear && !newMonth && !newDay) {
             onChange('');
        } else {
            onChange(`${newYear || '0000'}-${newMonth || '01'}-${newDay || '01'}`); 
        }
    };

    return (
        <div className="grid grid-cols-3 gap-2">
            {/* Month */}
            <div className="relative">
                <select
                    value={month}
                    onChange={(e) => handlePartChange('month', e.target.value)}
                    className="w-full px-2 py-2.5 bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl text-slate-800 dark:text-slate-200 text-xs md:text-sm focus:ring-2 focus:ring-purple-500/50 outline-none appearance-none cursor-pointer"
                >
                    <option value="" disabled>Month</option>
                    {MONTHS.map(m => (
                        <option key={m.value} value={m.value} className="dark:bg-slate-900">{m.label}</option>
                    ))}
                </select>
                <ChevronDown className="w-3 h-3 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Day */}
            <div className="relative">
                <select
                    value={day}
                    onChange={(e) => handlePartChange('day', e.target.value)}
                    className="w-full px-2 py-2.5 bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl text-slate-800 dark:text-slate-200 text-xs md:text-sm focus:ring-2 focus:ring-purple-500/50 outline-none appearance-none cursor-pointer"
                >
                    <option value="" disabled>Day</option>
                    {DAYS.map(d => (
                        <option key={d} value={d} className="dark:bg-slate-900">{d}</option>
                    ))}
                </select>
                <ChevronDown className="w-3 h-3 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Year */}
            <div className="relative">
                <select
                    value={year}
                    onChange={(e) => handlePartChange('year', e.target.value)}
                    className="w-full px-2 py-2.5 bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl text-slate-800 dark:text-slate-200 text-xs md:text-sm focus:ring-2 focus:ring-purple-500/50 outline-none appearance-none cursor-pointer"
                >
                    <option value="" disabled>Year</option>
                    {YEARS.map(y => (
                        <option key={y} value={y} className="dark:bg-slate-900">{y}</option>
                    ))}
                </select>
                <ChevronDown className="w-3 h-3 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
        </div>
    );
};

const LIFESTYLE_ARCHETYPES = [
  { label: "Focused/Analytical 🧠", value: "Focused/Analytical" },
  { label: "Creative/Expressive 🎨", value: "Creative/Expressive" },
  { label: "Practical/Business 💼", value: "Practical/Business" },
  { label: "Emotional/Family-Centric 🏡", value: "Emotional/Family-Centric" },
  { label: "Adventurous/Free 🏔️", value: "Adventurous/Free" },
  { label: "Leader/Authority-Driven 🦁", value: "Leader/Authority-Driven" },
  { label: "Supportive/Service-Oriented 🤝", value: "Supportive/Service-Oriented" },
  { label: "Spiritual/Inner-Seeking 🧘", value: "Spiritual/Inner-Seeking" },
  { label: "Social/Network-Oriented 🗣️", value: "Social/Network-Oriented" },
  { label: "Ambitious/Goal-Chasing 🚀", value: "Ambitious/Goal-Chasing" },
  { label: "Balanced/Stable-Routine ⚖️", value: "Balanced/Stable-Routine" },
  { label: "Innovator/Experimenting 💡", value: "Innovator/Experimenting" },
  { label: "Protective/Power-Focused 🛡️", value: "Protective/Power-Focused" },
  { label: "Logical/Tech-Driven 💻", value: "Logical/Tech-Driven" },
  { label: "Luxury/Comfort-Seeking 💎", value: "Luxury/Comfort-Seeking" }
];

const LANGUAGE_OPTIONS = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'hi', label: 'Hindi', flag: '🇮🇳' },
  { code: 'es', label: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', label: 'French', flag: '🇫🇷' },
  { code: 'de', label: 'German', flag: '🇩🇪' },
  { code: 'ja', label: 'Japanese', flag: '🇯🇵' },
];

const DECISION_CATEGORIES = [
    "Career / Business", "Love / Relationship", "Finance / Investment", 
    "Travel / Move", "Conflict Resolution", "Health / Wellness", "Creative Project", "Other"
];

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<UserInputs>({
    mode: 'individual',
    language: 'en',
    dob: '',
    gender: 'male',
    timeOfBirth: '',
    placeOfBirth: '',
    primaryLifestyle: '',
    secondaryLifestyle: '',
    partnerDob: '',
    partnerGender: 'female',
    partnerTimeOfBirth: '',
    partnerPlaceOfBirth: '',
    includeImage: false,
    decisionCategory: 'Career / Business',
    decisionUrgency: 'medium',
    decisionContext: ''
  });

  const [saveProfile, setSaveProfile] = useState(false);

  // Load profile on mount
  useEffect(() => {
    const saved = localStorage.getItem('cosmic_user_profile');
    if (saved) {
        try {
            const p = JSON.parse(saved);
            setFormData(prev => ({
                ...prev,
                dob: p.dob || prev.dob,
                gender: p.gender || prev.gender,
                timeOfBirth: p.timeOfBirth || prev.timeOfBirth,
                placeOfBirth: p.placeOfBirth || prev.placeOfBirth,
                primaryLifestyle: p.primaryLifestyle || prev.primaryLifestyle,
                secondaryLifestyle: p.secondaryLifestyle || prev.secondaryLifestyle
            }));
            setSaveProfile(true);
        } catch (e) {
            console.error("Failed to parse profile", e);
        }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => {
        const newVal = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        return { ...prev, [name]: newVal };
    });
  };

  const handleDateChange = (name: string, val: string) => {
    setFormData(prev => ({ ...prev, [name]: val }));
  }

  const handleModeChange = (mode: 'individual' | 'compatibility' | 'decision') => {
    setFormData(prev => ({ ...prev, mode }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save or Clear Profile
    if (saveProfile) {
        const profile = {
            dob: formData.dob,
            gender: formData.gender,
            timeOfBirth: formData.timeOfBirth,
            placeOfBirth: formData.placeOfBirth,
            primaryLifestyle: formData.primaryLifestyle,
            secondaryLifestyle: formData.secondaryLifestyle
        };
        localStorage.setItem('cosmic_user_profile', JSON.stringify(profile));
    } else {
        localStorage.removeItem('cosmic_user_profile');
    }

    onSubmit(formData);
  };

  return (
    <div className="w-full max-w-lg mx-auto relative group">
        {/* Glow behind the form */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        
        <div className="relative p-6 md:p-8 glass-panel rounded-[2rem] shadow-2xl animate-fade-in-up text-slate-800 dark:text-slate-100">
            
            {/* Header */}
            <div className="text-center mb-6 md:mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20 border border-black/10 dark:border-white/10 shadow-[0_0_20px_rgba(168,85,247,0.2)] mb-3 md:mb-4 animate-float">
                    <Sparkles className="text-purple-600 dark:text-purple-300 w-6 h-6 md:w-8 md:h-8" />
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-700 dark:from-purple-200 dark:via-white dark:to-purple-200 tracking-wide">
                    COSMIC.AI
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mt-2 text-xs md:text-sm font-light tracking-widest uppercase">
                    Unlock Your Celestial Blueprint
                </p>
            </div>

            {/* Mode Tabs */}
            <div className="flex p-1.5 bg-slate-200/50 dark:bg-black/40 backdrop-blur-md rounded-2xl mb-6 md:mb-8 border border-black/5 dark:border-white/5">
                <button
                type="button"
                onClick={() => handleModeChange('individual')}
                className={`flex-1 py-3 rounded-xl text-[10px] md:text-xs font-medium transition-all duration-300 flex items-center justify-center gap-1 ${
                    formData.mode === 'individual' 
                    ? 'bg-white dark:bg-gradient-to-b dark:from-purple-600 dark:to-indigo-700 text-purple-700 dark:text-white shadow-md' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/10'
                }`}
                >
                <UserCircle className="w-3.5 h-3.5" /> Individual
                </button>
                <button
                type="button"
                onClick={() => handleModeChange('compatibility')}
                className={`flex-1 py-3 rounded-xl text-[10px] md:text-xs font-medium transition-all duration-300 flex items-center justify-center gap-1 ${
                    formData.mode === 'compatibility' 
                    ? 'bg-white dark:bg-gradient-to-b dark:from-pink-600 dark:to-rose-700 text-pink-700 dark:text-white shadow-md' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/10'
                }`}
                >
                <Users className="w-3.5 h-3.5" /> Synergy
                </button>
                <button
                type="button"
                onClick={() => handleModeChange('decision')}
                className={`flex-1 py-3 rounded-xl text-[10px] md:text-xs font-medium transition-all duration-300 flex items-center justify-center gap-1 ${
                    formData.mode === 'decision' 
                    ? 'bg-white dark:bg-gradient-to-b dark:from-emerald-600 dark:to-teal-700 text-emerald-700 dark:text-white shadow-md' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/10'
                }`}
                >
                <Compass className="w-3.5 h-3.5" /> Decision
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                
                {/* Inputs Section */}
                <div className="space-y-4 md:space-y-5">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 dark:bg-purple-400 animate-pulse"></span>
                        <h3 className="text-xs font-bold text-purple-700 dark:text-purple-300 uppercase tracking-widest">
                        {formData.mode === 'compatibility' ? '1. Your Essence' : 'Your Essence'}
                        </h3>
                    </div>
                    
                    {/* DOB & Gender */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 ml-1">Date of Birth</label>
                            <ModernDateSelector 
                                name="dob" 
                                value={formData.dob} 
                                onChange={(val) => handleDateChange('dob', val)} 
                            />
                        </div>
                        {formData.mode !== 'decision' && (
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 ml-1">Gender</label>
                                <div className="relative">
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl text-slate-800 dark:text-slate-200 text-xs md:text-sm focus:ring-2 focus:ring-purple-500/50 outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="male" className="dark:bg-slate-900">Male</option>
                                        <option value="female" className="dark:bg-slate-900">Female</option>
                                        <option value="other" className="dark:bg-slate-900">Other</option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Time & Place - Always show for charts */}
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 ml-1">Time (Optional)</label>
                            <input
                            type="time"
                            name="timeOfBirth"
                            value={formData.timeOfBirth}
                            onChange={handleChange}
                            className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl text-slate-800 dark:text-slate-200 text-xs md:text-sm focus:ring-2 focus:ring-purple-500/50 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 ml-1">Place (Optional)</label>
                            <input
                            type="text"
                            name="placeOfBirth"
                            placeholder="City, Country"
                            value={formData.placeOfBirth}
                            onChange={handleChange}
                            className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl text-slate-800 dark:text-slate-200 text-xs md:text-sm focus:ring-2 focus:ring-purple-500/50 outline-none transition-all placeholder:text-slate-500"
                            />
                        </div>
                    </div>
                </div>

                {/* --- COMPATIBILITY MODE INPUTS --- */}
                {formData.mode === 'compatibility' && (
                    <div className="space-y-4 md:space-y-5 pt-4 border-t border-black/5 dark:border-white/5 animate-fade-in-up">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 dark:bg-pink-400 animate-pulse"></span>
                            <h3 className="text-xs font-bold text-pink-700 dark:text-pink-300 uppercase tracking-widest">
                                2. Partner's Essence
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 ml-1">Date of Birth</label>
                                <ModernDateSelector 
                                    name="partnerDob" 
                                    value={formData.partnerDob || ''} 
                                    onChange={(val) => handleDateChange('partnerDob', val)} 
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 ml-1">Gender</label>
                                <div className="relative">
                                    <select
                                        name="partnerGender"
                                        value={formData.partnerGender}
                                        onChange={handleChange}
                                        className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl text-slate-800 dark:text-slate-200 text-xs md:text-sm focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="male" className="dark:bg-slate-900">Male</option>
                                        <option value="female" className="dark:bg-slate-900">Female</option>
                                        <option value="other" className="dark:bg-slate-900">Other</option>
                                    </select>
                                    <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 ml-1">Time (Optional)</label>
                                <input
                                type="time"
                                name="partnerTimeOfBirth"
                                value={formData.partnerTimeOfBirth}
                                onChange={handleChange}
                                className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl text-slate-800 dark:text-slate-200 text-xs md:text-sm focus:ring-2 focus:ring-pink-500/50 outline-none"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 ml-1">Place (Optional)</label>
                                <input
                                type="text"
                                name="partnerPlaceOfBirth"
                                placeholder="City, Country"
                                value={formData.partnerPlaceOfBirth}
                                onChange={handleChange}
                                className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl text-slate-800 dark:text-slate-200 text-xs md:text-sm focus:ring-2 focus:ring-pink-500/50 outline-none placeholder:text-slate-500"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* --- DECISION MODE INPUTS --- */}
                {formData.mode === 'decision' && (
                    <div className="space-y-4 md:space-y-5 pt-4 border-t border-black/5 dark:border-white/5 animate-fade-in-up">
                         <div className="flex items-center gap-2 mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
                            <h3 className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-widest">
                                2. Decision Context
                            </h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                            <div className="relative">
                                <select 
                                    name="decisionCategory" 
                                    value={formData.decisionCategory} 
                                    onChange={handleChange}
                                    className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl text-slate-800 dark:text-slate-300 text-xs md:text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all appearance-none cursor-pointer"
                                >
                                    {DECISION_CATEGORIES.map(cat => (
                                        <option key={cat} value={cat} className="dark:bg-slate-900">{cat}</option>
                                    ))}
                                </select>
                                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                            <div className="relative">
                                <select 
                                    name="decisionUrgency" 
                                    value={formData.decisionUrgency} 
                                    onChange={handleChange}
                                    className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl text-slate-800 dark:text-slate-300 text-xs md:text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all appearance-none cursor-pointer"
                                >
                                    <option value="low" className="dark:bg-slate-900">Low Urgency</option>
                                    <option value="medium" className="dark:bg-slate-900">Medium Urgency</option>
                                    <option value="high" className="dark:bg-slate-900">High Urgency</option>
                                </select>
                                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>
                        
                        <div>
                            <textarea 
                                name="decisionContext"
                                value={formData.decisionContext}
                                onChange={handleChange}
                                placeholder="What is on your mind? (Optional context)"
                                rows={2}
                                className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl text-slate-800 dark:text-slate-200 text-xs md:text-sm focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all resize-none placeholder:text-slate-500"
                            />
                        </div>
                    </div>
                )}

                {/* Lifestyle (Only for individual mode) */}
                {formData.mode === 'individual' && (
                <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="relative">
                        <select 
                            name="primaryLifestyle" 
                            value={formData.primaryLifestyle} 
                            onChange={handleChange}
                            className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl text-slate-800 dark:text-slate-300 text-xs md:text-sm focus:ring-2 focus:ring-purple-500/50 outline-none transition-all appearance-none cursor-pointer hover:bg-white/10"
                        >
                            <option value="" className="dark:bg-slate-900">Select Primary Archetype (Optional)</option>
                            {LIFESTYLE_ARCHETYPES.map(type => (
                                <option key={`p-${type.value}`} value={type.value} className="dark:bg-slate-900">{type.label}</option>
                            ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    <div className="relative">
                            <select 
                            name="secondaryLifestyle" 
                            value={formData.secondaryLifestyle} 
                            onChange={handleChange}
                            className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl text-slate-800 dark:text-slate-300 text-xs md:text-sm focus:ring-2 focus:ring-purple-500/50 outline-none transition-all appearance-none cursor-pointer hover:bg-white/10"
                        >
                            <option value="" className="dark:bg-slate-900">Select Secondary Archetype (Optional)</option>
                            {LIFESTYLE_ARCHETYPES.map(type => (
                                <option key={`s-${type.value}`} value={type.value} className="dark:bg-slate-900">{type.label}</option>
                            ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                </div>
                )}

                {/* Footer Options */}
                <div className="pt-4 border-t border-black/5 dark:border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                         {/* Save Profile Checkbox */}
                         <label className="flex items-center gap-2 cursor-pointer group/save">
                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${saveProfile ? 'bg-purple-600 border-purple-600' : 'border-slate-300 dark:border-slate-600'}`}>
                                {saveProfile && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <input type="checkbox" checked={saveProfile} onChange={(e) => setSaveProfile(e.target.checked)} className="hidden" />
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 group-hover/save:text-purple-600 dark:group-hover/save:text-purple-300 transition-colors">Save My Info</span>
                        </label>

                        {/* Language */}
                        <div className="relative w-28 md:w-32">
                            <select
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                                className="w-full appearance-none bg-slate-100 dark:bg-black/20 border border-black/5 dark:border-white/10 pl-3 pr-8 py-2 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 outline-none focus:border-purple-500 transition-all cursor-pointer hover:bg-black/5 dark:hover:bg-white/5"
                            >
                                {LANGUAGE_OPTIONS.map(opt => (
                                    <option key={opt.code} value={opt.code} className="dark:bg-slate-900">
                                        {opt.flag} {opt.label}
                                    </option>
                                ))}
                            </select>
                            <Globe className="w-3 h-3 absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                        </div>
                    </div>

                     {/* Image Toggle - Only show if NOT decision mode */}
                     {formData.mode !== 'decision' && (
                        <div className="flex justify-end">
                            <label className="flex items-center gap-3 cursor-pointer group/img p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                <div className="relative">
                                    <input 
                                        type="checkbox" 
                                        name="includeImage" 
                                        checked={formData.includeImage || false} 
                                        onChange={handleChange}
                                        className="sr-only peer" 
                                    />
                                    <div className="w-9 h-5 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                                </div>
                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 group-hover/img:text-purple-600 dark:group-hover/img:text-purple-300 transition-colors">
                                    Generate Cosmic Art
                                </span>
                            </label>
                        </div>
                     )}
                </div>

                <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 md:py-4 mt-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:via-indigo-500 hover:to-blue-500 text-white font-bold tracking-widest uppercase text-xs md:text-sm rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 border border-white/10"
                >
                {isLoading ? (
                    <span className="animate-pulse">Aligning...</span>
                ) : (
                    <>
                        {formData.mode === 'decision' ? 'Check Readiness' : 'Reveal Destiny'} 
                        <Star className="w-4 h-4 fill-white animate-pulse" />
                    </>
                )}
                </button>
            </form>
        </div>
    </div>
  );
};
