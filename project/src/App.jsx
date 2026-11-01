import { useState } from 'react'
import products from './products'
import ProductCard from './components/ProductCard'
import ProductDetail from './pages/ProductDetail'
import './App.css'

function App() {
  const [activeProduct, setActiveProduct] = useState(null)

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-inner">
          <h1 className="app__logo">Niche</h1>
          <p className="app__tagline">Curated goods</p>
        </div>
      </header>

      <main className="app__main">
        {activeProduct ? (
          <ProductDetail product={activeProduct} onBack={() => setActiveProduct(null)} />
        ) : (
          <section className="catalog">
            <div className="catalog__intro">
              <h2 className="catalog__heading">All products</h2>
              <p className="catalog__count">{products.length} items</p>
            </div>
            <div className="catalog__grid">
              {products.map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  onOpen={() => setActiveProduct(product)}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="app__footer">
        <p>Niche · Demo storefront</p>
      </footer>
    </div>
  )
}

export default App
