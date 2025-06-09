export default function Home() {
  // Dados dos produtos organizados por categoria
  const produtos = {
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
  };

  const categorias = [
    { key: 'calcados', nome: 'Calçados' },
    { key: 'calcas', nome: 'Calças' },
    { key: 'camisas', nome: 'Camisas' },
    { key: 'moletons', nome: 'Moletons' }
  ];

  const handleAddToCart = (produto) => {
    alert(`${produto.nome} adicionado ao carrinho! ${produto.preco}`);
  };

  return (
    <div className="main-container">
      {/* Cabeçalho */}
      <header className="header">
        <div className="header-content">
          <h1 className="store-title">Fashion Store</h1>
          <p className="store-subtitle">Moda e Estilo para Todos os Momentos</p>
          <span className="store-badge">✨ Coleção 2025 ✨</span>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="main-content">
        <div className="content-wrapper">
          
          {/* Seções de Produtos */}
          {categorias.map((categoria) => (
            <section key={categoria.key} className="category-section">
              <h2 className="category-title">
                {categoria.nome}
              </h2>
              
              <div className="products-grid">
                {produtos[categoria.key].map((produto) => (
                  <div key={produto.id} className="product-card">
                    <span className="product-emoji">
                      {produto.imagem}
                    </span>
                    <h3 className="product-name">
                      {produto.nome}
                    </h3>
                    <p className="product-price">
                      {produto.preco}
                    </p>
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(produto)}
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Rodapé */}
      <footer className="footer">
        <div className="footer-content">
          <h3 className="footer-title">Fashion Store</h3>
          <p className="footer-description">
            Sua loja de moda online com os melhores produtos, qualidade excepcional e preços imbatíveis. 
            Estilo e elegância para todas as ocasiões.
          </p>
          <div className="footer-contact">
            <span className="contact-item">📧 contato@fashionstore.com</span>
            <span className="contact-item">📱 (11) 99999-9999</span>
            <span className="contact-item">📍 São Paulo, SP</span>
            <span className="contact-item">🕒 Seg - Sex: 9h às 18h</span>
          </div>
          <p className="footer-copyright">
            © 2025 Fashion Store. Todos os direitos reservados. | Desenvolvido com ❤️
          </p>
        </div>
      </footer>
    </div>
  );
}
