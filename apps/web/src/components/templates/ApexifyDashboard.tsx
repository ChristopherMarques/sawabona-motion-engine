import React from 'react';
import { useAudioReact, AnimateWrapper } from '@sawabona/motion-engine';
import {
    Search, Bell, Plus, Settings, ChevronDown,
    ArrowUpRight, ArrowDownRight, MoreHorizontal,
    Download, RefreshCw, Moon, LayoutGrid, Tag,
    BarChart, Box, Users, Share, Calendar, Filter
} from 'lucide-react';

export const ApexifyDashboard: React.FC = () => {
    // Pulse animation for specific audio-reactive highlights if needed
    const pulseScale = useAudioReact({ multiplier: 1.05, frequencyRange: [0, 100] });

    return (
        <div className="w-[1440px] h-[900px] bg-[#1a1b1e] text-[#e0e0e0] font-sans flex overflow-hidden rounded-[2rem] shadow-2xl border border-white/5 relative">

            {/* Sidebar */}
            <AnimateWrapper animationType="slide-left" durationInFrames={30} delayInFrames={0}>
                <aside className="w-[280px] h-full bg-[#1e1f24] border-r border-[#2c2d33] flex flex-col pt-8 pb-6 px-6">
                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-10 pl-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                            <span className="font-bold text-white">S</span>
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">Apexify</span>
                        <ChevronDown className="w-4 h-4 ml-auto text-neutral-400" />
                    </div>

                    {/* Nav Menu */}
                    <nav className="flex-1 space-y-1">
                        <div className="px-2 py-3 bg-purple-500/10 text-purple-400 rounded-lg flex items-center gap-3 font-medium">
                            <LayoutGrid className="w-5 h-5" />
                            Dashboard
                        </div>
                        <div className="px-2 py-3 text-neutral-400 hover:text-white hover:bg-white/5 transition-colors rounded-lg flex items-center gap-3 font-medium">
                            <Tag className="w-5 h-5" />
                            Sales
                        </div>

                        <div className="mt-8 mb-2 px-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                            Analytics
                        </div>
                        <div className="px-2 py-3 text-neutral-400 hover:text-white hover:bg-white/5 transition-colors rounded-lg flex items-center gap-3 font-medium">
                            Product
                        </div>
                        <div className="px-2 py-3 text-neutral-400 hover:text-white hover:bg-white/5 transition-colors rounded-lg flex items-center gap-3 font-medium">
                            Store
                        </div>
                        <div className="px-2 py-3 text-neutral-400 hover:text-white hover:bg-white/5 transition-colors rounded-lg flex items-center gap-3 font-medium">
                            Visitor
                        </div>
                    </nav>

                    {/* Bottom Sidebar Action */}
                    <div className="mt-auto pt-6 border-t border-[#2c2d33]">
                        <div className="bg-[#26272e] p-4 rounded-xl mb-4 border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
                            <div className="w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-500 flex items-center justify-center mb-3">
                                <Box className="w-4 h-4" />
                            </div>
                            <h4 className="text-sm font-medium text-white mb-2 relative z-10">Upgrade to Pro</h4>
                            <p className="text-xs text-neutral-400 mb-3 relative z-10">Get detailed analytics for help you, upgrade pro</p>
                            <button className="bg-white text-black text-xs font-semibold py-2 px-4 rounded-full w-full relative z-10 hover:bg-neutral-200">
                                Upgrade Now
                            </button>
                        </div>
                        <div className="flex items-center justify-between px-2 text-sm text-neutral-400">
                            <div className="flex items-center gap-2">
                                <Moon className="w-4 h-4" />
                                Dark Mode
                            </div>
                            <div className="w-8 h-4 bg-purple-500 rounded-full relative">
                                <div className="absolute right-1 top-0.5 w-3 h-3 bg-white rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </aside>
            </AnimateWrapper>

            {/* Main Content Area */}
            <main className="flex-1 h-full flex flex-col">

                {/* Header Container */}
                <AnimateWrapper animationType="slide-down" durationInFrames={30} delayInFrames={5}>
                    <header className="h-[90px] px-8 flex flex-col justify-center border-b border-[#2c2d33] bg-[#1a1b1e]/80 backdrop-blur-md">
                        <div className="flex items-center justify-between mb-2">
                            <h1 className="text-2xl font-bold text-white">Dashboard</h1>

                            {/* Search & Profile */}
                            <div className="flex items-center gap-4">
                                <div className="relative group">
                                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                                    <input
                                        type="text"
                                        placeholder="Type here to start searching..."
                                        className="bg-[#24252a] text-sm text-white placeholder-neutral-500 rounded-full pl-10 pr-12 py-2.5 w-[300px] border border-transparent focus:border-purple-500/50 outline-none transition-all"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                                        <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs text-neutral-400">⌘</kbd>
                                        <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs text-neutral-400">/</kbd>
                                    </div>
                                </div>
                                <button className="w-10 h-10 rounded-full bg-[#24252a] flex items-center justify-center hover:bg-white/10 transition-colors relative">
                                    <Bell className="w-5 h-5 text-neutral-300" />
                                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1a1b1e]"></span>
                                </button>
                                <div className="flex items-center gap-2 cursor-pointer bg-[#24252a] pl-1 pr-3 py-1 rounded-full">
                                    <div className="w-8 h-8 rounded-full bg-indigo-500 overflow-hidden">
                                        <img src="https://i.pravatar.cc/100?img=33" alt="Admin" className="w-full h-full object-cover" />
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-neutral-400" />
                                </div>
                            </div>
                        </div>

                        {/* Top Nav Tabs & Actions */}
                        <div className="flex items-center justify-between mt-auto w-full">
                            <nav className="flex items-center gap-6">
                                <button className="text-white text-sm font-medium pb-2 border-b-2 border-purple-500">Overview</button>
                                <button className="text-neutral-400 text-sm font-medium pb-2 border-b-2 border-transparent">Notifications</button>
                                <button className="text-neutral-400 text-sm font-medium pb-2 border-b-2 border-transparent">Trade history</button>
                            </nav>

                            <div className="flex items-center gap-3 pb-2">
                                <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-neutral-300 border border-[#2c2d33] rounded-md hover:bg-white/5">
                                    <Calendar className="w-3.5 h-3.5" />
                                    28 Aug - 15 Dec, 2024
                                </button>
                                <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-neutral-300 border border-[#2c2d33] rounded-md hover:bg-white/5">
                                    <Filter className="w-3.5 h-3.5" />
                                    Filter
                                </button>
                                <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-purple-500 text-white rounded-md hover:bg-purple-600 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                                    <Share className="w-3.5 h-3.5" />
                                    Share
                                </button>
                            </div>
                        </div>
                    </header>
                </AnimateWrapper>

                {/* Dashboard Grid Content */}
                <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">

                    {/* Top Stats Cards */}
                    <div className="grid grid-cols-4 gap-4">
                        {/* Selected Card */}
                        <AnimateWrapper animationType="slide-up" durationInFrames={20} delayInFrames={15}>
                            <div className="bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] p-5 rounded-xl text-white relative overflow-hidden group shadow-[0_4px_20px_rgba(139,92,246,0.3)] border border-purple-400/30">
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-1/3 -translate-y-1/3"></div>
                                <div className="flex items-center justify-between mb-4 relative z-10">
                                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                        <Box className="w-4 h-4" />
                                    </div>
                                    <MoreHorizontal className="w-5 h-5 opacity-60 hover:opacity-100 cursor-pointer" />
                                </div>
                                <p className="text-white/80 text-sm mb-1 relative z-10">Total Income</p>
                                <div className="flex items-end gap-3 mb-2 relative z-10">
                                    <h3 className="text-3xl font-bold tracking-tight" style={{ transform: `scale(${pulseScale})`, transformOrigin: 'left bottom' }}>$348,261</h3>
                                    <span className="flex items-center text-xs font-medium text-emerald-300 bg-emerald-500/20 px-1.5 py-0.5 rounded mb-1 border border-emerald-500/20">
                                        <ArrowUpRight className="w-3 h-3 mr-0.5" /> 12.95%
                                    </span>
                                </div>
                                <p className="text-xs text-white/50 relative z-10">Compared to last month</p>
                            </div>
                        </AnimateWrapper>

                        {/* Standard Cards */}
                        <AnimateWrapper animationType="slide-up" durationInFrames={20} delayInFrames={20}>
                            <div className="bg-[#1f2026] border border-[#2c2d33] p-5 rounded-xl hover:border-purple-500/30 transition-colors">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-8 h-8 rounded-lg bg-[#2c2d33] flex items-center justify-center text-emerald-400">
                                        <Tag className="w-4 h-4" />
                                    </div>
                                    <MoreHorizontal className="w-5 h-5 text-neutral-500 hover:text-white cursor-pointer" />
                                </div>
                                <p className="text-neutral-400 text-sm mb-1">Profit</p>
                                <div className="flex items-end gap-3 mb-2">
                                    <h3 className="text-3xl font-bold text-white tracking-tight">$15,708.98</h3>
                                    <span className="flex items-center text-xs font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded mb-1">
                                        <ArrowUpRight className="w-3 h-3 mr-0.5" /> 8.12%
                                    </span>
                                </div>
                                <p className="text-xs text-neutral-500">Compared to last month</p>
                            </div>
                        </AnimateWrapper>

                        <AnimateWrapper animationType="slide-up" durationInFrames={20} delayInFrames={25}>
                            <div className="bg-[#1f2026] border border-[#2c2d33] p-5 rounded-xl hover:border-purple-500/30 transition-colors">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-8 h-8 rounded-lg bg-[#2c2d33] flex items-center justify-center text-yellow-500">
                                        <BarChart className="w-4 h-4" />
                                    </div>
                                    <MoreHorizontal className="w-5 h-5 text-neutral-500 hover:text-white cursor-pointer" />
                                </div>
                                <p className="text-neutral-400 text-sm mb-1">Total Revenue</p>
                                <div className="flex items-end gap-3 mb-2">
                                    <h3 className="text-3xl font-bold text-white tracking-tight">7,415,644</h3>
                                    <span className="flex items-center text-xs font-medium text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded mb-1">
                                        <ArrowDownRight className="w-3 h-3 mr-0.5" /> 5.18%
                                    </span>
                                </div>
                                <p className="text-xs text-neutral-500">Compared to last month</p>
                            </div>
                        </AnimateWrapper>

                        <AnimateWrapper animationType="slide-up" durationInFrames={20} delayInFrames={30}>
                            <div className="bg-[#1f2026] border border-[#2c2d33] p-5 rounded-xl hover:border-purple-500/30 transition-colors">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-8 h-8 rounded-lg bg-[#2c2d33] flex items-center justify-center text-blue-400">
                                        <Users className="w-4 h-4" />
                                    </div>
                                    <MoreHorizontal className="w-5 h-5 text-neutral-500 hover:text-white cursor-pointer" />
                                </div>
                                <p className="text-neutral-400 text-sm mb-1">Total Conversion</p>
                                <div className="flex items-end gap-3 mb-2">
                                    <h3 className="text-3xl font-bold text-white tracking-tight">10.87%</h3>
                                    <span className="flex items-center text-xs font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded mb-1">
                                        <ArrowUpRight className="w-3 h-3 mr-0.5" /> 25.45%
                                    </span>
                                </div>
                                <p className="text-xs text-neutral-500">Compared to last month</p>
                            </div>
                        </AnimateWrapper>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-3 gap-4 h-[320px]">
                        {/* Main Line Chart Mock */}
                        <AnimateWrapper animationType="fade" durationInFrames={40} delayInFrames={40}>
                            <div className="col-span-2 bg-[#1f2026] border border-[#2c2d33] rounded-xl p-6 flex flex-col relative">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-medium text-white">Analytic</h3>
                                    <div className="flex items-center gap-2">
                                        <button className="text-xs font-medium text-neutral-300 bg-[#2c2d33] px-3 py-1.5 rounded-md flex items-center gap-1">
                                            Sales Estimation <ChevronDown className="w-3 h-3" />
                                        </button>
                                        <button className="text-neutral-400 hover:text-white">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Chart Area */}
                                <div className="flex-1 relative flex">
                                    {/* Y Axis */}
                                    <div className="w-12 flex flex-col justify-between items-end pr-4 text-xs text-neutral-500 pb-8">
                                        <span>$10M</span>
                                        <span>$8M</span>
                                        <span>$6M</span>
                                        <span>$4M</span>
                                        <span>$2M</span>
                                        <span>$0</span>
                                    </div>

                                    {/* Grid & Lines */}
                                    <div className="flex-1 relative border-l border-b border-[#2c2d33] h-full pb-8 overflow-hidden">
                                        {/* Horizontal Lines */}
                                        <div className="absolute inset-0 flex flex-col justify-between">
                                            {[...Array(6)].map((_, i) => (
                                                <div key={`h-${i}`} className="w-full border-t border-[#2c2d33]/50" />
                                            ))}
                                        </div>

                                        {/* Fake SVG Line Charts */}
                                        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                                            <defs>
                                                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                                                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                                                </linearGradient>
                                            </defs>
                                            {/* Primary Line - Purple */}
                                            <path d="M0,70 Q10,20 25,60 T45,70 T65,40 T85,50 T100,55 L100,100 L0,100 Z" fill="url(#lineGrad)" />
                                            <path d="M0,70 Q10,20 25,60 T45,70 T65,40 T85,50 T100,55" fill="none" stroke="#8b5cf6" strokeWidth="2" />

                                            {/* Secondary Line - Yellow/Mustard */}
                                            <path d="M0,90 Q15,85 25,75 T50,50 T75,45 T100,60" fill="none" stroke="#eab308" strokeWidth="1.5" strokeDasharray="4 2" />
                                        </svg>

                                        {/* Crosshair Overlay */}
                                        <div className="absolute left-[65%] top-0 bottom-0 border-l border-dashed border-neutral-400 z-10 flex flex-col items-center">
                                            <div className="w-3 h-3 bg-[#1f2026] border-2 border-purple-500 rounded-full mt-[39%]" />
                                            <div className="absolute top-[10%] left-4 bg-[#2c2d33] rounded-lg p-2 border border-white/10 shadow-lg whitespace-nowrap">
                                                <div className="text-xs text-neutral-400 mb-1">Nov 21, 2023</div>
                                                <div className="flex gap-4">
                                                    <div>
                                                        <div className="text-[10px] text-purple-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>Revenue</div>
                                                        <div className="font-bold text-sm text-white">$32,839.99</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-[10px] text-yellow-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>Target</div>
                                                        <div className="font-bold text-sm text-white">$18,100.00</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* X Axis */}
                                    <div className="absolute bottom-0 left-12 right-0 h-8 flex justify-between items-center px-4 text-xs text-neutral-500">
                                        <span>Q1</span>
                                        <span>Q2</span>
                                        <span>Q3</span>
                                        <span>Q4</span>
                                        <span>Q1</span>
                                        <span>Q2</span>
                                        <span>Q3</span>
                                        <span>Q4</span>
                                    </div>
                                </div>
                            </div>
                        </AnimateWrapper>

                        {/* Session By Country */}
                        <AnimateWrapper animationType="slide-left" durationInFrames={40} delayInFrames={50}>
                            <div className="col-span-1 bg-[#1f2026] border border-[#2c2d33] rounded-xl p-6 flex flex-col">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-lg font-medium text-white">Session by Country</h3>
                                    <button className="text-neutral-400 hover:text-white">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="flex flex-col gap-6 flex-1">
                                    {/* Item 1 */}
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-3.5 bg-neutral-200 rounded-sm overflow-hidden flex"><div className="w-1/2 bg-blue-500"></div><div className="w-1/2 bg-red-500"></div></div>
                                                <span className="text-neutral-300 font-medium">United States</span>
                                            </div>
                                            <span className="text-white font-bold">85%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-[#2c2d33] rounded-full overflow-hidden">
                                            <div className="h-full bg-purple-500 w-[85%] rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                                        </div>
                                    </div>
                                    {/* Item 2 */}
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-3.5 bg-white rounded-sm overflow-hidden flex justify-center items-center border border-neutral-300"><div className="w-2 h-2 rounded-full bg-red-500"></div></div>
                                                <span className="text-neutral-300 font-medium">Japan</span>
                                            </div>
                                            <span className="text-white font-bold">70%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-[#2c2d33] rounded-full overflow-hidden">
                                            <div className="h-full bg-purple-500 w-[70%] rounded-full opacity-80"></div>
                                        </div>
                                    </div>
                                    {/* Item 3 */}
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-3.5 bg-white rounded-sm overflow-hidden flex flex-col"><div className="h-1/2 bg-red-500"></div><div className="h-1/2 bg-white"></div></div>
                                                <span className="text-neutral-300 font-medium">Indonesia</span>
                                            </div>
                                            <span className="text-white font-bold">45%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-[#2c2d33] rounded-full overflow-hidden">
                                            <div className="h-full bg-purple-500 w-[45%] rounded-full opacity-60"></div>
                                        </div>
                                    </div>
                                    {/* Item 4 */}
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-3.5 bg-white rounded-sm overflow-hidden border border-neutral-300 flex justify-center items-center relative"><div className="w-2 h-2 rounded-full bg-red-500 z-10"></div><div className="absolute inset-0 flex"><div className="w-1.5 h-full bg-blue-900 mx-auto"></div></div></div>
                                                <span className="text-neutral-300 font-medium">South Korea</span>
                                            </div>
                                            <span className="text-white font-bold">38%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-[#2c2d33] rounded-full overflow-hidden">
                                            <div className="h-full bg-purple-500 w-[38%] rounded-full opacity-40"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AnimateWrapper>
                    </div>

                    {/* Transaction History */}
                    <AnimateWrapper animationType="slide-up" durationInFrames={30} delayInFrames={60}>
                        <div className="bg-[#1f2026] border border-[#2c2d33] rounded-xl p-6 flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-medium text-white">Transaction History</h3>
                                <div className="flex items-center gap-3">
                                    <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-neutral-300 border border-[#2c2d33] rounded-md hover:bg-white/5">
                                        <Download className="w-3.5 h-3.5" />
                                        Download
                                    </button>
                                    <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-purple-400 border border-purple-500/30 bg-purple-500/10 rounded-md hover:bg-purple-500/20">
                                        <RefreshCw className="w-3.5 h-3.5" />
                                        Re-issue
                                    </button>
                                    <button className="text-neutral-400 hover:text-white">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Table Header */}
                            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_2fr_1fr] bg-[#24252a] p-3 rounded-lg text-xs font-medium text-neutral-400 mb-2">
                                <div className="flex items-center gap-2 pl-2">
                                    <div className="w-4 h-0.5 bg-neutral-600 rounded"></div>
                                    Product Name
                                </div>
                                <div>Order amount</div>
                                <div className="flex items-center gap-1">Date <ArrowDownRight className="w-3 h-3" /></div>
                                <div>Status</div>
                                <div>Executed by</div>
                                <div></div>
                            </div>

                            {/* Table Rows */}
                            <div className="flex flex-col gap-2">
                                {/* Row 1 */}
                                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_2fr_1fr] items-center p-3 hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/5">
                                    <div className="flex items-center gap-3 pl-2 text-sm font-medium text-white">
                                        <div className="w-4 h-4 rounded-sm border border-purple-500 flex items-center justify-center bg-purple-500">
                                            <div className="w-2 h-2 rounded-sm bg-white" style={{ clipPath: 'polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%)' }}></div>
                                        </div>
                                        <div>
                                            <div className="text-sm">TSLA</div>
                                            <div className="text-xs text-neutral-500 font-normal">Tesla, Inc.</div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-neutral-300">$30,021.23</div>
                                    <div className="text-sm text-neutral-400">Dec 13, 2023</div>
                                    <div><span className="flex items-center gap-1.5 text-xs text-white bg-[#2c2d33] px-2 py-1 rounded-full w-max"><span className="w-1.5 h-1.5 rounded-full bg-white"></span> Processing</span></div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-indigo-500 overflow-hidden"><img src="https://i.pravatar.cc/100?img=5" alt="Profile" /></div>
                                        <div>
                                            <div className="text-sm text-neutral-300">Olivia Rhye</div>
                                            <div className="text-xs text-neutral-500">olivia@compani.com</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end pr-2">
                                        <button className="text-xs text-neutral-400 flex items-center gap-1 hover:text-white">More <ChevronDown className="w-3 h-3" /></button>
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_2fr_1fr] items-center p-3 hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/5">
                                    <div className="flex items-center gap-3 pl-2 text-sm font-medium text-white">
                                        <div className="w-4 h-4 rounded-sm border border-neutral-600"></div>
                                        <div>
                                            <div className="text-sm">MTCH</div>
                                            <div className="text-xs text-neutral-500 font-normal">Match Group, Inc.</div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-neutral-300">$10,045.00</div>
                                    <div className="text-sm text-neutral-400">Dec 13, 2023</div>
                                    <div><span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full w-max border border-emerald-500/20"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Success</span></div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-orange-500 overflow-hidden"><img src="https://i.pravatar.cc/100?img=12" alt="Profile" /></div>
                                        <div>
                                            <div className="text-sm text-neutral-300">Phoenix Baker</div>
                                            <div className="text-xs text-neutral-500">phoenix@compani.com</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end pr-2">
                                        <button className="text-xs text-neutral-400 flex items-center gap-1 hover:text-white">More <ChevronDown className="w-3 h-3" /></button>
                                    </div>
                                </div>

                                {/* Row 3 */}
                                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_2fr_1fr] items-center p-3 hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/5">
                                    <div className="flex items-center gap-3 pl-2 text-sm font-medium text-white">
                                        <div className="w-4 h-4 rounded-sm border border-neutral-600"></div>
                                        <div>
                                            <div className="text-sm">DDOG</div>
                                            <div className="text-xs text-neutral-500 font-normal">Datadog Inc</div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-neutral-300">$40,132.16</div>
                                    <div className="text-sm text-neutral-400">Dec 13, 2023</div>
                                    <div><span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full w-max border border-emerald-500/20"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Success</span></div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center text-[10px] text-white">LS</div>
                                        <div>
                                            <div className="text-sm text-neutral-300">Lana Steiner</div>
                                            <div className="text-xs text-neutral-500">lana@compani.com</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end pr-2">
                                        <button className="text-xs text-neutral-400 flex items-center gap-1 hover:text-white">More <ChevronDown className="w-3 h-3" /></button>
                                    </div>
                                </div>

                                {/* Row 4 */}
                                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_2fr_1fr] items-center p-3 hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/5">
                                    <div className="flex items-center gap-3 pl-2 text-sm font-medium text-white">
                                        <div className="w-4 h-4 rounded-sm border border-neutral-600"></div>
                                        <div>
                                            <div className="text-sm">ARKG</div>
                                            <div className="text-xs text-neutral-500 font-normal">ARK Genomic Revolution ETF</div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-neutral-300">$22,665.12</div>
                                    <div className="text-sm text-neutral-400">Dec 28, 2023</div>
                                    <div><span className="flex items-center gap-1.5 text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded-full w-max border border-red-500/20"><span className="w-1.5 h-1.5 rounded-full bg-red-400"></span> Declined</span></div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-stone-500 flex items-center justify-center text-[10px] text-white">DW</div>
                                        <div>
                                            <div className="text-sm text-neutral-300">Demi Wilkinson</div>
                                            <div className="text-xs text-neutral-500">demi@compani.com</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end pr-2">
                                        <button className="text-xs text-neutral-400 flex items-center gap-1 hover:text-white">More <ChevronDown className="w-3 h-3" /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimateWrapper>
                </div>
            </main>
        </div>
    );
};
