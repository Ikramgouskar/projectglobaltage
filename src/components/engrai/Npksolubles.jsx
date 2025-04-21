"use client"

import { useState, useEffect } from "react"
import { PlusCircle, Info, BarChart3 } from "lucide-react"
import "../style/npk.css"

export default function Npkoluble() {
  
    const [npk, set] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
      try {
        const pastequeCategory = productsData.products.find((product) => product.category === "PASTEQUES")
        setPasteques(pastequeCategory?.products || [])
        setLoading(false)
      } catch (error) {
        console.error("Error loading pasteques:", error)
        setError("Impossible de charger les données. Veuillez réessayer plus tard.")
        setLoading(false)
      }
    }, [])
  
  

  
  
    return (
      <div className="npk-chart">
        {values.n !== undefined && (
          <div className="npk-bar-container">
            <div className="npk-label">N</div>
            <div className="npk-bar-wrapper">
              <div className="npk-bar n-bar" style={{ width: `${values.n * scale}%` }}>
                <span className="npk-value">{values.n}%</span>
              </div>
            </div>
          </div>
        )}

        {values.p !== undefined && (
          <div className="npk-bar-container">
            <div className="npk-label">P</div>
            <div className="npk-bar-wrapper">
              <div className="npk-bar p-bar" style={{ width: `${values.p * scale}%` }}>
                <span className="npk-value">{values.p}%</span>
              </div>
            </div>
          </div>
        )}

        {values.k !== undefined && (
          <div className="npk-bar-container">
            <div className="npk-label">K</div>
            <div className="npk-bar-wrapper">
              <div className="npk-bar k-bar" style={{ width: `${values.k * scale}%` }}>
                <span className="npk-value">{values.k}%</span>
              </div>
            </div>
          </div>
        )}

        {values.mg !== undefined && (
          <div className="npk-bar-container">
            <div className="npk-label">Mg</div>
            <div className="npk-bar-wrapper">
              <div className="npk-bar mg-bar" style={{ width: `${values.mg * scale}%` }}>
                <span className="npk-value">{values.mg}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="npk-container">
      <div className="floating-elements">
        <div className="floating-element n-element">N</div>
        <div className="floating-element p-element">P</div>
        <div className="floating-element k-element">K</div>
      </div>

      <header className="npk-header">
        <div className="npk-title-container">
          <h1 className="npk-title">NPK Solubles</h1>
          <p className="npk-subtitle">Solutions nutritives pour une croissance optimale</p>
        </div>

        <div className="npk-stats">
          <div className="npk-stat">
            <BarChart3 className="npk-stat-icon" />
            <div>
              <div className="npk-stat-value">{products.length}</div>
              <div className="npk-stat-label">Produits</div>
            </div>
          </div>
        </div>
      </header>

      {loading ? (
        <div className="npk-loading">
          <div className="npk-loading-animation">
            <div className="npk-loading-circle n-loading"></div>
            <div className="npk-loading-circle p-loading"></div>
            <div className="npk-loading-circle k-loading"></div>
          </div>
          <p>Chargement des produits...</p>
        </div>
      ) : (
        <div className={`npk-products-grid ${isVisible ? "visible" : ""}`}>
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`npk-product-card ${product.color} ${activeProduct === product.id ? "active" : ""}`}
              onMouseEnter={() => setActiveProduct(product.id)}
              onMouseLeave={() => setActiveProduct(null)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="npk-product-image-container">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="npk-product-image"
                  onError={(e) => {
                    e.currentTarget.onerror = null
                    e.currentTarget.src = "/placeholder.svg"
                  }}
                />
                <div className="npk-product-hover-info">
                  <button className="npk-info-button">
                    <Info size={20} />
                  </button>
                  <div className="npk-product-chart">
                    <NPKChart values={product.npkValues} />
                  </div>
                </div>
              </div>

              <div className="npk-product-content">
                <h2 className="npk-product-name">{product.name}</h2>
                <p className="npk-product-packaging">Emballage : {product.packaging}</p>
              </div>

              <div className="npk-product-action">
                <button className="npk-add-button">
                  <span>Ajouter au devis</span>
                  <PlusCircle className="npk-button-icon" />
                </button>
              </div>

              <div className="npk-product-hover-effect"></div>
            </div>
          ))}
        </div>
      )}

      <div className="npk-formula-display">
        <div className="formula-element n-formula">N</div>
        <div className="formula-element p-formula">P</div>
        <div className="formula-element k-formula">K</div>
      </div>
    </div>
  )
}
