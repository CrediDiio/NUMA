import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { Home } from "./pages/Home";
import { ProductPage } from "./pages/ProductPage";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 👂 NOVO: Este "ouvido" fica prestando atenção. 
  // Se alguém gritar 'abrirCarrinho', ele abre a aba na hora!
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
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </div>
  );
}

export default App;