import { Link } from "react-router-dom";
import { Product } from "../types";

type ProductCardProps = {
  product: Product;
};

const formatBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/produto/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-card">
        {/* Foto real do produto — leve zoom no hover para dar vida ao grid */}
        <img
          src={product.images[0]}
          alt={`Bolsa ${product.name}, ${product.colorway.name}, ${product.texture.toLowerCase()}`}
          className="h-full w-full object-cover transition-transform duration-700 ease-knot group-hover:scale-[1.04]"
        />

        {product.isNew && (
          <span className="absolute left-3 top-3 bg-bone/90 px-2 py-1 font-mono text-[10px] uppercase tracking-label text-clay">
            Nova peça
          </span>
        )}

        {/* Chip de cor real da bolsa */}
        <span
          className="absolute bottom-3 right-3 h-4 w-4 rounded-full border border-bone/80 shadow-sm"
          style={{ backgroundColor: product.colorway.hex }}
          title={product.colorway.name}
        />
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-lg text-ink">{product.name}</h3>
          <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wideish text-ink-soft">
            {product.texture}
          </p>
        </div>
        <p className="whitespace-nowrap font-body text-sm text-ink">
          {formatBRL(product.price)}
        </p>
      </div>
    </Link>
  );
}
