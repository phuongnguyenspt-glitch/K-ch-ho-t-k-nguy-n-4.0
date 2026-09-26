import React from 'react';
import { 
  Building2, 
  Stethoscope, 
  CreditCard, 
  GraduationCap, 
  Database, 
  Cpu, 
  BarChart3, 
  Factory, 
  Radio, 
  Bot, 
  CheckCircle2, 
  Play, 
  Sparkles,
  Zap,
  Globe2,
  Workflow
} from 'lucide-react';
import { Stage, GAME_STAGES } from '../data/gameData';

interface CityMapProps {
  completedStages: number[];
  onSelectStage: (stage: Stage) => void;
  onTriggerFinale: () => void;
  corePercentage: number;
}

export const CityMap: React.FC<CityMapProps> = ({
  completedStages,
  onSelectStage,
  onTriggerFinale,
  corePercentage,
}) => {
  const isAllCompleted = completedStages.length === 3;

  const isStage1Done = completedStages.includes(1);
  const isStage2Done = completedStages.includes(2);
  const isStage3Done = completedStages.includes(3);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-4 overflow-hidden select-none bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 cyber-grid">
      {/* Background radial glow */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${
          isAllCompleted 
            ? 'bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.18)_0%,rgba(245,158,11,0.12)_45%,transparent_75%)]'
            : 'bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.08)_0%,transparent_60%)]'
        }`}
      />

      {/* Subtle Grid Coordinates overlay */}
      <div className="absolute top-3 left-4 text-[11px] font-mono-tech text-cyan-400/40 tracking-wider">
        SMART CITY GRID // ZONE: LAT.10°46&apos;N · LON.106°40&apos;E // SEC-4.0
      </div>
      <div className="absolute top-3 right-4 text-[11px] font-mono-tech text-cyan-400/40 tracking-wider">
        REACTOR MODE: {isAllCompleted ? 'READY FOR CRITICAL MASS' : 'AWAITING 3 TECH SHARDS'}
      </div>

      {/* TOP SECTION: DISTRICT 1 & DISTRICT 2 */}
      <div className="w-full grid grid-cols-2 gap-8 z-10 max-w-6xl mt-2">
        {/* DISTRICT 1: SỐ HÓA CUỘC SỐNG */}
        <div 
          onClick={() => !isStage1Done && onSelectStage(GAME_STAGES[0])}
          className={`relative rounded-xl border p-4.5 transition-all duration-500 cursor-pointer group ${
            isStage1Done
              ? 'bg-slate-900/80 border-cyan-500/50 shadow-lg shadow-cyan-950/50'
              : 'bg-slate-900/40 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/60'
          }`}
        >
          {/* Header indicator */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <span className={`w-6 h-6 rounded-md flex items-center justify-center font-display font-bold text-xs ${
                isStage1Done ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                01
              </span>
              <div>
                <h3 className="font-display font-bold text-sm tracking-wide text-white group-hover:text-cyan-300 transition-colors">
                  CHẶNG 1: SỐ HÓA CUỘC SỐNG
                </h3>
                <span className="text-[11px] font-mono-tech text-cyan-400">
                  MẢNH GHÉP: ỨNG DỤNG CNTT
                </span>
              </div>
            </div>

            {isStage1Done ? (
              <span className="flex items-center gap-1 text-xs font-display font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-700/50 px-2 py-0.5 rounded">
                <CheckCircle2 className="w-3.5 h-3.5" /> ĐÃ KÍCH HOẠT
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-display font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-700/40 px-2.5 py-0.5 rounded animate-pulse">
                <Play className="w-3 h-3 fill-current" /> KHÁM PHÁ
              </span>
            )}
          </div>

          {/* Isometric Building Cluster (School, Hospital, Digital Banking, Public Services) */}
          <div className={`grid grid-cols-4 gap-2 p-2.5 rounded-lg border transition-all ${
            isStage1Done 
              ? 'bg-cyan-950/20 border-cyan-500/30' 
              : 'bg-slate-950/40 border-slate-800/80 opacity-60'
          }`}>
            {/* School */}
            <div className={`p-2 rounded flex flex-col items-center justify-center gap-1 border transition-all ${
              isStage1Done 
                ? 'bg-slate-900/90 border-cyan-400/40 text-cyan-300 shadow-sm shadow-cyan-500/20' 
                : 'bg-slate-900/30 border-slate-800 text-slate-600'
            }`}>
              <GraduationCap className={`w-5 h-5 ${isStage1Done ? 'text-cyan-400 animate-bounce' : ''}`} />
              <span className="text-[10px] font-sans font-medium text-center">Trường học</span>
              <span className={`text-[9px] font-mono-tech ${isStage1Done ? 'text-cyan-400' : 'text-slate-600'}`}>
                {isStage1Done ? 'E-Learning' : 'Offline'}
              </span>
            </div>

            {/* Hospital */}
            <div className={`p-2 rounded flex flex-col items-center justify-center gap-1 border transition-all ${
              isStage1Done 
                ? 'bg-slate-900/90 border-cyan-400/40 text-cyan-300 shadow-sm shadow-cyan-500/20' 
                : 'bg-slate-900/30 border-slate-800 text-slate-600'
            }`}>
              <Stethoscope className={`w-5 h-5 ${isStage1Done ? 'text-cyan-400' : ''}`} />
              <span className="text-[10px] font-sans font-medium text-center">Bệnh viện số</span>
              <span className={`text-[9px] font-mono-tech ${isStage1Done ? 'text-cyan-400' : 'text-slate-600'}`}>
                {isStage1Done ? 'Hồ sơ số' : 'Offline'}
              </span>
            </div>

            {/* Banking */}
            <div className={`p-2 rounded flex flex-col items-center justify-center gap-1 border transition-all ${
              isStage1Done 
                ? 'bg-slate-900/90 border-cyan-400/40 text-cyan-300 shadow-sm shadow-cyan-500/20' 
                : 'bg-slate-900/30 border-slate-800 text-slate-600'
            }`}>
              <CreditCard className={`w-5 h-5 ${isStage1Done ? 'text-cyan-400' : ''}`} />
              <span className="text-[10px] font-sans font-medium text-center">Ngân hàng</span>
              <span className={`text-[9px] font-mono-tech ${isStage1Done ? 'text-cyan-400' : 'text-slate-600'}`}>
                {isStage1Done ? 'E-Banking' : 'Offline'}
              </span>
            </div>

            {/* Public Service */}
            <div className={`p-2 rounded flex flex-col items-center justify-center gap-1 border transition-all ${
              isStage1Done 
                ? 'bg-slate-900/90 border-cyan-400/40 text-cyan-300 shadow-sm shadow-cyan-500/20' 
                : 'bg-slate-900/30 border-slate-800 text-slate-600'
            }`}>
              <Building2 className={`w-5 h-5 ${isStage1Done ? 'text-cyan-400' : ''}`} />
              <span className="text-[10px] font-sans font-medium text-center">Dịch vụ công</span>
              <span className={`text-[9px] font-mono-tech ${isStage1Done ? 'text-cyan-400' : 'text-slate-600'}`}>
                {isStage1Done ? 'Cổng DVC' : 'Offline'}
              </span>
            </div>
          </div>

          <div className="mt-2.5 flex items-center justify-between text-xs text-slate-400">
            <span className="truncate">Chính phủ số · Doanh nghiệp số · Xã hội số</span>
            {isStage1Done ? (
              <button 
                onClick={(e) => { e.stopPropagation(); onSelectStage(GAME_STAGES[0]); }}
                className="text-[11px] text-cyan-400 hover:underline shrink-0"
              >
                Xem lại câu hỏi
              </button>
            ) : (
              <span className="text-[11px] text-cyan-400 font-mono-tech shrink-0">Bấm để trả lời</span>
            )}
          </div>
        </div>

        {/* DISTRICT 2: KHAI MỞ TRI THỨC */}
        <div 
          onClick={() => !isStage2Done && onSelectStage(GAME_STAGES[1])}
          className={`relative rounded-xl border p-4.5 transition-all duration-500 cursor-pointer group ${
            isStage2Done
              ? 'bg-slate-900/80 border-sky-500/50 shadow-lg shadow-sky-950/50'
              : 'bg-slate-900/40 border-slate-800 hover:border-sky-500/40 hover:bg-slate-900/60'
          }`}
        >
          {/* Header indicator */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <span className={`w-6 h-6 rounded-md flex items-center justify-center font-display font-bold text-xs ${
                isStage2Done ? 'bg-sky-400 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                02
              </span>
              <div>
                <h3 className="font-display font-bold text-sm tracking-wide text-white group-hover:text-sky-300 transition-colors">
                  CHẶNG 2: KHAI MỞ TRI THỨC
                </h3>
                <span className="text-[11px] font-mono-tech text-sky-400">
                  MẢNH GHÉP: TRI THỨC SỐ
                </span>
              </div>
            </div>

            {isStage2Done ? (
              <span className="flex items-center gap-1 text-xs font-display font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-700/50 px-2 py-0.5 rounded">
                <CheckCircle2 className="w-3.5 h-3.5" /> ĐÃ KÍCH HOẠT
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-display font-bold text-sky-400 bg-sky-950/60 border border-sky-700/40 px-2.5 py-0.5 rounded animate-pulse">
                <Play className="w-3 h-3 fill-current" /> KHÁM PHÁ
              </span>
            )}
          </div>

          {/* Visual Elements: Data Center, Analysis, Knowledge Graphs */}
          <div className={`grid grid-cols-3 gap-2 p-2.5 rounded-lg border transition-all ${
            isStage2Done 
              ? 'bg-sky-950/20 border-sky-500/30' 
              : 'bg-slate-950/40 border-slate-800/80 opacity-60'
          }`}>
            {/* Big Data */}
            <div className={`p-2 rounded flex flex-col items-center justify-center gap-1 border transition-all ${
              isStage2Done 
                ? 'bg-slate-900/90 border-sky-400/40 text-sky-300 shadow-sm shadow-sky-500/20' 
                : 'bg-slate-900/30 border-slate-800 text-slate-600'
            }`}>
              <Database className={`w-5 h-5 ${isStage2Done ? 'text-sky-400 animate-pulse' : ''}`} />
              <span className="text-[10px] font-sans font-medium text-center">Kho dữ liệu</span>
              <span className={`text-[9px] font-mono-tech ${isStage2Done ? 'text-sky-400' : 'text-slate-600'}`}>
                {isStage2Done ? 'DỮ LIỆU' : 'Offline'}
              </span>
            </div>

            {/* Analysis Engine */}
            <div className={`p-2 rounded flex flex-col items-center justify-center gap-1 border transition-all ${
              isStage2Done 
                ? 'bg-slate-900/90 border-sky-400/40 text-sky-300 shadow-sm shadow-sky-500/20' 
                : 'bg-slate-900/30 border-slate-800 text-slate-600'
            }`}>
              <Cpu className={`w-5 h-5 ${isStage2Done ? 'text-sky-400 animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
              <span className="text-[10px] font-sans font-medium text-center">Xử lí phân tích</span>
              <span className={`text-[9px] font-mono-tech ${isStage2Done ? 'text-sky-400' : 'text-slate-600'}`}>
                {isStage2Done ? 'PHÂN TÍCH' : 'Offline'}
              </span>
            </div>

            {/* Knowledge Charts */}
            <div className={`p-2 rounded flex flex-col items-center justify-center gap-1 border transition-all ${
              isStage2Done 
                ? 'bg-slate-900/90 border-sky-400/40 text-sky-300 shadow-sm shadow-sky-500/20' 
                : 'bg-slate-900/30 border-slate-800 text-slate-600'
            }`}>
              <BarChart3 className={`w-5 h-5 ${isStage2Done ? 'text-sky-400' : ''}`} />
              <span className="text-[10px] font-sans font-medium text-center">Khai thác tri thức</span>
              <span className={`text-[9px] font-mono-tech ${isStage2Done ? 'text-sky-400' : 'text-slate-600'}`}>
                {isStage2Done ? 'TRI THỨC' : 'Offline'}
              </span>
            </div>
          </div>

          <div className="mt-2.5 flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono-tech text-[11px] text-sky-300/80">
              DỮ LIỆU → PHÂN TÍCH → TRI THỨC
            </span>
            {isStage2Done ? (
              <button 
                onClick={(e) => { e.stopPropagation(); onSelectStage(GAME_STAGES[1]); }}
                className="text-[11px] text-sky-400 hover:underline shrink-0"
              >
                Xem lại câu hỏi
              </button>
            ) : (
              <span className="text-[11px] text-sky-400 font-mono-tech shrink-0">Bấm để trả lời</span>
            )}
          </div>
        </div>
      </div>

      {/* CENTER STAGE: LÕI 4.0 (THE QUANTUM REACTOR CORE) */}
      <div className="relative my-auto flex flex-col items-center justify-center z-20">
        {/* Optical laser lines connecting districts to core */}
        <svg className="absolute w-[800px] h-[320px] pointer-events-none -top-16" viewBox="0 0 800 320">
          <defs>
            <linearGradient id="laserGrad1" x1="0%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity={isStage1Done ? 0.9 : 0.15} />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity={isStage1Done ? 1 : 0.2} />
            </linearGradient>
            <linearGradient id="laserGrad2" x1="100%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity={isStage2Done ? 0.9 : 0.15} />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity={isStage2Done ? 1 : 0.2} />
            </linearGradient>
            <linearGradient id="laserGrad3" x1="50%" y1="100%" x2="50%" y2="50%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity={isStage3Done ? 0.9 : 0.15} />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity={isStage3Done ? 1 : 0.2} />
            </linearGradient>
          </defs>

          {/* Line from District 1 */}
          <path 
            d="M 180 30 Q 300 90 400 160" 
            fill="none" 
            stroke="url(#laserGrad1)" 
            strokeWidth={isStage1Done ? "2.5" : "1"} 
            strokeDasharray={isStage1Done ? "4 4" : "2 6"}
            className={isStage1Done ? "animate-pulse" : ""}
          />

          {/* Line from District 2 */}
          <path 
            d="M 620 30 Q 500 90 400 160" 
            fill="none" 
            stroke="url(#laserGrad2)" 
            strokeWidth={isStage2Done ? "2.5" : "1"} 
            strokeDasharray={isStage2Done ? "4 4" : "2 6"}
            className={isStage2Done ? "animate-pulse" : ""}
          />

          {/* Line from District 3 */}
          <path 
            d="M 400 290 L 400 190" 
            fill="none" 
            stroke="url(#laserGrad3)" 
            strokeWidth={isStage3Done ? "2.5" : "1"} 
            strokeDasharray={isStage3Done ? "4 4" : "2 6"}
            className={isStage3Done ? "animate-pulse" : ""}
          />
        </svg>

        {/* Central Core Circle Container */}
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Outer rotating decorative tech rings */}
          <div className={`absolute inset-0 rounded-full border border-dashed transition-all duration-1000 ${
            isAllCompleted 
              ? 'border-amber-400/80 shadow-[0_0_50px_rgba(245,158,11,0.4)] animate-orbit' 
              : corePercentage > 0 
                ? 'border-cyan-400/60 shadow-[0_0_30px_rgba(6,182,212,0.3)] animate-orbit' 
                : 'border-slate-700/50'
          }`} />

          <div className={`absolute -inset-3 rounded-full border border-dotted transition-all duration-1000 ${
            isAllCompleted 
              ? 'border-cyan-300/60 animate-orbit-reverse' 
              : corePercentage > 0 
                ? 'border-cyan-500/40 animate-orbit-reverse' 
                : 'border-slate-800/40'
          }`} />

          {/* Central Reactor Ball */}
          <div className={`relative w-36 h-36 rounded-full flex flex-col items-center justify-center p-3 text-center transition-all duration-700 border ${
            isAllCompleted
              ? 'bg-gradient-to-br from-cyan-600 via-sky-500 to-amber-500 border-amber-300 shadow-[0_0_60px_rgba(6,182,212,0.7)] text-white'
              : corePercentage > 0
                ? 'bg-gradient-to-br from-slate-900 via-cyan-950 to-blue-950 border-cyan-400 shadow-[0_0_35px_rgba(6,182,212,0.4)] text-white'
                : 'bg-slate-950 border-slate-800 text-slate-400 shadow-inner'
          }`}>
            <span className="text-[10px] font-display font-semibold uppercase tracking-widest text-cyan-200">
              TRUNG TÂM
            </span>
            <div className="font-display font-black text-2xl tracking-wider my-0.5">
              LÕI 4.0
            </div>

            <div className={`text-base font-mono-tech font-bold ${
              isAllCompleted ? 'text-amber-200 animate-pulse' : corePercentage > 0 ? 'text-cyan-300' : 'text-slate-500'
            }`}>
              {corePercentage}%
            </div>

            <span className={`text-[10px] font-mono-tech uppercase tracking-tight mt-0.5 px-2 py-0.5 rounded-full border ${
              isAllCompleted 
                ? 'bg-amber-400/20 text-amber-200 border-amber-400 animate-pulse'
                : corePercentage > 0 
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500' 
                  : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}>
              {isAllCompleted ? 'SẴN SÀNG KÍCH HOẠT' : corePercentage > 0 ? 'ONLINE' : 'OFFLINE'}
            </span>
          </div>

          {/* Three shard slots around the core */}
          {/* Shard 1 Slot (Top Left) */}
          <div className={`absolute -top-3 -left-3 w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
            isStage1Done 
              ? 'bg-cyan-500 text-slate-950 border-white shadow-lg shadow-cyan-500/50 scale-110' 
              : 'bg-slate-900 border-slate-700 text-slate-600'
          }`} title="Mảnh ghép 1: Ứng dụng CNTT">
            <Globe2 className="w-4 h-4" />
          </div>

          {/* Shard 2 Slot (Top Right) */}
          <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
            isStage2Done 
              ? 'bg-sky-400 text-slate-950 border-white shadow-lg shadow-sky-400/50 scale-110' 
              : 'bg-slate-900 border-slate-700 text-slate-600'
          }`} title="Mảnh ghép 2: Tri thức số">
            <Workflow className="w-4 h-4" />
          </div>

          {/* Shard 3 Slot (Bottom) */}
          <div className={`absolute -bottom-3 w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
            isStage3Done 
              ? 'bg-amber-400 text-slate-950 border-white shadow-lg shadow-amber-400/50 scale-110' 
              : 'bg-slate-900 border-slate-700 text-slate-600'
          }`} title="Mảnh ghép 3: Công nghệ 4.0">
            <Zap className="w-4 h-4" />
          </div>
        </div>

        {/* If all completed: Trigger Finale Button */}
        {isAllCompleted && (
          <div className="mt-4 flex flex-col items-center">
            <button
              onClick={onTriggerFinale}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-cyan-400 to-amber-400 text-slate-950 font-display font-bold text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(251,191,36,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 animate-bounce"
            >
              <Sparkles className="w-4 h-4" />
              KÍCH HOẠT LÕI 4.0 & TOÀN THÀNH PHỐ!
            </button>
            <span className="text-[11px] font-sans text-cyan-300 mt-1">
              Đã thu thập đủ 3 mảnh ghép công nghệ!
            </span>
          </div>
        )}
      </div>

      {/* BOTTOM SECTION: DISTRICT 3 (CÔNG NGHỆ 4.0) */}
      <div className="w-full max-w-4xl z-10 mb-2">
        <div 
          onClick={() => !isStage3Done && onSelectStage(GAME_STAGES[2])}
          className={`relative rounded-xl border p-4 transition-all duration-500 cursor-pointer group ${
            isStage3Done
              ? 'bg-slate-900/80 border-amber-500/50 shadow-lg shadow-amber-950/50'
              : 'bg-slate-900/40 border-slate-800 hover:border-amber-500/40 hover:bg-slate-900/60'
          }`}
        >
          {/* Header indicator */}
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2.5">
              <span className={`w-6 h-6 rounded-md flex items-center justify-center font-display font-bold text-xs ${
                isStage3Done ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}>
                03
              </span>
              <div>
                <h3 className="font-display font-bold text-sm tracking-wide text-white group-hover:text-amber-300 transition-colors">
                  CHẶNG 3: KÍCH HOẠT CÔNG NGHIỆP 4.0
                </h3>
                <span className="text-[11px] font-mono-tech text-amber-400">
                  MẢNH GHÉP: CÔNG NGHỆ 4.0
                </span>
              </div>
            </div>

            {isStage3Done ? (
              <span className="flex items-center gap-1 text-xs font-display font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-700/50 px-2 py-0.5 rounded">
                <CheckCircle2 className="w-3.5 h-3.5" /> ĐÃ KÍCH HOẠT
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-display font-bold text-amber-400 bg-amber-950/60 border border-amber-700/40 px-2.5 py-0.5 rounded animate-pulse">
                <Play className="w-3 h-3 fill-current" /> KHÁM PHÁ
              </span>
            )}
          </div>

          {/* Visual Elements: Smart Factory, Robotic Arm, IoT Sensor Network */}
          <div className={`grid grid-cols-4 gap-2.5 p-2 rounded-lg border transition-all ${
            isStage3Done 
              ? 'bg-amber-950/20 border-amber-500/30' 
              : 'bg-slate-950/40 border-slate-800/80 opacity-60'
          }`}>
            {/* Smart Factory */}
            <div className={`p-2 rounded flex flex-col items-center justify-center gap-1 border transition-all ${
              isStage3Done 
                ? 'bg-slate-900/90 border-amber-400/40 text-amber-300 shadow-sm shadow-amber-500/20' 
                : 'bg-slate-900/30 border-slate-800 text-slate-600'
            }`}>
              <Factory className={`w-5 h-5 ${isStage3Done ? 'text-amber-400 animate-pulse' : ''}`} />
              <span className="text-[10px] font-sans font-medium text-center">Nhà máy 4.0</span>
              <span className={`text-[9px] font-mono-tech ${isStage3Done ? 'text-amber-400' : 'text-slate-600'}`}>
                {isStage3Done ? 'Tự động hóa' : 'Offline'}
              </span>
            </div>

            {/* Robotic Arm */}
            <div className={`p-2 rounded flex flex-col items-center justify-center gap-1 border transition-all ${
              isStage3Done 
                ? 'bg-slate-900/90 border-amber-400/40 text-amber-300 shadow-sm shadow-amber-500/20' 
                : 'bg-slate-900/30 border-slate-800 text-slate-600'
            }`}>
              <Bot className={`w-5 h-5 ${isStage3Done ? 'text-amber-400' : ''}`} />
              <span className="text-[10px] font-sans font-medium text-center">Cánh tay robot</span>
              <span className={`text-[9px] font-mono-tech ${isStage3Done ? 'text-amber-400' : 'text-slate-600'}`}>
                {isStage3Done ? 'Vận hành' : 'Offline'}
              </span>
            </div>

            {/* IoT Sensors */}
            <div className={`p-2 rounded flex flex-col items-center justify-center gap-1 border transition-all ${
              isStage3Done 
                ? 'bg-slate-900/90 border-amber-400/40 text-amber-300 shadow-sm shadow-amber-500/20' 
                : 'bg-slate-900/30 border-slate-800 text-slate-600'
            }`}>
              <Radio className={`w-5 h-5 ${isStage3Done ? 'text-amber-400 animate-ping' : ''}`} style={{ animationDuration: '3s' }} />
              <span className="text-[10px] font-sans font-medium text-center">Cảm biến IoT</span>
              <span className={`text-[9px] font-mono-tech ${isStage3Done ? 'text-amber-400' : 'text-slate-600'}`}>
                {isStage3Done ? 'Thu nhận DL' : 'Offline'}
              </span>
            </div>

            {/* Connected Cyber-Physical Network */}
            <div className={`p-2 rounded flex flex-col items-center justify-center gap-1 border transition-all ${
              isStage3Done 
                ? 'bg-slate-900/90 border-amber-400/40 text-amber-300 shadow-sm shadow-amber-500/20' 
                : 'bg-slate-900/30 border-slate-800 text-slate-600'
            }`}>
              <Cpu className={`w-5 h-5 ${isStage3Done ? 'text-amber-400' : ''}`} />
              <span className="text-[10px] font-sans font-medium text-center">Hệ thống thực-ảo</span>
              <span className={`text-[9px] font-mono-tech ${isStage3Done ? 'text-amber-400' : 'text-slate-600'}`}>
                {isStage3Done ? 'CPS Online' : 'Offline'}
              </span>
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
            <span className="truncate">Cách mạng công nghiệp 4.0 · Internet vạn vật (IoT) · Máy móc thông minh</span>
            {isStage3Done ? (
              <button 
                onClick={(e) => { e.stopPropagation(); onSelectStage(GAME_STAGES[2]); }}
                className="text-[11px] text-amber-400 hover:underline shrink-0"
              >
                Xem lại câu hỏi
              </button>
            ) : (
              <span className="text-[11px] text-amber-400 font-mono-tech shrink-0">Bấm để trả lời</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
