const { MercadoPagoConfig, Preference } = require('mercadopago');

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ message: 'Método não permitido' });

  try {
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!accessToken) {
      return res.status(500).json({ error: 'Token do Mercado Pago não configurado.' });
    }

    const client = new MercadoPagoConfig({ accessToken });
    const preference = new Preference(client);
    const { items } = req.body || {};

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Nenhum item no carrinho.' });
    }

    const response = await preference.create({
      body: {
        items: items.map(item => ({
          title: String(item.title || item.name || 'Produto NUMA'),
          unit_price: Number(item.price),
          quantity: Number(item.quantity || 1),
          currency_id: 'BRL',
        })),
        back_urls: {
          success: 'https://numa-diocred.vercel.app',
          failure: 'https://numa-diocred.vercel.app',
          pending: 'https://numa-diocred.vercel.app',
        },
        auto_return: 'approved',
      },
    });

    return res.status(200).json({ init_point: response.init_point });
  } catch (error) {
    console.error('Erro Mercado Pago:', error);
    return res.status(500).json({ error: 'Erro ao criar pagamento' });
  }
}