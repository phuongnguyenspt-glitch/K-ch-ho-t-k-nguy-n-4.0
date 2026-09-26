import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  AlertTriangle,
  BookOpen,
  GraduationCap,
  Stethoscope,
  CreditCard,
  Database,
  Cpu,
  Bot,
  Factory,
  Radio,
  HelpCircle
} from 'lucide-react';
import { FINAL_MESSAGE } from '../data/gameData';
import { sounds } from '../utils/sound';

interface GrandFinaleModalProps {
  correctCount: number;
  completedCount: number;
  onReset: () => void;
  onOpenReview: () => void;
}

export const GrandFinaleModal: React.FC<GrandFinaleModalProps> = ({
  correctCount,
  completedCount,
  onReset,
  onOpenReview,
}) => {
  // Determine performance tier:
  // Tier 1: 5-6 correct
  // Tier 2: 3-4 correct
  // Tier 3: 0-2 correct
  const isTier1 = correctCount >= 5;
  const isTier2 = correctCount >= 3 && correctCount <= 4;
  const isTier3 = correctCount <= 2;

  // Animation phases:
  // For Tier 1 & 2: 'countdown' -> 'ignite' -> 'illuminating' -> 'result'
  // For Tier 3: 'attempt' (blinking) -> 'result'
  const [phase, setPhase] = useState<'countdown' | 'ignite' | 'illuminating' | 'attempt' | 'result'>(
    isTier3 ? 'attempt' : 'countdown'
  );
  const [countdown, setCountdown] = useState<number | 'KÍCH HOẠT!'>(3);
  const [activeStep, setActiveStep] = useState<number>(0);

  const activationSteps = [
    { title: 'Trường học thông minh sáng lên', icon: GraduationCap, color: 'text-cyan-400' },
    { title: 'Bệnh viện số & Y tế thông minh vận hành', icon: Stethoscope, color: 'text-cyan-400' },
    { title: 'Ngân hàng số & E-Banking giao dịch', icon: CreditCard, color: 'text-cyan-400' },
    { title: 'Dòng dữ liệu & Tri thức số chuyển động', icon: Database, color: 'text-sky-400' },
    { title: 'Robot tự động & Cánh tay máy hoạt động', icon: Bot, color: 'text-amber-400' },
    { title: 'Nhà máy thông minh 4.0 vận hành', icon: Factory, color: 'text-amber-400' },
    { title: 'Cảm biến IoT phát tín hiệu kết nối', icon: Radio, color: 'text-amber-400' },
    { title: 'Mạng lưới IoT toàn thành phố kết nối thông suốt', icon: Zap, color: 'text-emerald-400' },
  ];

  useEffect(() => {
    if (isTier3) {
      // Tier 3: Low power sound & quick blink
      sounds.powerLow();
      const t = setTimeout(() => {
        setPhase('result');
      }, 2000);
      return () => clearTimeout(t);
    }

    // For Tier 1 and Tier 2:
    sounds.energyClimax();

    const t3 = setTimeout(() => {
      setCountdown(2);
      sounds.tick();
    }, 1000);

    const t2 = setTimeout(() => {
      setCountdown(1);
      sounds.tick();
    }, 2000);

    const t1 = setTimeout(() => {
      setCountdown('KÍCH HOẠT!');
      setPhase('ignite');
      sounds.powerUp();
    }, 3000);

    const tIgnite = setTimeout(() => {
      setPhase('illuminating');
    }, 3800);

    return () => {
      clearTimeout(t3);
      clearTimeout(t2);
      clearTimeout(t1);
      clearTimeout(tIgnite);
    };
  }, [isTier3]);

  // Step-by-step illumination
  useEffect(() => {
    if (phase !== 'illuminating') return;

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setActiveStep(step);
      sounds.tick();

      if (step >= activationSteps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setPhase('result');

          if (isTier1) {
            sounds.victoryFanfare();
            try {
              confetti({
                particleCount: 130,
                spread: 100,
                origin: { y: 0.6 }
              });
              setTimeout(() => {
                confetti({ particleCount: 80, angle: 60, spread: 55, origin: { x: 0 } });
                confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1 } });
              }, 400);
            } catch {
              // Ignore if in test env
            }
          } else if (isTier2) {
            sounds.completionLight();
          }
        }, 700);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [phase, isTier1, isTier2]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl select-none overflow-y-auto">
      {/* TIER 3 ATTEMPT BLINKING ANIMATION */}
      {phase === 'attempt' && (
        <div className="flex flex-col items-center justify-center text-center animate-fadeIn">
          <div className="relative w-64 h-64 flex items-center justify-center mb-6">
            <div className="absolute inset-0 rounded-full border border-dashed border-amber-500/30 animate-pulse" />
            <div className="w-40 h-40 rounded-full bg-slate-900 border-2 border-amber-500/50 flex flex-col items-center justify-center p-4 text-amber-300 animate-pulse">
              <Zap className="w-10 h-10 text-amber-400 mb-1" />
              <span className="font-display font-bold text-lg">LÕI 4.0</span>
              <span className="text-[11px] font-mono-tech text-amber-400/80">NĂNG LƯỢNG YẾU</span>
            </div>
          </div>
          <h2 className="text-2xl font-display font-black text-amber-300 uppercase mb-2">
            ĐANG TÍCH TỤ NĂNG LƯỢNG...
          </h2>
          <p className="text-xs font-sans text-slate-400">
            Hệ thống đang kiểm tra mức độ đáp ứng năng lượng tri thức...
          </p>
        </div>
      )}

      {/* PHASE: COUNTDOWN & CORE IGNITION (TIERS 1 & 2) */}
      {(phase === 'countdown' || phase === 'ignite') && (
        <div className="flex flex-col items-center justify-center text-center animate-fadeIn">
          {/* Central Reactor Core with 3 orbiting shards */}
          <div className="relative w-72 h-72 flex items-center justify-center mb-8">
            <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-2xl animate-pulse" />
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/50 animate-orbit" />
            <div className="absolute -inset-6 rounded-full border border-dotted border-amber-400/50 animate-orbit-reverse" />

            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-cyan-950/90 border border-cyan-400 text-cyan-200 text-xs font-display font-bold shadow-lg shadow-cyan-500/40">
              1. ỨNG DỤNG CNTT
            </div>
            <div className="absolute top-1/2 -right-10 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-sky-950/90 border border-sky-400 text-sky-200 text-xs font-display font-bold shadow-lg shadow-sky-500/40">
              2. TRI THỨC SỐ
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-amber-950/90 border border-amber-400 text-amber-200 text-xs font-display font-bold shadow-lg shadow-amber-500/40">
              3. CÔNG NGHỆ 4.0
            </div>

            <div className={`w-44 h-44 rounded-full flex flex-col items-center justify-center p-4 transition-all duration-700 border-2 ${
              phase === 'ignite'
                ? 'bg-white border-amber-300 text-slate-950 shadow-[0_0_90px_rgba(255,255,255,0.9)] scale-110'
                : 'bg-gradient-to-br from-cyan-600 via-sky-600 to-amber-500 border-white text-white shadow-[0_0_60px_rgba(6,182,212,0.8)]'
            }`}>
              <Zap className={`w-10 h-10 ${phase === 'ignite' ? 'text-amber-500 animate-spin' : 'text-white'}`} />
              <span className="font-display font-black text-xl tracking-wider uppercase mt-1">
                LÕI 4.0
              </span>
              <span className="font-mono-tech text-xs tracking-widest text-cyan-100 uppercase">
                {phase === 'ignite' ? 'CRITICAL MASS' : 'ORBIT SYNCHRONIZED'}
              </span>
            </div>
          </div>

          <div className="font-display font-black text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-cyan-300 tracking-wider">
            {countdown}
          </div>
          <p className="text-sm font-sans text-slate-300 mt-2">
            Đang hợp nhất 3 mảnh ghép công nghệ và giải phóng năng lượng toàn thành phố...
          </p>
        </div>
      )}

      {/* PHASE: ILLUMINATING CITY SYSTEMS */}
      {phase === 'illuminating' && (
        <div className="w-full max-w-3xl flex flex-col items-center text-center animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-amber-400 flex items-center justify-center p-3 text-slate-950 mb-4 shadow-[0_0_40px_rgba(6,182,212,0.8)] animate-pulse">
            <Zap className="w-10 h-10 stroke-[2.5]" />
          </div>

          <h2 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-wide mb-1">
            LÕI 4.0 BÙNG SÁNG – LAN TỎA NĂNG LƯỢNG
          </h2>
          <p className="text-xs font-mono-tech text-cyan-400 uppercase tracking-widest mb-6">
            KÍCH HOẠT TUẦN TỰ CÁC HẠ TẦNG THÔNG MINH
          </p>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 text-left">
            {activationSteps.map((step, idx) => {
              const isStepDone = idx < activeStep;
              const isCurrent = idx === activeStep - 1;
              const IconComp = step.icon;

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-300 ${
                    isStepDone
                      ? 'bg-slate-900 border-cyan-500/60 shadow-md shadow-cyan-950/40 text-white'
                      : 'bg-slate-950/40 border-slate-800 text-slate-600'
                  } ${isCurrent ? 'ring-2 ring-cyan-400 scale-[1.02]' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                    isStepDone ? 'bg-cyan-950 border-cyan-400 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-700'
                  }`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <span className={`text-sm font-sans font-semibold flex-1 ${isStepDone ? 'text-slate-100' : 'text-slate-600'}`}>
                    {step.title}
                  </span>
                  {isStepDone && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-xs font-mono-tech text-slate-400">
            HỆ THỐNG ĐANG ĐỒNG BỘ: {Math.min(activeStep, activationSteps.length)} / {activationSteps.length}
          </div>
        </div>
      )}

      {/* PHASE: RESULT SUMMARY SCREEN (3 TIERS) */}
      {phase === 'result' && (
        <div className="w-full max-w-3xl bg-slate-900 border-2 rounded-3xl p-6 md:p-8 flex flex-col items-center text-center animate-scaleUp shadow-2xl transition-all border-cyan-500/50">
          {/* Header Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono-tech uppercase tracking-widest mb-3">
            <span>KẾT QUẢ CỦA BẠN</span>
          </div>

          {/* Big Score Box */}
          <div className="flex items-center gap-2 mb-4 bg-slate-950/80 px-6 py-2 rounded-2xl border border-slate-800">
            <span className="text-sm font-display text-slate-300 font-semibold">Số câu đúng:</span>
            <span className={`text-3xl font-display font-black ${
              isTier1 ? 'text-emerald-400' : isTier2 ? 'text-cyan-400' : 'text-amber-400'
            }`}>
              {correctCount} / 6
            </span>
          </div>

          {/* ============================================================== */}
          {/* TIER 1: ĐÚNG 5-6 CÂU (XUẤT SẮC) */}
          {/* ============================================================== */}
          {isTier1 && (
            <>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-mono-tech uppercase tracking-widest mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                {FINAL_MESSAGE.status}
              </div>

              <h1 className="text-4xl md:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-cyan-300 to-white tracking-wide uppercase leading-tight mb-1">
                XUẤT SẮC!
              </h1>

              <div className="text-lg md:text-xl font-display font-bold text-cyan-200 tracking-wider mb-5">
                KÍCH HOẠT KỶ NGUYÊN 4.0 THÀNH CÔNG!
              </div>

              {/* 3 Shards Integration Equation Card */}
              <div className="w-full bg-slate-950/80 border border-cyan-500/30 rounded-2xl p-4.5 mb-5">
                <div className="text-xs font-mono-tech text-slate-400 uppercase tracking-widest mb-3">
                  CÔNG THỨC KIẾN TẠO KỶ NGUYÊN SỐ
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 text-xs font-display font-bold">
                  <div className="px-3 py-2 rounded-xl bg-cyan-950/80 border border-cyan-500 text-cyan-300 flex items-center gap-1.5 shadow-sm shadow-cyan-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>ỨNG DỤNG CNTT</span>
                  </div>
                  <span className="text-slate-400 font-black">+</span>
                  <div className="px-3 py-2 rounded-xl bg-sky-950/80 border border-sky-400 text-sky-200 flex items-center gap-1.5 shadow-sm shadow-sky-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                    <span>TRI THỨC SỐ</span>
                  </div>
                  <span className="text-slate-400 font-black">+</span>
                  <div className="px-3 py-2 rounded-xl bg-amber-950/80 border border-amber-400 text-amber-200 flex items-center gap-1.5 shadow-sm shadow-amber-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>CÔNG NGHỆ 4.0</span>
                  </div>
                  <span className="text-cyan-400 font-black">→</span>
                  <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black tracking-wider shadow-lg shadow-cyan-500/40">
                    KỶ NGUYÊN SỐ
                  </div>
                </div>
              </div>

              {/* Motto */}
              <div className="py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-950/40 via-blue-950/60 to-cyan-950/40 border border-cyan-500/20 mb-6 max-w-xl">
                <p className="font-display font-extrabold text-sm md:text-base text-cyan-100 tracking-wide leading-relaxed">
                  &ldquo;{FINAL_MESSAGE.motto}&rdquo;
                </p>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-4">
                {correctCount < 6 && (
                  <button
                    onClick={onOpenReview}
                    className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-display font-bold text-xs uppercase tracking-wider border border-slate-700 transition-colors flex items-center gap-2"
                  >
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <span>XEM LẠI CÂU SAI ({6 - correctCount})</span>
                  </button>
                )}

                <button
                  onClick={onReset}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-cyan-400 to-amber-400 hover:scale-105 active:scale-95 text-slate-950 font-display font-extrabold text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(251,191,36,0.5)] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 stroke-[2.5]" />
                  <span>CHƠI LẠI</span>
                </button>
              </div>
            </>
          )}

          {/* ============================================================== */}
          {/* TIER 2: ĐÚNG 3-4 CÂU */}
          {/* ============================================================== */}
          {isTier2 && (
            <>
              <h1 className="text-3xl md:text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white tracking-wide uppercase leading-tight mb-2">
                KÍCH HOẠT THÀNH CÔNG!
              </h1>

              <p className="text-sm font-sans text-slate-300 max-w-lg mb-6 leading-relaxed">
                Bạn đã hoàn thành nhiệm vụ. Hãy củng cố thêm một số kiến thức để làm chủ Kỷ nguyên 4.0.
              </p>

              {/* Status info */}
              <div className="w-full bg-slate-950/80 border border-slate-800 rounded-2xl p-4 mb-6 text-xs text-slate-300">
                <span className="font-mono-tech text-cyan-300 block mb-1">
                  Đã thu thập 3 mảnh ghép và hoàn thành toàn bộ 3 chặng học tập.
                </span>
                <span className="text-slate-400">
                  Ôn lại {6 - correctCount} câu hỏi chưa đúng để đạt mức Xuất sắc 6/6!
                </span>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={onOpenReview}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-display font-bold text-xs uppercase tracking-wider border border-cyan-500/40 transition-colors flex items-center gap-2 shadow-sm shadow-cyan-950/50"
                >
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <span>XEM LẠI KIẾN THỨC</span>
                </button>

                <button
                  onClick={onReset}
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 active:scale-95 text-slate-950 font-display font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 stroke-[2.5]" />
                  <span>CHƠI LẠI</span>
                </button>
              </div>
            </>
          )}

          {/* ============================================================== */}
          {/* TIER 3: ĐÚNG 0-2 CÂU */}
          {/* ============================================================== */}
          {isTier3 && (
            <>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950 border border-amber-600 text-amber-300 text-xs font-mono-tech uppercase tracking-widest mb-3">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                CẦN CỦNG CỐ KIẾN THỨC
              </div>

              <h1 className="text-2xl md:text-3xl font-display font-black text-amber-300 tracking-wide uppercase leading-tight mb-2">
                CHƯA ĐỦ NĂNG LƯỢNG KÍCH HOẠT!
              </h1>

              <p className="text-sm font-sans text-slate-300 max-w-lg mb-6 leading-relaxed">
                Bạn cần củng cố thêm kiến thức để kích hoạt Kỷ nguyên 4.0.
              </p>

              {/* Status info */}
              <div className="w-full bg-slate-950/80 border border-amber-800/40 rounded-2xl p-4 mb-6 text-xs text-amber-200/80">
                Thành phố đang ở trạng thái chờ. Hãy xem lại các câu trả lời chưa chính xác và thử sức lại nhé!
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={onOpenReview}
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-cyan-400 hover:scale-105 active:scale-95 text-slate-950 font-display font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/30 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                  <span>ÔN LẠI & THỬ LẠI</span>
                </button>

                <button
                  onClick={onReset}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-display font-bold text-xs uppercase tracking-wider border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 stroke-[2]" />
                  <span>CHƠI LẠI</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
