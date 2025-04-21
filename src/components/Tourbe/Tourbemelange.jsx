
import { useState, useEffect } from "react"
import { Search, Filter, Info } from "lucide-react"
import "../../style/tourbemelange.css"

export default function Tourbemelange() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([])

  const products = [
    {
      id: 1,
      name: "TOURBE STECKMEDIUM 686 210L",
      image: "/imadedetourbe/imagemelange/steckmedium-686.png",
      packaging: "210L",
      color: "green",
      features: ["Idéal pour bouturage", "Structure fine", "Drainage optimal"],
      categories: ["bouturage"],
    },
    {
      id: 2,
      name: "TOURBE TS1 623 PERLITE 210L",
      image: "/imadedetourbe/imagemelange/ts1-623.png",
      packaging: "210L / 6M3",
      color: "green",
      features: ["Enrichi en perlite", "Aération améliorée", "Pour mélanges professionnels"],
      categories: ["perlite"],
    }
  ]

  // Filter products based on active filter and search query
  useEffect(() => {
    let result = products

    // Apply category filter
    if (activeFilter !== "all") {
      result = result.filter((product) => product.categories.includes(activeFilter))
    }

    // Apply search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.features.some((feature) => feature.toLowerCase().includes(query)),
      )
    }

    setFilteredProducts(result)
  }, [activeFilter, searchQuery])

  return (
    <div className="tourbe-melange-container">
      <div className="header-section">
        <div className="header-content">
          <h1>Tourbes Mélange</h1>
          <p>Découvrez notre gamme de tourbes spécialement conçues pour réaliser vos mélanges professionnels</p>

          <div className="search-filter">
            <div className="search-box">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
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
          className={`tab ${activeFilter === "bouturage" ? "active" : ""}`}
          onClick={() => setActiveFilter("bouturage")}
        >
          Bouturage
        </button>
        <button
          className={`tab ${activeFilter === "perlite" ? "active" : ""}`}
          onClick={() => setActiveFilter("perlite")}
        >
          Avec Perlite
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

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <p>Aucun produit ne correspond à votre recherche.</p>
        </div>
      )}

      <div className="mixing-guide">
        <div className="guide-header">
          <h2>Guide de mélange</h2>
          <p>Découvrez comment créer le mélange parfait pour vos besoins spécifiques</p>
        </div>

        <div className="guide-cards">
          <div className="guide-card">
            <div className="ratio">70%</div>
            <h3>Tourbe de base</h3>
            <p>Choisissez une tourbe de base adaptée à votre culture</p>
          </div>

          <div className="guide-plus">+</div>

          <div className="guide-card">
            <div className="ratio">20%</div>
            <h3>Perlite ou vermiculite</h3>
            <p>Pour améliorer l'aération et le drainage</p>
          </div>

          <div className="guide-plus">+</div>

          <div className="guide-card">
            <div className="ratio">10%</div>
            <h3>Additifs spécifiques</h3>
            <p>Ajoutez des nutriments ou des amendements selon vos besoins</p>
          </div>
        </div>
      </div>

      <div className="product-help">
        <div className="help-content">
          <h2>Besoin d'aide pour choisir?</h2>
          <p>
            Nos experts sont disponibles pour vous guider dans le choix de la tourbe adaptée à vos mélanges spécifiques.
          </p>
          <button className="contact-button">Contacter un expert</button>
        </div>
      </div>
    </div>
  )
}
