import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  ArrowRight,
  Database,
  Cpu,
  BarChart3,
  Bot,
  Factory,
  Radio,
  GraduationCap,
  Stethoscope,
  CreditCard,
  Building2
} from 'lucide-react';
import { Stage } from '../data/gameData';
import { sounds } from '../utils/sound';

interface ShardCollectCelebrationProps {
  stage: Stage;
  onContinue: () => void;
}

export const ShardCollectCelebration: React.FC<ShardCollectCelebrationProps> = ({
  stage,
  onContinue,
}) => {
  const [animStage, setAnimStage] = useState<'appear' | 'fly' | 'activate'>('appear');

  useEffect(() => {
    // Sound 1: Power up upon modal entrance
    sounds.powerUp();

    const t1 = setTimeout(() => {
      setAnimStage('fly');
    }, 1200);

    const t2 = setTimeout(() => {
      setAnimStage('activate');
      // Sound 2: Area activate turbine sound
      sounds.areaActivate();
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg select-none">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-cyan-400/50 rounded-2xl p-8 shadow-[0_0_60px_rgba(6,182,212,0.35)] flex flex-col items-center text-center overflow-hidden">
        {/* Background glow radial */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_70%)] pointer-events-none" />

        {/* Small header kicker */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/60 text-xs font-mono-tech text-cyan-300 uppercase tracking-widest mb-4">
          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
          HOÀN THÀNH {stage.title}
        </div>

        {/* Main Activation Banner */}
        <h2 className="text-3xl md:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-amber-300 tracking-wide uppercase mb-2 animate-pulse">
          {stage.activationText}
        </h2>

        <p className="text-sm font-sans text-slate-300 max-w-md mb-8">
          Thu thập thành công mảnh ghép công nghệ <span className="text-cyan-300 font-bold font-display">{stage.shardName}</span>! Năng lượng đã được truyền vào Lõi 4.0.
        </p>

        {/* Central visual shard animation */}
        <div className="relative w-48 h-48 flex items-center justify-center mb-8">
          {/* Energy rings */}
          <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/60 animate-orbit" />
          <div className="absolute -inset-4 rounded-full border border-dotted border-cyan-500/30 animate-orbit-reverse" />

          {/* Central shard icon with fly-in / power state */}
          <div className={`w-32 h-32 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-700 flex flex-col items-center justify-center p-4 shadow-[0_0_40px_rgba(6,182,212,0.6)] border-2 border-white transition-all duration-700 ${
            animStage === 'appear' ? 'scale-100 rotate-0' : animStage === 'fly' ? 'scale-110 -translate-y-4' : 'scale-100 shadow-[0_0_60px_rgba(6,182,212,0.9)]'
          }`}>
            <Zap className="w-12 h-12 text-white animate-pulse" />
            <span className="font-display font-extrabold text-xs text-white uppercase tracking-wider text-center mt-2 leading-tight">
              {stage.shardName}
            </span>
          </div>
        </div>

        {/* Dynamic Stage-Specific Activation Feedback */}
        {stage.id === 1 && (
          <div className="w-full bg-slate-950/70 border border-cyan-500/30 rounded-xl p-4 mb-6">
            <span className="text-xs font-mono-tech text-cyan-400 block mb-2 uppercase tracking-wide">
              HỆ THỐNG ĐÃ KÍCH HOẠT TRONG THÀNH PHỐ:
            </span>
            <div className="grid grid-cols-4 gap-2 text-xs font-sans text-slate-200">
              <div className="flex flex-col items-center p-2 rounded bg-cyan-950/40 border border-cyan-800/40">
                <GraduationCap className="w-4 h-4 text-cyan-300 mb-1" />
                <span>Trường học số</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded bg-cyan-950/40 border border-cyan-800/40">
                <Stethoscope className="w-4 h-4 text-cyan-300 mb-1" />
                <span>Bệnh viện số</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded bg-cyan-950/40 border border-cyan-800/40">
                <CreditCard className="w-4 h-4 text-cyan-300 mb-1" />
                <span>Ngân hàng số</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded bg-cyan-950/40 border border-cyan-800/40">
                <Building2 className="w-4 h-4 text-cyan-300 mb-1" />
                <span>Dịch vụ công</span>
              </div>
            </div>
            <div className="mt-2 text-xs font-mono-tech font-bold text-cyan-300">
              LÕI 4.0: ĐẠT 33% CÔNG SUẤT
            </div>
          </div>
        )}

        {stage.id === 2 && (
          <div className="w-full bg-slate-950/70 border border-sky-500/30 rounded-xl p-4 mb-6">
            <span className="text-xs font-mono-tech text-sky-400 block mb-2 uppercase tracking-wide">
              QUY TRÌNH CHUYỂN HÓA TRI THỨC KÍCH HOẠT:
            </span>
            {/* Visual Effect: DỮ LIỆU → PHÂN TÍCH → TRI THỨC */}
            <div className="flex items-center justify-center gap-3 text-xs font-display font-bold">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-950/80 border border-sky-600 text-sky-200">
                <Database className="w-4 h-4 text-sky-400" />
                <span>DỮ LIỆU</span>
              </div>
              <ArrowRight className="w-4 h-4 text-sky-400 animate-pulse" />
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-950/80 border border-sky-600 text-sky-200">
                <Cpu className="w-4 h-4 text-sky-400" />
                <span>PHÂN TÍCH</span>
              </div>
              <ArrowRight className="w-4 h-4 text-sky-400 animate-pulse" />
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-950/80 border border-sky-600 text-sky-200">
                <BarChart3 className="w-4 h-4 text-sky-400" />
                <span>TRI THỨC</span>
              </div>
            </div>
            <div className="mt-3 text-xs font-mono-tech font-bold text-sky-300">
              LÕI 4.0: ĐẠT 66% CÔNG SUẤT
            </div>
          </div>
        )}

        {stage.id === 3 && (
          <div className="w-full bg-slate-950/70 border border-amber-500/30 rounded-xl p-4 mb-6">
            <span className="text-xs font-mono-tech text-amber-400 block mb-2 uppercase tracking-wide">
              HỆ THỐNG CÔNG NGHIỆP 4.0 VẬN HÀNH:
            </span>
            <div className="grid grid-cols-4 gap-2 text-xs font-sans text-slate-200">
              <div className="flex flex-col items-center p-2 rounded bg-amber-950/40 border border-amber-800/40">
                <Factory className="w-4 h-4 text-amber-300 mb-1" />
                <span>Nhà máy sáng lên</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded bg-amber-950/40 border border-amber-800/40">
                <Bot className="w-4 h-4 text-amber-300 mb-1" />
                <span>Robot hoạt động</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded bg-amber-950/40 border border-amber-800/40">
                <Radio className="w-4 h-4 text-amber-300 mb-1" />
                <span>Cảm biến phát sóng</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded bg-amber-950/40 border border-amber-800/40">
                <Zap className="w-4 h-4 text-amber-300 mb-1" />
                <span>Đường dữ liệu IoT</span>
              </div>
            </div>
            <div className="mt-2 text-xs font-mono-tech font-bold text-amber-300">
              LÕI 4.0: ĐẠT 100% CÔNG SUẤT
            </div>
          </div>
        )}

        {/* Continue Button */}
        <button
          onClick={onContinue}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-400 hover:scale-105 active:scale-95 text-slate-950 font-display font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/30 transition-all flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>TIẾP TỤC KHÁM PHÁ THÀNH PHỐ</span>
        </button>
      </div>
    </div>
  );
};
