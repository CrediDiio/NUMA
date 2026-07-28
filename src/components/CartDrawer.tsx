import React from 'react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen = false,
  onClose,
}) => {
  // Pega os itens e a função de remover direto do contexto global do carrinho
  const { items, removeItem } = useCart();

  // Função que envia os dados para a API do Mercado Pago
  const handleCheckout = async () => {
    if (!items || items.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }

    try {
      const formattedItems = items.map((item: any) => ({
        title: item.title || item.name || 'Produto NUMA',
        price: Number(item.price),
        quantity: Number(item.quantity || 1),
      }));

      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: formattedItems }),
      });

      const data = await response.json();

      if (response.ok && data.init_point) {
        window.location.href = data.init_point;
      } else {
        console.error('Erro na API:', data);
        alert('Não foi possível gerar o link de pagamento. Lembre-se que rotas /api/ precisam rodar na Vercel.');
      }
    } catch (error) {
      console.error('Erro no checkout:', error);
      alert('Ocorreu um erro de conexão. Teste diretamente pelo link da Vercel no ar!');
    }
  };

  // Soma o valor total dos itens
  const total = items.reduce(
    (acc: number, item: any) => acc + Number(item.price) * (item.quantity || 1),
    0
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Fundo escuro que fecha ao clicar fora */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity cursor-pointer" 
        onClick={onClose}
      />

      {/* Painel do Carrinho */}
      <div className="relative z-10 w-full max-w-md bg-white h-full shadow-xl flex flex-col justify-between p-6">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-bold text-gray-800">Seu Carrinho</h2>
          <button
            onClick={onClose}
            type="button"
            className="text-gray-500 hover:text-black font-bold text-2xl p-1 leading-none"
          >
            ✕
          </button>
        </div>

        {/* Lista de Produtos com Botão de Remover */}
        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              O seu carrinho está vazio.
            </p>
          ) : (
            items.map((item: any, index: number) => (
              <div
                key={item.id || item.slug || index}
                className="flex items-center justify-between py-3 border-b"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {item.title || item.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Qtd: {item.quantity || 1} x R$ {Number(item.price).toFixed(2)}
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <p className="font-bold text-gray-900">
                    R$ {(Number(item.price) * (item.quantity || 1)).toFixed(2)}
                  </p>
                  
                  {/* Botão de Remover Item */}
                  <button
                    onClick={() => removeItem(item.slug || item.id)}
                    className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                    title="Remover item"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Rodapé e Botão de Finalizar */}
        <div className="border-t pt-4 space-y-4">
          <div className="flex justify-between items-center text-lg font-bold text-gray-900">
            <span>Total:</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={items.length === 0}
            className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all ${
              items.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-black hover:bg-gray-800 active:scale-95'
            }`}
          >
            Finalizar Compra
          </button>
        </div>

      </div>
    </div>
  );
};

export default CartDrawer;