import { Product } from "../types";
import { ProductCard } from "./ProductCard";
import { KnotDivider } from "./KnotDivider";

type ProductGridProps = {
  products: Product[];
  title?: string;
  description?: string;
};

export function ProductGrid({ products, title, description }: ProductGridProps) {
  return (
    <section id="catalogo" className="mx-auto max-w-page px-6 py-16 md:px-10 md:py-24">
      {title && (
        <div className="mb-10 max-w-lg">
          <KnotDivider label={`${products.length} peças`} className="mb-5" />
          <h2 className="font-display text-3xl font-light text-ink md:text-4xl">{title}</h2>
          {description && (
            <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
