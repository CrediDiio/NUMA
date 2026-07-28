export function PatternBand() {
  return (
    <div
      aria-hidden="true"
      className="relative h-16 w-full overflow-hidden border-y border-line md:h-20"
    >
      <img
        src="/brand/numa-pattern.jpg"
        alt=""
        className="h-full w-full object-cover opacity-[0.14] grayscale sepia"
        style={{ filter: "grayscale(1) sepia(0.4) contrast(1.1)" }}
      />
    </div>
  );
}
