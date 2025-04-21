
import { useState } from "react"
import { Search, Filter} from "lucide-react"
import "../../style/tourbefruitrouge.css"

export default function TourbeFruitRouge() {
  const [hoveredProduct, setHoveredProduct] = useState(null)
  const [activeFilter, setActiveFilter] = useState("all")

  const products = [
    {
      id: 1,
      name: "TOURBE 977 MYRTILLE 30% PERLITE 210L",
      image: "/imadedetourbe/image fruit rouge/977myrtille .png",
      packaging: "210L / 6M3",
      color: "red",
      features: ["Idéal pour myrtilles", "30% perlite", "Drainage optimal"],
      categories: ["myrtilles"],
    },
    {
      id: 2,
      name: "TOURBE 979 MYRTILLE 20% PERLITE 210L",
      image: "/imadedetourbe/image fruit rouge/977myrtille .png",
      packaging: "210L / 6M3",
      color: "red",
      features: ["Spécial myrtilles", "20% perlite", "Équilibre air-eau optimal"],
      categories: ["myrtilles"],
    },
    {
      id: 3,
      name: "TOURBE TS4 U55 MYRTILLES GF/PERLITE 210L",
      image: "/imadedetourbe/image fruit rouge/977myrtille .png",
      packaging: "210L / 6.5M3",
      color: "red",
      features: ["Base GRENNFIBRE", "Pour myrtilles", "Structure aérée"],
      categories: ["myrtilles", "greenfibre"],
    },
    {
      id: 4,
      name: "TOURBE BLONDE 932 210L",
      image: "/imadedetourbe/image fruit rouge/blonde932.png",
      packaging: "210L / 6M3",
      color: "yellow",
      features: ["Structure fine", "pH acide", "Pour petits fruits"],
      categories: ["tourbe-blonde"],
    },
    {
      id: 5,
      name: "TOURBE BLONDE ACIDE 2UB (30%GREENFIBRE)",
      image: "/imadedetourbe/image fruit rouge/blondeAcide2ub.png",
      packaging: "210L / 6M3",
      color: "green",
      features: ["30% GREENFIBRE", "pH très acide", "Idéal pour fruits rouges"],
      categories: ["tourbe-blonde", "greenfibre"],
    },
    {
      id: 6,
      name: "TOURBE TS1 S99 784+30%COCO 210L",
      image: "/imadedetourbe/image fruit rouge/blondeAcide2ub.png",
      packaging: "210L",
      color: "green",
      features: ["30% fibres de coco", "Rétention d'eau améliorée", "Pour fruits rouges exigeants"],
      categories: [],
    },
  ]

  // Filter products based on active filter
  const filteredProducts =
    activeFilter === "all" ? products : products.filter((product) => product.categories.includes(activeFilter))

  return (
    <div className="tourbe-fruitrouge-container">
      <div className="header-section">
        <div className="header-content">
          <h1>Tourbes Fruits Rouges</h1>
          <p>Découvrez notre gamme de tourbes spécialement conçues pour la culture des fruits rouges et myrtilles</p>

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

      <div className="category-tabs">
        <button className={`tab ${activeFilter === "all" ? "active" : ""}`} onClick={() => setActiveFilter("all")}>
          Tous les produits
        </button>
        <button
          className={`tab ${activeFilter === "myrtilles" ? "active" : ""}`}
          onClick={() => setActiveFilter("myrtilles")}
        >
          Myrtilles
        </button>
        <button
          className={`tab ${activeFilter === "tourbe-blonde" ? "active" : ""}`}
          onClick={() => setActiveFilter("tourbe-blonde")}
        >
          Tourbe Blonde
        </button>
        <button
          className={`tab ${activeFilter === "greenfibre" ? "active" : ""}`}
          onClick={() => setActiveFilter("greenfibre")}
        >
          Avec GREENFIBRE
        </button>
      </div>

      <div className="product-count">
        <span>{filteredProducts.length} produits</span>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={`product-card ${product.color}`}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <div className="product-image-container">
              <img src={product.image || "/placeholder.svg"} alt={product.name} className="product-image" />

             
            </div>

            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>

              <div className="product-description">{product.description}</div>

              <div className="product-packaging">
                <span className="label">Emballage :</span>
                <span className="value">{product.packaging}</span>
              </div>

              <div className="product-actions">
                <button className="add-to-quote">Ajouter au devis</button>
               
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <p>Aucun produit ne correspond à votre sélection.</p>
        </div>
      )}

      <div className="fruit-benefits">
        <div className="benefits-header">
          <h2>Pourquoi choisir nos tourbes pour fruits rouges ?</h2>
        </div>

        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon ph-icon"></div>
            <h3>pH Optimal</h3>
            <p>Nos mélanges sont spécialement formulés avec un pH adapté aux besoins des fruits rouges et myrtilles.</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon drainage-icon"></div>
            <h3>Drainage Parfait</h3>
            <p>L'ajout de perlite assure un drainage optimal tout en conservant l'humidité nécessaire aux racines.</p>
          </div>

          <div className="benefit-card">
            <div className="benefit-icon nutrition-icon"></div>
            <h3>Nutrition Équilibrée</h3>
            <p>
              Nos substrats fournissent tous les nutriments essentiels pour une croissance saine et une production
              abondante.
            </p>
          </div>
        </div>
      </div>

      <div className="product-help">
        <div className="help-content">
          <h2>Besoin d'aide pour choisir?</h2>
          <p>
            Nos experts sont disponibles pour vous guider dans le choix de la tourbe adaptée à vos cultures de fruits
            rouges.
          </p>
          <button className="contact-button">Contacter un expert</button>
        </div>
      </div>
    </div>
  )
}
