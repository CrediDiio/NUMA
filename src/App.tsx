import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { Home } from "./pages/Home";
import { ProductPage } from "./pages/ProductPage";

function App() {
  // 1. Criamos a "chave" que liga e desliga o carrinho
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bone">
      {/* 2. Entregamos a função de ABRIR para o Header (onde fica o botão da sacola) */}
      <Header onOpenCart={() => setIsCartOpen(true)} />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produto/:slug" element={<ProductPage />} />
        </Routes>
      </main>
      
      <Footer />
      
      {/* 3. Conectamos o carrinho para ele saber quando abrir e como fechar */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </div>
  );
}

export default App;