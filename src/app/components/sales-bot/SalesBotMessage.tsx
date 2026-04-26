"use client";

export type SalesBotMessageProps = {
  role: 'user' | 'bot';
  children: React.ReactNode;
};

export default function SalesBotMessage({ role, children }: SalesBotMessageProps) {
  const isUser = role === 'user';

  return (
    <div
      className={`max-w-[92%] rounded-2xl px-3 py-2.5 text-sm leading-6 sm:px-4 sm:py-3 ${
        isUser
          ? 'ml-auto rounded-tr-sm bg-cyan-300 text-[#041018]'
          : 'rounded-tl-sm bg-white/[0.07] text-white/84'
      }`}
    >
      {children}
    </div>
  );
}
