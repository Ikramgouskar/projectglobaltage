"use client"

import { Search, Filter, Info } from "lucide-react"
import "../style/tourberempotage.css"

export default function TourbeRempotage() {

  const products = [
    {
      id: 1,
      name: "TOURBE TS3 1NJ MOYEN 30%GREENFIBRE 210L",
      image: "/imadedetourbe/ts3-1nj.png",
      packaging: "210L / 6M3",
      color: "blue",
      features: ["Structure moyenne", "30% de fibres vertes", "Drainage optimal"],
    },
    {
      id: 2,
      name: "TOURBE TS3 425 MOYEN 210L",
      image: "/imadedetourbe/ts3-425.png",
      packaging: "210L",
      color: "blue",
      features: ["Structure moyenne", "Polyvalent", "Bonne rétention d'eau"],
    },
    {
      id: 3,
      name: "TOURBE TS1 135 MOYEN 210L",
      image: "/imadedetourbe/ts1-135.png",
      packaging: "210L / 6M3",
      color: "green",
      features: ["Structure fine à moyenne", "Haute qualité", "Pour plantes exigeantes"],
    },
    {
      id: 4,
      name: "TOURBE 3W4 FIBREUX 30%GREENFIBRE",
      image: "/imadedetourbe/3w4-fibreux.png",
      packaging: "210L / 6M3",
      color: "green",
      features: ["Structure fibreuse", "30% de fibres vertes", "Aération maximale"],
    },
    {
      id: 5,
      name: "TOURBE TS4 604 GROSSIER 210L",
      image: "/imadedetourbe/ts4-604.png",
      packaging: "210L",
      color: "green",
      features: ["Structure grossière", "Très drainant", "Pour plantes spécifiques"],
    },
  ]

  return (
    <div className="tourbe-semis-container">
      <div className="header-section">
        <div className="header-content">
          <h1>Tourbes Rempotage</h1>
          <p>Découvrez notre gamme de tourbes spécialement conçues pour le rempotage de vos plantes</p>

          <div className="search-filter">
            <div className="search-box">
              <Search className="search-icon" />
              <input type="text" placeholder="Rechercher un produit..." />
            </div>
            <button className="filter-button">
              <Filter className="filter-icon" />
              <span>Filtrer</span>
            </button>
          </div>
        </div>
      </div>

      <div className="product-count">
        <span>{products.length} produits</span>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className={`product-card ${product.color}`}
          >
            <div className="product-image-container">
              <img src={product.image || "/placeholder.svg"} alt={product.name} className="product-image" />

              
            </div>

            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <div className="product-packaging">
                <span className="label">Emballage :</span>
                <span className="value">{product.packaging}</span>
              </div>

              <div className="product-actions">
                <button className="add-to-quote">Ajouter au devis</button>
                <button className="info-button">
                  <Info size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="product-help">
        <div className="help-content">
          <h2>Besoin d'aide pour choisir?</h2>
          <p>
            Nos experts sont disponibles pour vous guider dans le choix de la tourbe adaptée à vos besoins de rempotage.
          </p>
          <button className="contact-button">Contacter un expert</button>
        </div>
      </div>
    </div>
  )
}
