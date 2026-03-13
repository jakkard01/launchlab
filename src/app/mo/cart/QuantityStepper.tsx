"use client";

type QuantityStepperProps = {
  value: number;
  onChange: (next: number) => void;
  min?: number;
};

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
}: QuantityStepperProps) {
  const handleDecrease = () => {
    const next = value - 1;
    onChange(next < min ? min : next);
  };

  const handleIncrease = () => {
    onChange(value + 1);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleDecrease}
        className="h-11 w-11 rounded-full border border-default bg-surface-3 text-lg font-semibold text-main transition hover:border-[var(--accent)]/35 hover:text-[var(--accent)]"
        aria-label="Disminuir cantidad"
      >
        -
      </button>
      <span className="min-w-[2.5rem] text-center text-sm font-semibold text-main">
        {value}
      </span>
      <button
        type="button"
        onClick={handleIncrease}
        className="h-11 w-11 rounded-full border border-default bg-surface-3 text-lg font-semibold text-main transition hover:border-[var(--accent)]/35 hover:text-[var(--accent)]"
        aria-label="Aumentar cantidad"
      >
        +
      </button>
    </div>
  );
}
