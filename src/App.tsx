import React, { useState, useEffect, useRef } from 'react';
import { Download, Play } from 'lucide-react';
import { TopNav } from './components/TopNav';
import { CityMap } from './components/CityMap';
import { QuestionModal } from './components/QuestionModal';
import { ShardCollectCelebration } from './components/ShardCollectCelebration';
import { GrandFinaleModal } from './components/GrandFinaleModal';
import { ReviewModal } from './components/ReviewModal';
import { GuideModal } from './components/GuideModal';
import { Stage, GAME_STAGES } from './data/gameData';
import { sounds } from './utils/sound';

interface UserAnswerRecord {
  selected: 'A' | 'B' | 'C' | 'D' | null;
  isCorrect: boolean;
}

export default function App() {
  const [completedStages, setCompletedStages] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('kich_hoat_ky_nguyen_stages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [completedQuestions, setCompletedQuestions] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('kich_hoat_ky_nguyen_completed_q');
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });

  const [correctAnswers, setCorrectAnswers] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('kich_hoat_ky_nguyen_correct_q');
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });

  const [userAnswers, setUserAnswers] = useState<Record<number, UserAnswerRecord>>(() => {
    try {
      const saved = localStorage.getItem('kich_hoat_ky_nguyen_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [activeStage, setActiveStage] = useState<Stage | null>(null);
  const [celebrationStage, setCelebrationStage] = useState<Stage | null>(null);
  const [showFinale, setShowFinale] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem('kich_hoat_ky_nguyen_stages', JSON.stringify(completedStages));
      localStorage.setItem('kich_hoat_ky_nguyen_completed_q', completedQuestions.toString());
      localStorage.setItem('kich_hoat_ky_nguyen_correct_q', correctAnswers.toString());
      localStorage.setItem('kich_hoat_ky_nguyen_answers', JSON.stringify(userAnswers));
    } catch {
      // Ignore
    }
  }, [completedStages, completedQuestions, correctAnswers, userAnswers]);

  // Handle Fullscreen change listener
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // System Boot Sound on first user interaction
  const handleStartBoot = () => {
    setHasStarted(true);
    sounds.systemBoot();
  };

  const handleToggleMute = () => {
    const newMuted = sounds.toggleMute();
    setIsMuted(newMuted);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Complete reset logic
  const handleResetGameDirect = () => {
    setCompletedStages([]);
    setCompletedQuestions(0);
    setCorrectAnswers(0);
    setUserAnswers({});
    setActiveStage(null);
    setCelebrationStage(null);
    setShowFinale(false);
    setShowReview(false);

    try {
      localStorage.removeItem('kich_hoat_ky_nguyen_stages');
      localStorage.removeItem('kich_hoat_ky_nguyen_completed_q');
      localStorage.removeItem('kich_hoat_ky_nguyen_correct_q');
      localStorage.removeItem('kich_hoat_ky_nguyen_answers');
    } catch {
      // Ignore
    }

    sounds.systemBoot();
  };

  const handleResetGamePrompt = () => {
    if (window.confirm('Thầy/Cô và các em có chắc chắn muốn chơi lại từ đầu không?')) {
      handleResetGameDirect();
    }
  };

  const handleSelectStage = (stage: Stage) => {
    setActiveStage(stage);
  };

  // Handle answering an individual question
  const handleAnswerQuestion = (questionId: number, selected: 'A' | 'B' | 'C' | 'D' | null, isCorrect: boolean) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: { selected, isCorrect }
    }));

    // CRITICAL: completedQuestions increments in ALL cases (right or wrong)
    setCompletedQuestions((prev) => prev + 1);

    // correctAnswers only increments if answer is correct
    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  // Stage completion (when all 2 questions of a stage are answered, right or wrong)
  const handleCompleteStage = (stageId: number) => {
    setActiveStage(null);
    const targetStage = GAME_STAGES.find((s) => s.id === stageId);
    
    // Add to completed if not already present
    if (!completedStages.includes(stageId)) {
      setCompletedStages((prev) => [...prev, stageId]);
    }

    if (targetStage) {
      setCelebrationStage(targetStage);
    }
  };

  const handleCelebrationContinue = () => {
    setCelebrationStage(null);

    // CRITICAL REQUIREMENT:
    // "Điều kiện kết thúc game phải là: completedQuestions === 6 (hoặc completedStages.length === 3).
    // KHÔNG sử dụng điều kiện: correctAnswers === 6."
    // Player answering incorrectly still transitions to summary screen!
    if (completedQuestions >= 6 || completedStages.length >= 3) {
      setShowFinale(true);
    }
  };

  // Calculate percentage for Central Core (0%, 33%, 66%, 100%)
  const corePercentage = Math.min(
    100,
    Math.round((completedStages.length / 3) * 100)
  );

  return (
    <div 
      ref={containerRef} 
      className="w-screen h-screen bg-slate-950 flex items-center justify-center overflow-hidden font-sans select-none"
    >
      {/* 16:9 Aspect Ratio Classroom Projector Container */}
      <div className="relative w-full max-w-[177.78vh] h-full max-h-[56.25vw] aspect-video bg-slate-950 border border-slate-800 shadow-2xl flex flex-col overflow-hidden">
        {/* Top Bar Navigation Contract */}
        <TopNav
          completedStages={completedStages}
          completedQuestions={completedQuestions}
          correctAnswers={correctAnswers}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
          onReset={handleResetGamePrompt}
          onOpenGuide={() => setShowGuide(true)}
        />

        {/* Central Stage / Smart City Map */}
        <main className="flex-1 relative w-full h-[calc(100%-4rem)] overflow-hidden">
          <CityMap
            completedStages={completedStages}
            onSelectStage={handleSelectStage}
            onTriggerFinale={() => setShowFinale(true)}
            corePercentage={corePercentage}
          />
        </main>

        {/* First Turn Welcoming Banner Overlay (if teacher hasn't clicked yet) */}
        {!hasStarted && (
          <div className="absolute inset-0 z-40 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.6)] border border-cyan-300 mb-4 animate-bounce">
              <span className="font-display font-black text-2xl text-slate-950">4.0</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/60 text-xs font-mono-tech text-cyan-300 mb-3 uppercase tracking-wider">
              TIN HỌC 10 · CÁNH DIỀU · HOẠT ĐỘNG LUYỆN TẬP
            </div>

            <h1 className="text-3xl md:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-amber-300 tracking-wide uppercase mb-2">
              KÍCH HOẠT KỶ NGUYÊN 4.0
            </h1>

            <p className="text-sm md:text-base font-sans text-slate-300 max-w-xl mb-8 leading-relaxed">
              Thành phố 4.0 đang ở trạng thái <strong className="text-rose-400 font-mono-tech">OFFLINE</strong>. Hãy đồng hành cùng các bạn học sinh vượt qua 3 chặng kiến thức để thu thập đủ 3 mảnh ghép công nghệ và kích hoạt <strong className="text-cyan-300">LÕI 4.0</strong>!
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5">
              <button
                onClick={handleStartBoot}
                className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 text-slate-950 font-display font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>BẮT ĐẦU TRÒ CHƠI</span>
              </button>

              <a
                href="/KICH_HOAT_KY_NGUYEN_4.0.html"
                download="KICH_HOAT_KY_NGUYEN_4.0.html"
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-cyan-950 text-cyan-300 hover:text-white font-display font-semibold text-sm border border-cyan-500/50 transition-all flex items-center gap-2 shadow-sm shadow-cyan-950/60 cursor-pointer"
                title="Tải game về máy tính để mở offline bất cứ lúc nào mà không cần mạng Internet"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>TẢI BẢN OFFLINE (.HTML)</span>
              </a>

              <button
                onClick={() => {
                  handleStartBoot();
                  setShowGuide(true);
                }}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-display font-semibold text-sm border border-slate-700 transition-colors cursor-pointer"
              >
                HƯỚNG DẪN
              </button>
            </div>
          </div>
        )}

        {/* Modal: Interactive Question Screen */}
        {activeStage && (
          <QuestionModal
            stage={activeStage}
            onClose={() => setActiveStage(null)}
            onCompleteStage={handleCompleteStage}
            onAnswerQuestion={handleAnswerQuestion}
          />
        )}

        {/* Modal: Stage Completion / Shard Celebration */}
        {celebrationStage && (
          <ShardCollectCelebration
            stage={celebrationStage}
            onContinue={handleCelebrationContinue}
          />
        )}

        {/* Modal: Climax / Grand Finale (3 Tiers Summary) */}
        {showFinale && (
          <GrandFinaleModal
            correctCount={correctAnswers}
            completedCount={completedQuestions}
            onReset={handleResetGameDirect}
            onOpenReview={() => setShowReview(true)}
          />
        )}

        {/* Modal: Review Mistakes (Xem lại kiến thức) */}
        {showReview && (
          <ReviewModal
            userAnswers={userAnswers}
            onClose={() => setShowReview(false)}
            onRetry={handleResetGameDirect}
          />
        )}

        {/* Modal: Rules & Guide */}
        {showGuide && (
          <GuideModal
            onClose={() => setShowGuide(false)}
            onStart={() => setShowGuide(false)}
          />
        )}
      </div>
    </div>
  );
}
