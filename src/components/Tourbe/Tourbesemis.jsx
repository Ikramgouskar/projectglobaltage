import { Search, Filter } from 'lucide-react'
import "../../style/tourbesemis.css"

export default function Tourbesemis() {
  
  const products = [
    {
      id: 1,
      name: "TOURBE POTGROND P 067 70L",
      image: "/imadedetourbe/potgron.png",
      packaging: "70L",
      color: "red",
      features: ["Idéal pour semis", "Structure fine", "Rétention d'eau optimale"]
    },
    {
      id: 2,
      name: "TOURBE TS1 GREENFIBRE 2MN 70L",
      image: "/imadedetourbe/greenfibre.png",
      packaging: "70L",
      color: "blue",
      features: ["Enrichi en fibres vertes", "Aération améliorée", "Pour semis professionnels"]
    },
    {
      id: 3,
      name: "TOURBE TS3 3B5 70L",
      image: "/imadedetourbe/t3 3b5.png",
      packaging: "70L",
      color: "blue",
      features: ["Formule équilibrée", "Drainage optimal", "Pour jeunes plants"]
    },
    {
      id: 4,
      name: "TOURBE TRAY SUBSTRAT REC V087 70L",
      image: "/imadedetourbe/trayV087.png",
      packaging: "70L",
      color: "red",
      features: ["Spécial plateaux", "Germination uniforme", "Structure homogène"]
    },
    {
      id: 5,
      name: "TOURBE TRAY SUBSTRAT 1LD GREENFIBRE 70L",
      image: "/imadedetourbe/tray1LDGREENfibre.png",
      packaging: "70L",
      color: "red",
      features: ["Fibres vertes intégrées", "Pour plateaux alvéolés", "Repiquage facilité"]
    },
    {
      id: 6,
      name: "TOURBE PROLINE BIO TRAY-SUBSTRAT 70L",
      image: "/imadedetourbe/proline bio trayubtrat.png",
      packaging: "70L",
      color: "green",
      isBio: true,
      features: ["Agriculture biologique", "Sans additifs chimiques", "Certification écologique"]
    }
   

  ]

  return (
    <div className="tourbe-semis-container">
      <div className="header-section">
        <div className="header-content">
          <h1>Tourbes Semis</h1>
          <p>Découvrez notre gamme de tourbes spécialement conçues pour les semis et la germination</p>
          
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
              {product.isBio && <span className="bio-badge">BIO</span>}
              
             
            </div>
            
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <div className="product-packaging">
                <span className="label">Emballage :</span>
                <span className="value">{product.packaging}</span>
              </div>
              
              <div className="product-actions">
                <button className="add-to-quote">
                  Ajouter 
                </button>
                <button className="info-button">
                 
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="product-help">
        <div className="help-content">
          <h3>Besoin d'aide pour choisir?</h3>
          <p>Nos experts sont disponibles pour vous guider dans le choix de la tourbe adaptée à vos besoins spécifiques.</p>
          <button className="contact-button">Contacter un expert</button>
        </div>
      </div>
    </div>
  )
}
