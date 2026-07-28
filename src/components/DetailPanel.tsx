import { useState, ReactNode } from "react";

type DetailPanelProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export function DetailPanel({ title, children, defaultOpen = false }: DetailPanelProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-line">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-body text-sm text-ink">{title}</span>
        <span
          className={`font-mono text-base text-ink-soft transition-transform duration-300 ease-knot ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      {open && (
        <div className="pb-4 font-body text-sm leading-relaxed text-ink-soft">{children}</div>
      )}
    </div>
  );
}
