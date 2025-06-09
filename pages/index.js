import { useEffect, useState } from "react";
import { FiSearch, FiShoppingBag } from "react-icons/fi";

export default function Home() {
  const [produtos, setProdutos] = useState({
    calcados: [],
    calcas: [],
    camisas: [],
    moletons: [],
  });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const categorias = [
    { key: "calcados", nome: "Calçados" },
    { key: "calcas", nome: "Calças" },
    { key: "camisas", nome: "Camisas" },
    { key: "moletons", nome: "Moletons" },
  ];

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => {
        setProdutos(data.produtos);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (produto) => {
    console.log(
      `${produto.nome} adicionado ao carrinho! Preço: ${produto.preco}`
    );
  };

  const filterProducts = (arr) =>
    arr.filter((produto) =>
      produto.nome.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <>      <header className="header">
        <div className="header-content">
          <div className="header-title">
            <FiShoppingBag size={28} />
            <h1>Fashion Store</h1>
          </div>
          <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
            <FiSearch size={18} className="search-icon"/>
            <input
              type="text"
              placeholder="Buscar produto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </form>
        </div>
        <p className="header-subtitle">Moda e Estilo para Todos os Momentos</p>
      </header>
      <main className="main container">        {loading ? (
          <div className="loading-state">
            Carregando produtos...
          </div>
        ) : (
          categorias.map((categoria) => {
            const produtosFiltrados = filterProducts(
              produtos[categoria.key] || []
            );
            if (produtosFiltrados.length === 0) return null;
            return (
              <section key={categoria.key} className="section">
                <h2 className="section-title">{categoria.nome}</h2>
                <div className="products-grid">
                  {produtosFiltrados.map((produto) => (
                    <div key={produto.id} className="product-card">
                      <div className="product-img">{produto.imagem}</div>
                      <div className="product-info">
                        <div className="product-name">{produto.nome}</div>
                        <div className="product-price">
                          {produto.preco}
                        </div>{" "}
                        <button
                          className="add-btn"
                          onClick={() => handleAddToCart(produto)}
                        >
                          <FiShoppingBag className="btn-icon" />
                          Adicionar ao Carrinho
                        </button>
                      </div>
                      <span className="product-badge">Novo</span>
                    </div>
                  ))}
                </div>
              </section>
            );
          })
        )}
      </main>
      <footer className="footer">
        <h3>Fashion Store</h3>
        <p>Sua loja de moda online com os melhores produtos e preços</p>
        <div className="footer-info">
          <span>📧 contato@fashionstore.com</span>
          <span>📱 (11) 99999-9999</span>
          <span>📍 São Paulo, SP</span>
        </div>
        <div className="copyright">
          © 2025 Fashion Store. Todos os direitos reservados.
        </div>
      </footer>
    </>
  );
}
