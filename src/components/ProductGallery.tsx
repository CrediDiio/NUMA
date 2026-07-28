import { useState } from "react";
import { Product } from "../types";

type ProductGalleryProps = {
  product: Product;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-card md:aspect-[3/4]">
        <img
          src={product.images[active]}
          alt={`Bolsa ${product.name}, ${product.colorway.name}, ${product.texture.toLowerCase()}`}
          className="h-full w-full object-cover"
        />
        {product.isNew && (
          <span className="absolute left-4 top-4 bg-bone/90 px-2 py-1 font-mono text-[10px] uppercase tracking-label text-clay">
            Nova peça
          </span>
        )}
      </div>

      {/* Miniaturas — só aparecem quando há mais de uma foto cadastrada */}
      {product.images.length > 1 && (
        <div className="mt-3 flex gap-3">
          {product.images.map((img, i) => (
            <button
              key={img}
              onClick={() => setActive(i)}
              aria-label={`Ver foto ${i + 1} de ${product.name}`}
              className={`h-16 w-16 shrink-0 overflow-hidden border transition-colors ${
                active === i ? "border-ink" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
