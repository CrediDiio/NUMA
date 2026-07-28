import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const formatBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

// Checkout provisório via WhatsApp — trocar por integração Mercado Pago quando estiver pronta
const NUMA_WHATSAPP = "5521977241858";

function buildWhatsAppMessage(items: { name: string; price: number }[], total: number) {
  const lines = [
    "Olá! Quero fechar o pedido destas peças da NUMA Crochê:",
    "",
    ...items.map((item) => `• ${item.name} — ${formatBRL(item.price)}`),
    "",
    `Total: ${formatBRL(total)}`,
  ];
  return encodeURIComponent(lines.join("\n"));
}

export function CartDrawer() {
  const { items, removeItem, isOpen, closeCart, totalPrice } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        aria-hidden="true"
        className={`fixed inset-0 z-[60] bg-ink/40 transition-opacity duration-300 ease-knot ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Painel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Sua sacola"
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-bone shadow-xl transition-transform duration-500 ease-knot ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-display text-xl text-ink">
            Sua sacola
            {items.length > 0 && (
              <span className="ml-2 font-mono text-xs text-ink-soft">
                ({items.length} {items.length === 1 ? "peça" : "peças"})
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            aria-label="Fechar sacola"
            className="text-ink transition-colors hover:text-clay"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="font-display text-lg text-ink">Sua sacola está vazia.</p>
            <p className="max-w-[240px] font-body text-sm text-ink-soft">
              Cada peça NUMA é única — quando você encontrar a sua, ela aparece aqui.
            </p>
            <Link
              to="/#catalogo"
              onClick={closeCart}
              className="label mt-2 text-clay"
            >
              Ver todas as bolsas
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6 py-4">
              {items.map((item) => (
                <li key={item.slug} className="flex gap-4 border-b border-line py-4 first:pt-0">
                  <div className="h-20 w-20 shrink-0 overflow-hidden bg-card">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="font-display text-base text-ink">{item.name}</p>
                      <p className="font-mono text-[11px] uppercase tracking-wideish text-ink-soft">
                        {item.colorway.name}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-body text-sm text-ink">{formatBRL(item.price)}</span>
                      <button
                        onClick={() => removeItem(item.slug)}
                        className="font-mono text-[11px] uppercase tracking-wideish text-ink-soft underline decoration-line underline-offset-2 transition-colors hover:text-clay"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-line px-6 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-body text-sm text-ink-soft">Subtotal</span>
                <span className="font-display text-lg text-ink">{formatBRL(totalPrice)}</span>
              </div>
              <a
                href={`https://wa.me/${NUMA_WHATSAPP}?text=${buildWhatsAppMessage(items, totalPrice)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-ink py-4 text-center font-mono text-xs uppercase tracking-label text-bone transition-colors duration-300 ease-knot hover:bg-clay"
              >
                Finalizar pelo WhatsApp
              </a>
              <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-wideish text-ink-soft">
                Peças únicas — reservadas ao confirmar o pedido
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
