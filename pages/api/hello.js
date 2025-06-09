export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({
      produtos: {
        calcados: [
          { id: 1, nome: 'Tênis Esportivo', preco: 'R$ 199,90', imagem: '👟' },
          { id: 2, nome: 'Sapato Social', preco: 'R$ 299,90', imagem: '👞' },
          { id: 3, nome: 'Sandália', preco: 'R$ 89,90', imagem: '👡' },
          { id: 4, nome: 'Bota Coturno', preco: 'R$ 249,90', imagem: '🥾' }
        ],
        calcas: [
          { id: 5, nome: 'Calça Jeans', preco: 'R$ 149,90', imagem: '👖' },
          { id: 6, nome: 'Calça Social', preco: 'R$ 179,90', imagem: '👔' },
          { id: 7, nome: 'Calça Legging', preco: 'R$ 79,90', imagem: '🩱' },
          { id: 8, nome: 'Bermuda', preco: 'R$ 89,90', imagem: '🩳' }
        ],
        camisas: [
          { id: 9, nome: 'Camisa Polo', preco: 'R$ 99,90', imagem: '👕' },
          { id: 10, nome: 'Camisa Social', preco: 'R$ 129,90', imagem: '👔' },
          { id: 11, nome: 'Camiseta Básica', preco: 'R$ 49,90', imagem: '👕' },
          { id: 12, nome: 'Regata', preco: 'R$ 39,90', imagem: '🎽' }
        ],
        moletons: [
          { id: 13, nome: 'Moletom com Capuz', preco: 'R$ 159,90', imagem: '🧥' },
          { id: 14, nome: 'Casaco Moletom', preco: 'R$ 139,90', imagem: '🧥' },
          { id: 15, nome: 'Moletom Fechado', preco: 'R$ 119,90', imagem: '👕' },
          { id: 16, nome: 'Jaqueta Moletom', preco: 'R$ 179,90', imagem: '🧥' }
        ]
      }
    });
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
