import React, { useState } from 'react';

interface FooterProps {
  variant?: 'full' | 'simple' | 'minimal';
}

export const Footer: React.FC<FooterProps> = ({ variant = 'full' }) => {
  const [modalContent, setModalContent] = useState<string | null>(null);

  if (variant === 'minimal') {
    return null;
  }

  if (variant === 'simple') {
    return (
      <footer className="w-full py-8 text-center px-4">
        <p className="text-[13px] text-zinc-500 font-normal">
          © 2024 Intent-Guard. Mindful browsing for a calmer digital life.
        </p>
      </footer>
    );
  }

  return (
    <>
      <footer className="w-full pt-16 pb-12 mt-auto text-center flex flex-col items-center gap-3.5 border-t border-zinc-900/60">
        <span className="text-[14px] font-medium text-zinc-300 tracking-tight">
          Intent-Guard
        </span>

        <div className="flex items-center gap-6 text-[13px] text-zinc-500">
          <button
            onClick={() => setModalContent('Privacy Policy: Intent-Guard operates locally on your device. Your mindful browsing intentions, guarded site triggers, and session statistics are securely stored on your device only.')}
            className="hover:text-zinc-300 transition-colors"
          >
            Privacy
          </button>
          <button
            onClick={() => setModalContent('Terms of Service: Intent-Guard is designed to introduce mindful friction before entering distracting websites to support your digital well-being.')}
            className="hover:text-zinc-300 transition-colors"
          >
            Terms
          </button>
          <button
            onClick={() => setModalContent('Support: For help with Intent-Guard, reach out to hello@intent-guard.app or configure your site rules in the Settings menu.')}
            className="hover:text-zinc-300 transition-colors"
          >
            Support
          </button>
        </div>

        <p className="text-[12.5px] text-zinc-600 px-6 max-w-sm leading-relaxed">
          © 2024 Intent-Guard. Mindful browsing for a calmer digital life.
        </p>
      </footer>

      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-[#17171a] border border-zinc-800 p-6 rounded-2xl max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-medium text-white mb-2">Intent-Guard Information</h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">{modalContent}</p>
            <button
              onClick={() => setModalContent(null)}
              className="w-full py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-sm font-medium text-zinc-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
