import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Product } from "../types";

type CartContextValue = {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
  isInCart: (slug: string) => boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  totalPrice: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "numa-croche:cart";

function readInitialCart(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Product[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>(readInitialCart);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage indisponível — a sacola segue funcionando só na sessão atual
    }
  }, [items]);

  const addItem = (product: Product) => {
    setItems((prev) =>
      prev.some((p) => p.slug === product.slug) ? prev : [...prev, product]
    );
    setIsOpen(true);
  };

  const removeItem = (slug: string) => {
    setItems((prev) => prev.filter((p) => p.slug !== slug));
  };

  const clearCart = () => setItems([]);

  const isInCart = (slug: string) => items.some((p) => p.slug === slug);

  const totalPrice = items.reduce((sum, p) => sum + p.price, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        isInCart,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart precisa ser usado dentro de um <CartProvider>");
  }
  return ctx;
}
