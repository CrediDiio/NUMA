import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const NAV_LINKS = [
  { label: "Todas as bolsas", href: "/#catalogo" },
  { label: "Sobre o ateliê", href: "/#sobre" },
];

export const Header = ({ onOpenCart }: any) => {
  const [scrolled, setScrolled] = useState(false);
  const { items, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ease-knot ${
        scrolled ? "bg-bone/90 backdrop-blur-sm border-b border-line" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-page items-center justify-between px-6 py-5 md:px-10">
        {/* Nav esquerda (desktop) */}
        <nav className="hidden flex-1 items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="label text-ink transition-colors hover:text-clay"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Logo central — arte de marca fornecida pelo cliente */}
        <Link to="/" className="flex flex-1 items-center justify-center">
          <img
            src="/brand/numa-logo.jpg"
            alt="NUMA Crochê"
            className="h-11 w-auto object-contain mix-blend-multiply md:h-14"
          />
        </Link>

        {/* Nav direita (desktop) + ícones */}
        <div className="flex flex-1 items-center justify-end gap-8">
          <Link
            to="/#sobre"
            className="label hidden text-ink transition-colors hover:text-clay md:block"
          >
            Sobre o ateliê
          </Link>
          <button
            aria-label="Buscar"
            className="text-ink transition-colors hover:text-clay"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
              <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
          <button
            onClick={openCart}
            aria-label={`Abrir sacola${items.length > 0 ? `, ${items.length} peças` : ""}`}
            className="relative text-ink transition-colors hover:text-clay"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M4 6h10l-.7 8.2a1 1 0 01-1 .8H5.7a1 1 0 01-1-.8L4 6z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <path d="M6.5 6V4.5a2.5 2.5 0 015 0V6" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-clay font-mono text-[9px] text-bone">
              {items.length}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
