import React, { useState, useEffect, useRef } from 'react';
import { 
  Check, 
  X, 
  Clock, 
  HelpCircle, 
  ArrowRight, 
  Lock, 
  Sparkles,
  ChevronLeft,
  Volume2
} from 'lucide-react';
import { Stage, Question } from '../data/gameData';
import { sounds } from '../utils/sound';

interface QuestionModalProps {
  stage: Stage;
  onClose: () => void;
  onCompleteStage: (stageId: number) => void;
  onAnswerQuestion: (questionId: number, selected: 'A' | 'B' | 'C' | 'D' | null, isCorrect: boolean) => void;
}

export const QuestionModal: React.FC<QuestionModalProps> = ({
  stage,
  onClose,
  onCompleteStage,
  onAnswerQuestion,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isTimeOut, setIsTimeOut] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentQuestion: Question = stage.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === stage.questions.length - 1;

  // Sound upon stage modal opening: whoosh
  useEffect(() => {
    sounds.whoosh();
  }, [stage.id]);

  // Timer logic for 20 seconds
  useEffect(() => {
    if (isLocked || isRevealed) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    setTimeLeft(20);
    setIsTimeOut(false);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsLocked(true);
          setIsTimeOut(true);
          sounds.incorrect();
          return 0;
        }

        // Clock ticking sound
        if (prev <= 6) {
          sounds.urgentTick();
        } else {
          sounds.tick();
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentQuestionIndex, isLocked, isRevealed]);

  // Handle option selection by student
  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (isLocked || isRevealed) return;
    setSelectedOption(key);
    setIsLocked(true);
    if (timerRef.current) clearInterval(timerRef.current);
    sounds.tick();
  };

  // Handle reveal answer button by teacher
  const handleReveal = () => {
    if (isRevealed) return;
    if (!isLocked && !isTimeOut) {
      setIsLocked(true);
    }
    setIsRevealed(true);

    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    if (isCorrect) {
      sounds.correct();
    } else {
      sounds.incorrect();
    }

    // Report answer: increments completedQuestions and conditionally correctAnswers
    onAnswerQuestion(currentQuestion.id, selectedOption, isCorrect);
  };

  // Handle proceed to next question or complete stage
  const handleNext = () => {
    if (!isLastQuestion) {
      sounds.whoosh();
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsLocked(false);
      setIsRevealed(false);
      setTimeLeft(20);
      setIsTimeOut(false);
    } else {
      // Completed both questions of this stage!
      onCompleteStage(stage.id);
    }
  };

  // Keyboard accessibility for classroom clickers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isRevealed) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
          handleNext();
        }
        return;
      }

      if (!isLocked && !isRevealed) {
        if (e.key === 'a' || e.key === 'A' || e.key === '1') handleSelectOption('A');
        if (e.key === 'b' || e.key === 'B' || e.key === '2') handleSelectOption('B');
        if (e.key === 'c' || e.key === 'C' || e.key === '3') handleSelectOption('C');
        if (e.key === 'd' || e.key === 'D' || e.key === '4') handleSelectOption('D');
      } else if (isLocked && !isRevealed) {
        if (e.key === 'Enter' || e.key === ' ') {
          handleReveal();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md select-none animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-cyan-500/40 rounded-2xl shadow-2xl shadow-cyan-950/60 overflow-hidden flex flex-col">
        {/* Top Header of the Stage */}
        <div className="px-6 py-3.5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              title="Quay lại bản đồ"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="text-[11px] font-mono-tech tracking-wider text-cyan-400 uppercase">
                {stage.title}
              </span>
              <h2 className="text-base font-display font-bold text-white tracking-wide">
                MẢNH GHÉP: {stage.shardName}
              </h2>
            </div>
          </div>

          {/* Question Index & Timer */}
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs font-display font-semibold text-slate-200">
              CÂU {currentQuestionIndex + 1} / {stage.questions.length}
            </div>

            {/* Timer Badge */}
            <div 
              className={`flex items-center gap-2 px-3 py-1 rounded-md border font-mono-tech font-bold text-sm transition-all ${
                timeLeft <= 5 && !isRevealed && !isLocked
                  ? 'bg-rose-950/80 text-rose-300 border-rose-600 animate-pulse scale-105'
                  : 'bg-slate-950 text-cyan-300 border-cyan-500/40'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{String(timeLeft).padStart(2, '0')}s</span>
            </div>
          </div>
        </div>

        {/* Question Body */}
        <div className="p-6 md:p-8 flex-1 flex flex-col justify-between overflow-y-auto">
          {/* Question Level Badge & Text */}
          <div className="mb-6">
            <div className="inline-block px-2.5 py-0.5 rounded text-xs font-mono-tech font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-700/60 mb-2.5 uppercase tracking-wide">
              {currentQuestion.level}
            </div>
            <p className="text-xl md:text-2xl font-sans font-bold text-white leading-relaxed tracking-tight">
              {currentQuestion.question}
            </p>
          </div>

          {/* Options Grid (A, B, C, D) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-6">
            {currentQuestion.options.map((opt) => {
              const isSelected = selectedOption === opt.key;
              const isCorrect = currentQuestion.correctAnswer === opt.key;

              let btnStyle = 'bg-slate-800/80 border-slate-700 text-slate-100 hover:border-cyan-400 hover:bg-slate-800';
              let badgeStyle = 'bg-slate-700 text-slate-200 border-slate-600';

              if (isRevealed) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/90 border-emerald-400 text-emerald-100 shadow-lg shadow-emerald-950/60 ring-2 ring-emerald-500';
                  badgeStyle = 'bg-emerald-500 text-slate-950 font-black border-emerald-300';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-950/90 border-rose-500 text-rose-100 ring-2 ring-rose-500';
                  badgeStyle = 'bg-rose-500 text-white font-black border-rose-400';
                } else {
                  btnStyle = 'bg-slate-900/40 border-slate-800/60 text-slate-500 opacity-60';
                  badgeStyle = 'bg-slate-900 text-slate-600 border-slate-800';
                }
              } else if (isLocked) {
                if (isSelected) {
                  btnStyle = 'bg-cyan-950/90 border-cyan-400 text-cyan-100 shadow-md shadow-cyan-950/40 ring-1 ring-cyan-400';
                  badgeStyle = 'bg-cyan-500 text-slate-950 font-bold border-cyan-300';
                } else {
                  btnStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-70';
                  badgeStyle = 'bg-slate-800 text-slate-600 border-slate-700';
                }
              }

              return (
                <button
                  key={opt.key}
                  disabled={isLocked || isRevealed}
                  onClick={() => handleSelectOption(opt.key)}
                  className={`flex items-start gap-3.5 p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer ${btnStyle}`}
                >
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-sm shrink-0 border transition-all ${badgeStyle}`}>
                    {opt.key}
                  </span>
                  <div className="flex-1 pt-0.5">
                    <span className="text-base font-sans font-medium leading-snug">
                      {opt.text}
                    </span>
                  </div>
                  {isRevealed && isCorrect && (
                    <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </span>
                  )}
                  {isRevealed && isSelected && !isCorrect && (
                    <span className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0">
                      <X className="w-4 h-4 stroke-[3]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Pedagogical Explanation Box (Revealed after teacher clicks) */}
          {isRevealed && (
            <div className="p-4 rounded-xl bg-slate-950/90 border border-cyan-500/30 mb-4 animate-slideDown">
              <div className="flex items-center gap-2 mb-1.5">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span className="font-display font-bold text-xs uppercase tracking-wider text-cyan-300">
                  GIẢI THÍCH SƯ PHẠM (BÀI 4 - TIN HỌC 10 CÁNH DIỀU)
                </span>
              </div>
              <p className="text-sm font-sans text-slate-200 leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Control Bar: Lock Status & Teacher Action */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            {/* Status indicator */}
            <div className="flex items-center gap-2">
              {isRevealed ? (
                <span className="flex items-center gap-1.5 text-xs font-mono-tech text-emerald-400 bg-emerald-950/60 border border-emerald-700/50 px-3 py-1 rounded-md">
                  <Check className="w-4 h-4" /> ĐÃ CÔNG BỐ ĐÁP ÁN
                </span>
              ) : isLocked ? (
                <span className="flex items-center gap-1.5 text-xs font-mono-tech text-amber-300 bg-amber-950/60 border border-amber-600/50 px-3 py-1 rounded-md animate-pulse">
                  <Lock className="w-4 h-4" />
                  {isTimeOut ? 'HẾT GIỜ! ĐÃ KHÓA LỰA CHỌN' : 'ĐÃ KHÓA ĐÁP ÁN'}
                </span>
              ) : (
                <span className="text-xs font-sans text-slate-400">
                  Học sinh chọn 1 trong 4 phương án A, B, C, D (20 giây)
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Teacher Button: Reveal Answer */}
              {!isRevealed && isLocked && (
                <button
                  onClick={handleReveal}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-display font-bold text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2 active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  CÔNG BỐ ĐÁP ÁN
                </button>
              )}

              {/* Continue Button after reveal */}
              {isRevealed && (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-display font-bold text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2 active:scale-95 animate-pulse"
                >
                  <span>{isLastQuestion ? 'HOÀN THÀNH CHẶNG' : 'TIẾP TỤC'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
