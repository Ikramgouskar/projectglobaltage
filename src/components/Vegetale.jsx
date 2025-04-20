

import "../style/vegetable.css"
import { Link } from "react-router-dom"

export default function Vegetale() {
  return (
    <>
      <br />

      <div className="product-dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Nos Produits Agricoles</h1>
          <p className="dashboard-subtitle">Découvrez notre sélection de semences de qualité supérieure</p>
        </div>

        <div className="product-grid">
          <div className="product-card">
            <div className="product-icon-container">
              <div className="icon-background"></div>
            </div>
            <div className="product-info">
              <Link to="/tomate">
                <h1 className="product-name">TOMATES</h1>
              </Link>
              <div className="product-count">
                <span className="count">5</span> Products
              </div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-icon-container">
              <div className="icon-background"></div>
            </div>
            <div className="product-info">
              <Link to="/corgette">
                <h1 className="product-name">COURGETTES</h1>
              </Link>
              <div className="product-count">
                <span className="count">6</span> Products
              </div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-icon-container">
              <div className="icon-background"></div>
            </div>
            <div className="product-info">
              <Link to="/melon">
                <h1 className="product-name">MELONS</h1>
              </Link>
              <div className="product-count">
                <span className="count">7</span> Products
              </div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-icon-container">
              <div className="icon-background"></div>
            </div>
            <div className="product-info">
              <Link to="/pasteque">
                <h1 className="product-name">PASTEQUES</h1>
              </Link>
              <div className="product-count">
                <span className="count">2</span> Products
              </div>
            </div>
          </div>

          <div className="product-card">
            <div className="product-icon-container">
              <div className="icon-background"></div>
            </div>
            <div className="product-info">
              <Link to="/poiverent">
                <h1 className="product-name">POIVRONS ET PIMENTS</h1>
              </Link>
              <div className="product-count">
                <span className="count">8</span> Products
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
