import React from 'react';
import { Volume2, VolumeX, Maximize, Minimize, RotateCcw, HelpCircle, ShieldCheck, Download } from 'lucide-react';
import { GAME_STAGES } from '../data/gameData';

interface TopNavProps {
  completedStages: number[];
  completedQuestions: number;
  correctAnswers: number;
  isMuted: boolean;
  onToggleMute: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onReset: () => void;
  onOpenGuide: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  completedStages,
  completedQuestions,
  correctAnswers,
  isMuted,
  onToggleMute,
  isFullscreen,
  onToggleFullscreen,
  onReset,
  onOpenGuide,
}) => {
  const completedCount = completedStages.length;

  return (
    <header className="h-16 px-6 bg-slate-900/90 backdrop-blur-md border-b border-cyan-500/20 flex items-center justify-between z-30 shrink-0">
      {/* Zone 1: Brand title */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 border border-cyan-400/40">
          <span className="font-display font-bold text-white text-base tracking-wider">4.0</span>
        </div>
        <div>
          <h1 className="font-display font-bold text-lg text-white tracking-wide uppercase flex items-center gap-2">
            KÍCH HOẠT KỶ NGUYÊN 4.0
            <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700 font-sans font-medium">
              Tin học 10 · Cánh Diều
            </span>
          </h1>
          <p className="text-xs text-slate-400 font-sans">
            Bài 4: Tin học trong phát triển kinh tế – xã hội
          </p>
        </div>
      </div>

      {/* Zone 2: System Status */}
      <div className="flex items-center gap-4 bg-slate-950/70 border border-slate-800 rounded-lg px-4 py-1.5">
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase font-display tracking-widest text-slate-400">
            SYSTEM STATUS
          </span>
          <span className="text-sm font-display font-bold text-cyan-300">
            {completedCount}/3 HỆ THỐNG ĐÃ KÍCH HOẠT
          </span>
        </div>

        <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
          {GAME_STAGES.map((st) => {
            const isDone = completedStages.includes(st.id);
            return (
              <div
                key={st.id}
                title={`${st.shardName}: ${isDone ? 'Đã kích hoạt' : 'Chưa kích hoạt'}`}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-display font-medium border transition-all ${
                  isDone
                    ? 'bg-cyan-500/15 text-cyan-300 border-cyan-400/50 shadow-sm shadow-cyan-500/20'
                    : 'bg-slate-900/60 text-slate-500 border-slate-800'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isDone ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'
                  }`}
                />
                <span className="whitespace-nowrap">{st.shardName}</span>
                {isDone && <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 ml-0.5" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Zone 3: Control Actions */}
      <div className="flex items-center gap-2">
        <a
          href="/KICH_HOAT_KY_NGUYEN_4.0.html"
          download="KICH_HOAT_KY_NGUYEN_4.0.html"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 hover:text-white border border-cyan-500/50 transition-colors text-xs font-semibold shadow-sm"
          title="Tải game về máy (1 file HTML duy nhất, mở là chạy offline không cần mạng)"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Tải Offline</span>
        </a>

        <button
          onClick={onOpenGuide}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          title="Hướng dẫn trò chơi"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        <button
          onClick={onToggleMute}
          className={`p-2 rounded-lg border transition-colors ${
            isMuted
              ? 'bg-rose-950/40 text-rose-300 border-rose-800 hover:bg-rose-900/50'
              : 'bg-slate-800 text-cyan-300 border-slate-700 hover:bg-slate-700'
          }`}
          title={isMuted ? 'Bật âm thanh (Đang tắt)' : 'Tắt âm thanh (Đang bật)'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <button
          onClick={onToggleFullscreen}
          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          title={isFullscreen ? 'Thu nhỏ màn hình' : 'Toàn màn hình máy chiếu'}
        >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </button>

        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors text-xs font-medium"
          title="Chơi lại từ đầu"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>
    </header>
  );
};
