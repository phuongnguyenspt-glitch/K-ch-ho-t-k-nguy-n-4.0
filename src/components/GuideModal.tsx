import React from 'react';
import { X, Play, Shield, Award, Clock, HelpCircle, Sparkles } from 'lucide-react';

interface GuideModalProps {
  onClose: () => void;
  onStart: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ onClose, onStart }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md select-none">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-cyan-500/40 rounded-2xl p-6 md:p-8 shadow-2xl shadow-cyan-950/80 flex flex-col text-left">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono-tech uppercase tracking-wider mb-3 w-fit">
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          HƯỚNG DẪN HOẠT ĐỘNG LUYỆN TẬP
        </div>

        <h2 className="text-2xl font-display font-black text-white tracking-wide uppercase mb-2">
          KÍCH HOẠT KỶ NGUYÊN 4.0
        </h2>
        <p className="text-xs font-sans text-slate-400 mb-6">
          Môn Tin học 10 · Cánh Diều · Bài 4: Tin học trong phát triển kinh tế – xã hội
        </p>

        <div className="space-y-4 text-sm font-sans text-slate-200 mb-8">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <Shield className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white font-display block mb-0.5">Bối cảnh nhiệm vụ</strong>
              Thành phố 4.0 đang ở trạng thái OFFLINE với "LÕI 4.0" ở trung tâm chưa kích hoạt. Học sinh cần vượt qua 3 chặng để thu thập 3 mảnh ghép công nghệ nhằm kích hoạt thành phố.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <Award className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white font-display block mb-0.5">3 Chặng kiến thức</strong>
              <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 mt-1 font-mono-tech">
                <li><span className="text-cyan-300 font-bold">Chặng 1:</span> SỐ HÓA CUỘC SỐNG → Thu thập mảnh ghép ỨNG DỤNG CNTT (33%)</li>
                <li><span className="text-sky-300 font-bold">Chặng 2:</span> KHAI MỞ TRI THỨC → Thu thập mảnh ghép TRI THỨC SỐ (66%)</li>
                <li><span className="text-amber-300 font-bold">Chặng 3:</span> KÍCH HOẠT CÔNG NGHIỆP 4.0 → Thu thập mảnh ghép CÔNG NGHỆ 4.0 (100%)</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white font-display block mb-0.5">Quy trình trả lời sư phạm</strong>
              Mỗi câu hỏi có 20 giây suy nghĩ. Khi chọn đáp án, hệ thống sẽ KHÓA lựa chọn. Giáo viên bấm "CÔNG BỐ ĐÁP ÁN" để hiển thị kết quả và giải thích chi tiết trước khi tiếp tục.
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={onStart}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-display font-bold text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            BẮT ĐẦU NGAY
          </button>
        </div>
      </div>
    </div>
  );
};
