import React from 'react';

interface CartItem {
  id?: string | number;
  title?: string;
  name?: string;
  price: number;
  quantity?: number;
  image?: string;
}

interface CartDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  items?: CartItem[];
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen = true,
  onClose,
  items = []
}) => {
  
  // Função que conecta o botão ao Mercado Pago
  const handleCheckout = async () => {
    if (!items || items.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }

    try {
      const formattedItems = items.map((item) => ({
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
        // Redireciona para o checkout seguro do Mercado Pago
        window.location.href = data.init_point;
      } else {
        console.error('Erro na API:', data);
        alert('Não foi possível gerar o link de pagamento. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro no checkout:', error);
      alert('Ocorreu um erro de conexão ao processar seu pedido.');
    }
  };

  // Soma o valor total de todos os itens do carrinho
  const total = items.reduce(
    (acc, item) => acc + Number(item.price) * (item.quantity || 1),
    0
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
      <div className="w-full max-w-md bg-white h-full shadow-xl flex flex-col justify-between p-6">
        
        {/* Cabeçalho do Carrinho */}
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-bold text-gray-800">Seu Carrinho</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black font-bold text-lg p-1"
            >
              ✕
            </button>
          )}
        </div>

        {/* Lista dos Produtos no Carrinho */}
        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">
              O seu carrinho está vazio.
            </p>
          ) : (
            items.map((item, index) => (
              <div
                key={item.id || index}
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
                <p className="font-bold text-gray-900">
                  R$ {(Number(item.price) * (item.quantity || 1)).toFixed(2)}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Rodapé com o Total e o Botão de Pagamento */}
        <div className="border-t pt-4 space-y-4">
          <div className="flex justify-between items-center text-lg font-bold text-gray-900">
            <span>Total:</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>

          {/* BOTÃO DE FINALIZAR COMPRA */}
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