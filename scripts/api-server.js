const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3038;

// Middleware para CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Middleware para JSON
app.use(express.json());

// Dados dos produtos (mesmo conteúdo da API original)
const produtos = {
  calcados: [
    { id: 1, nome: "Tênis Esportivo Premium", preco: "R$ 299,99", imagem: "👟" },
    { id: 2, nome: "Sapato Social Executivo", preco: "R$ 249,99", imagem: "👞" },
    { id: 3, nome: "Bota Couro Masculina", preco: "R$ 349,99", imagem: "🥾" },
    { id: 4, nome: "Sandália Confort", preco: "R$ 159,99", imagem: "👡" }
  ],
  calcas: [
    { id: 5, nome: "Calça Jeans Slim Fit", preco: "R$ 189,99", imagem: "👖" },
    { id: 6, nome: "Calça Social Alfaiataria", preco: "R$ 229,99", imagem: "👔" },
    { id: 7, nome: "Bermuda Cargo", preco: "R$ 119,99", imagem: "🩳" },
    { id: 8, nome: "Legging Fitness", preco: "R$ 99,99", imagem: "🩱" }
  ],
  camisas: [
    { id: 9, nome: "Camisa Polo Clássica", preco: "R$ 149,99", imagem: "👕" },
    { id: 10, nome: "Camiseta Básica Premium", preco: "R$ 79,99", imagem: "👚" },
    { id: 11, nome: "Camisa Social Slim", preco: "R$ 199,99", imagem: "👔" },
    { id: 12, nome: "Regata Fitness", preco: "R$ 59,99", imagem: "🎽" }
  ],
  moletons: [
    { id: 13, nome: "Moletom Capuz Premium", preco: "R$ 179,99", imagem: "🧥" },
    { id: 14, nome: "Casaco Bomber", preco: "R$ 259,99", imagem: "🧧" },
    { id: 15, nome: "Jaqueta Corta-Vento", preco: "R$ 199,99", imagem: "🧥" },
    { id: 16, nome: "Cardigan Tricot", preco: "R$ 149,99", imagem: "🧥" }
  ]
};

// Rota principal da API
app.get('/api/hello', (req, res) => {
  try {
    res.json({
      message: 'API Fashion Store funcionando!',
      produtos: produtos,
      timestamp: new Date().toISOString(),
      port: PORT
    });
  } catch (error) {
    console.error('Erro na API:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para produtos por categoria
app.get('/api/produtos/:categoria', (req, res) => {
  const { categoria } = req.params;
  
  if (produtos[categoria]) {
    res.json({
      categoria: categoria,
      produtos: produtos[categoria],
      total: produtos[categoria].length
    });
  } else {
    res.status(404).json({ error: 'Categoria não encontrada' });
  }
});

// Rota para todos os produtos (usada pelo healthcheck)
app.get('/api/products', (req, res) => {
  try {
    res.json({
      status: 'success',
      produtos: produtos,
      totalCategorias: Object.keys(produtos).length,
      totalProdutos: Object.values(produtos).flat().length
    });
  } catch (error) {
    console.error('Erro na API products:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    port: PORT,
    service: 'Fashion Store API'
  });
});

// Rota padrão
app.get('/', (req, res) => {
  res.json({ 
    message: 'Fashion Store API Server',
    version: '1.0.0',
    endpoints: [
      'GET /api/hello',
      'GET /api/produtos/:categoria',
      'GET /health'
    ]
  });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Fashion Store API Server rodando na porta ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`🛍️  API Produtos: http://localhost:${PORT}/api/hello`);
});

module.exports = app;
