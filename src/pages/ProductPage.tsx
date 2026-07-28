import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { ProductGallery } from "../components/ProductGallery";
import { DetailPanel } from "../components/DetailPanel";
import { KnotDivider } from "../components/KnotDivider";
import { ProductGrid } from "../components/ProductGrid";

const formatBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);
  const { addItem, isInCart } = useCart();

  if (!product) {
    return (
      <div className="mx-auto max-w-page px-6 py-24 text-center md:px-10">
        <p className="font-display text-2xl text-ink">Essa peça não foi encontrada.</p>
        <Link to="/" className="label mt-4 inline-block text-clay">
          Voltar para a loja
        </Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.collection === product.collection && p.slug !== product.slug)
    .slice(0, 3);

  return (
    <div>
      {/* Trilha de volta */}
      <div className="mx-auto max-w-page px-6 pt-6 md:px-10">
        <Link
          to="/"
          className="label inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-clay"
        >
          <span aria-hidden="true">←</span> Todas as bolsas
        </Link>
      </div>

      <div className="mx-auto grid max-w-page grid-cols-1 gap-10 px-6 py-8 md:grid-cols-12 md:gap-14 md:px-10 md:py-12">
        {/* Galeria */}
        <div className="md:col-span-7">
          <ProductGallery product={product} />
        </div>

        {/* Informações do produto */}
        <div className="md:col-span-5">
          <p className="label mb-3">{product.collection}</p>
          <h1 className="font-display text-4xl font-light text-ink">{product.name}</h1>
          <p className="mt-3 font-body text-xl text-ink">{formatBRL(product.price)}</p>

          {/* Cor e textura */}
          <div className="mt-6 flex items-center gap-3">
            <span
              className="h-5 w-5 shrink-0 rounded-full border border-line"
              style={{ backgroundColor: product.colorway.hex }}
              aria-hidden="true"
            />
            <span className="font-body text-sm text-ink">{product.colorway.name}</span>
            <span className="text-ink-soft">·</span>
            <span className="font-mono text-xs uppercase tracking-wideish text-ink-soft">
              {product.texture}
            </span>
          </div>

          <p className="mt-6 font-body text-[15px] leading-relaxed text-ink-soft">
            {product.shortDescription}
          </p>

          <button
            onClick={() => addItem(product)}
            disabled={isInCart(product.slug)}
            className="mt-8 w-full bg-ink py-4 font-mono text-xs uppercase tracking-label text-bone transition-colors duration-300 ease-knot hover:bg-clay disabled:cursor-not-allowed disabled:bg-graphite"
          >
            {isInCart(product.slug) ? "Já está na sua sacola" : "Adicionar à sacola"}
          </button>
          <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-wideish text-ink-soft">
            Peça única — sem reposição no mesmo lote
          </p>

          {/* Ornamentos */}
          <div className="mt-10">
            <KnotDivider label="Ornamentos desta peça" className="mb-4" />
            <ul className="space-y-1.5">
              {product.ornaments.map((item) => (
                <li key={item} className="font-body text-sm text-ink-soft">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Descrição completa + acordeões */}
          <div className="mt-10">
            <DetailPanel title="Sobre esta peça" defaultOpen>
              <p>{product.fullDescription}</p>
            </DetailPanel>
            <DetailPanel title="Materiais e dimensões">
              <ul className="space-y-1.5">
                {product.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </DetailPanel>
            <DetailPanel title="Cuidados com a peça">
              <p>
                Limpe com pano levemente úmido e deixe secar à sombra, longe de
                fontes de calor direto. Evite contato prolongado com água e
                guarde a bolsa preenchida com papel de seda para manter a
                forma quando não estiver em uso.
              </p>
            </DetailPanel>
            <DetailPanel title="Entrega e trocas">
              <p>
                Peças em pronta-entrega enviadas em até 3 dias úteis. Como
                cada bolsa é única, trocas são aceitas por defeito de
                fabricação em até 7 dias após o recebimento.
              </p>
            </DetailPanel>
          </div>
        </div>
      </div>

      {/* Peças relacionadas */}
      {related.length > 0 && (
        <ProductGrid
          products={related}
          title="Da mesma coleção"
          description={`Outras peças de ${product.collection}.`}
        />
      )}
    </div>
  );
}