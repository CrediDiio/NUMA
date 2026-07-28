type KnotDividerProps = {
  className?: string;
  label?: string;
};

/**
 * Elemento-assinatura da marca: um glifo desenhado à mão que lembra
 * o entrelaçamento de um ponto de crochê. Substitui marcadores
 * numéricos genéricos (01/02/03) por algo que remete ao ofício.
 */
export function KnotDivider({ className = "", label }: KnotDividerProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <svg
        width="28"
        height="16"
        viewBox="0 0 28 16"
        fill="none"
        className="shrink-0 text-clay"
        aria-hidden="true"
      >
        <path
          d="M2 8C2 4 6 2 8 5C10 8 6 12 8 8C10 4 14 2 14 8C14 14 18 12 18 8C18 4 22 2 24 5C25.5 7 25.5 9 24 11"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      {label && <span className="label">{label}</span>}
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
