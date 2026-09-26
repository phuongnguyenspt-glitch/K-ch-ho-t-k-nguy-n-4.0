import React from 'react';
import { X, RotateCcw, AlertCircle, CheckCircle2, XCircle, ArrowLeft, BookOpen } from 'lucide-react';
import { GAME_STAGES, Question, Stage } from '../data/gameData';

interface UserAnswerRecord {
  selected: 'A' | 'B' | 'C' | 'D' | null;
  isCorrect: boolean;
}

interface ReviewModalProps {
  userAnswers: Record<number, UserAnswerRecord>;
  onClose: () => void;
  onRetry: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  userAnswers,
  onClose,
  onRetry,
}) => {
  // Collect all questions that were answered incorrectly
  const wrongQuestions: { stage: Stage; question: Question; userAnswer: UserAnswerRecord }[] = [];

  GAME_STAGES.forEach((stage) => {
    stage.questions.forEach((q) => {
      const record = userAnswers[q.id];
      if (record && !record.isCorrect) {
        wrongQuestions.push({ stage, question: q, userAnswer: record });
      }
    });
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md select-none animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-cyan-500/40 rounded-2xl p-6 md:p-8 shadow-2xl shadow-cyan-950/80 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-950 border border-cyan-700/60 flex items-center justify-center text-cyan-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-display font-black text-white tracking-wide uppercase">
                ÔN LẠI KIẾN THỨC CẦN CỦNG CỐ
              </h2>
              <p className="text-xs font-sans text-slate-400">
                Các câu hỏi chưa trả lời đúng trong hoạt động Luyện tập Tin học 10
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {wrongQuestions.length === 0 ? (
            <div className="p-8 text-center text-slate-300">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h3 className="font-display font-bold text-lg text-white mb-1">
                Không có câu trả lời sai!
              </h3>
              <p className="text-xs text-slate-400">
                Bạn đã nắm vững toàn bộ kiến thức của Bài 4: Tin học trong phát triển kinh tế – xã hội.
              </p>
            </div>
          ) : (
            wrongQuestions.map(({ stage, question, userAnswer }) => {
              const correctOpt = question.options.find((o) => o.key === question.correctAnswer);
              const studentOpt = question.options.find((o) => o.key === userAnswer.selected);

              return (
                <div
                  key={question.id}
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/30 transition-all text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono-tech text-cyan-400 font-bold uppercase">
                      {stage.title} · {question.level}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-mono-tech text-rose-400 bg-rose-950/60 border border-rose-800/60 px-2 py-0.5 rounded">
                      <XCircle className="w-3.5 h-3.5" /> Chưa chính xác
                    </span>
                  </div>

                  <p className="text-sm font-sans font-bold text-white mb-3">
                    {question.question}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs mb-3">
                    {/* What student chose */}
                    <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-800/40 text-rose-200">
                      <span className="font-mono-tech font-bold text-rose-400 block mb-0.5">
                        Lựa chọn của bạn: {userAnswer.selected ? `[${userAnswer.selected}]` : '(Hết giờ)'}
                      </span>
                      <span>{studentOpt ? studentOpt.text : 'Chưa kịp chọn phương án'}</span>
                    </div>

                    {/* What correct answer is */}
                    <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-700/50 text-emerald-200">
                      <span className="font-mono-tech font-bold text-emerald-400 block mb-0.5">
                        Đáp án đúng: [{question.correctAnswer}]
                      </span>
                      <span>{correctOpt?.text}</span>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                    <strong className="text-cyan-300 font-mono-tech block mb-0.5">Giải thích:</strong>
                    {question.explanation}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>QUAY LẠI TỔNG KẾT</span>
          </button>

          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-cyan-400 hover:scale-105 active:scale-95 text-slate-950 text-xs font-display font-extrabold uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all"
          >
            <RotateCcw className="w-4 h-4 stroke-[2.5]" />
            <span>THỬ LẠI</span>
          </button>
        </div>
      </div>
    </div>
  );
};
