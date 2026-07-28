import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { Home } from "./pages/Home";
import { ProductPage } from "./pages/ProductPage";
import { useCart } from "./context/CartContext"; // Importa o contexto do carrinho

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Pega os itens reais salvos no contexto global da loja
  const { items } = useCart();

  // Escuta o sinal para abrir o carrinho automaticamente
  useEffect(() => {
    const handleOpen = () => setIsCartOpen(true);
    window.addEventListener('abrirCarrinho', handleOpen);
    return () => window.removeEventListener('abrirCarrinho', handleOpen);
  }, []);

  return (
    <div className="min-h-screen bg-bone">
      <Header onOpenCart={() => setIsCartOpen(true)} />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produto/:slug" element={<ProductPage />} />
        </Routes>
      </main>
      
      <Footer />
      
      {/* Passa os itens do carrinho e a função de fechar para a gaveta */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
}

export default App;