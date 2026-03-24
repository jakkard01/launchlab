"use client";

type QuantityStepperProps = {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  compact?: boolean;
};

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  compact = false,
}: QuantityStepperProps) {
  const handleDecrease = () => {
    const next = value - 1;
    onChange(next < min ? min : next);
  };

  const handleIncrease = () => {
    onChange(value + 1);
  };

  return (
    <div className={`flex items-center ${compact ? "gap-1.5" : "gap-2"}`}>
      <button
        type="button"
        onClick={handleDecrease}
        className={`${compact ? "h-9 w-9 text-base" : "h-11 w-11 text-lg"} rounded-full border border-default bg-surface-3 font-semibold text-main transition hover:border-[var(--accent)]/35 hover:text-[var(--accent)]`}
        aria-label="Disminuir cantidad"
      >
        -
      </button>
      <span className={`${compact ? "min-w-[1.8rem] text-xs" : "min-w-[2.5rem] text-sm"} text-center font-semibold text-main`}>
        {value}
      </span>
      <button
        type="button"
        onClick={handleIncrease}
        className={`${compact ? "h-9 w-9 text-base" : "h-11 w-11 text-lg"} rounded-full border border-default bg-surface-3 font-semibold text-main transition hover:border-[var(--accent)]/35 hover:text-[var(--accent)]`}
        aria-label="Aumentar cantidad"
      >
        +
      </button>
    </div>
  );
}
