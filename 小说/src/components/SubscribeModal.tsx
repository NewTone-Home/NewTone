import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2 } from 'lucide-react';
import { createPortal } from 'react-dom';

import { useLang } from '../contexts/ThemeContext';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const modalI18n = {
  title: {
    zh: '订阅初墨卷更新',
    en: 'Subscribe to The First Ink',
    ja: '初墨の巻の更新を受け取る',
  },
  subtitle: {
    zh: '第三章 & 后续章节发布时，最先收到通知。',
    en: 'Be the first to know when Chapter III and beyond arrive.',
    ja: '第三章以降の公開時、真っ先にお知らせします。',
  },
  emailPlaceholder: {
    zh: 'your@email.com',
    en: 'your@email.com',
    ja: 'your@email.com',
  },
  submit: {
    zh: '订阅',
    en: 'SUBSCRIBE',
    ja: '登録',
  },
  success: {
    zh: '已记录，感谢。',
    en: 'Thank you.',
    ja: '登録しました。',
  },
  footer: {
    zh: 'Powered by ConvertKit · 即将接入',
    en: 'Powered by ConvertKit · Coming soon',
    ja: 'Powered by ConvertKit · 連携予定',
  },
  close: {
    zh: '关闭',
    en: 'Close',
    ja: '閉じる',
  },
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { lang } = useLang();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    console.log({ email, timestamp: Date.now() });
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-[440px] bg-[var(--bg)] border border-[var(--brass)] p-10 md:p-12 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative Texture */}
          <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]" />

          {!isSubmitted ? (
            <>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-[var(--ink)]/40 hover:text-[var(--ink)] transition-colors p-2"
                aria-label={modalI18n.close[lang]}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10">
                <h2 className="text-2xl font-display tracking-widest text-[var(--ink)] mb-4">
                  {modalI18n.title[lang]}
                </h2>
                <p className="text-base font-body text-[var(--ink)] opacity-75 mb-8 leading-relaxed">
                  {modalI18n.subtitle[lang]}
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={modalI18n.emailPlaceholder[lang]}
                      required
                      className="w-full bg-transparent border border-[var(--brass)]/30 p-4 font-body text-[var(--ink)] placeholder:text-[var(--ink)]/30 focus:outline-none focus:border-[var(--brass)] transition-colors bg-[var(--ink)]/5"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 border border-[var(--brass)] bg-transparent text-[var(--ink)] font-display text-sm tracking-[0.2em] uppercase hover:bg-[var(--brass)] hover:text-[var(--bg)] transition-all duration-300"
                  >
                    {modalI18n.submit[lang]}
                  </button>
                </form>

                <div className="mt-8 pt-8 border-t border-[var(--brass)]/10 text-center">
                  <p className="text-[10px] font-body tracking-widest text-[var(--ink)] opacity-50 uppercase">
                    {modalI18n.footer[lang]}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="relative z-10 py-12 flex flex-col items-center text-center">
              <CheckCircle2 className="w-16 h-16 text-[var(--brass)] mb-6 animate-in zoom-in duration-300" />
              <h3 className="text-2xl font-body tracking-[0.2em] text-[var(--ink)] uppercase">
                {modalI18n.success[lang]}
              </h3>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};
