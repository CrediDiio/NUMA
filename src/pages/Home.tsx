import { Hero } from "../components/Hero";
import { ProductGrid } from "../components/ProductGrid";
import { About } from "../components/About";
import { PatternBand } from "../components/PatternBand";
import { products, featuredSlugs } from "../data/products";

export function Home() {
  const featured = products.filter((p) => featuredSlugs.includes(p.slug));

  return (
    <>
      <Hero />
      <PatternBand />
      <ProductGrid
        products={featured}
        title="Coleção Amuletos"
        description="Correntes de metal, estrelas, luas e cruzes entrelaçadas à mão sobre o fio de malha trançado."
      />
      <About />
      <ProductGrid
        products={products}
        title="Todas as peças"
        description="Cada bolsa é única. Ao esgotar, não é reposta na mesma trama."
      />
    </>
  );
}