
import { Search, Filter } from "lucide-react"
import "../../style/tourbecoco.css"

export default function Tourbecoco() {

  const products = [
    {
      id: 1,
      name: "GROW BAG HORS SOL 100X18X16",
      image: "/imadedetourbe/image rempotage/1nj moyen.png",
      packaging: "SAC",
      color: "blue",
      features: ["Structure moyenne", "30% de fibres vertes", "Drainage optimal"],
    },
    {
      id: 2,
      name: "TOURBE TS3 425 MOYEN TERREAU BLOC COCO 100% FIN",
      image: "/imadedetourbe/image rempotage/425 moyan.png",
      packaging: " BLOC 5KG",
      color: "blue",
      features: ["Structure moyenne", "Polyvalent", "Bonne rétention d'eau"],
    },
    {
      id: 3,
      name: "TERREAU BLOC COCO 70/30",
      image: "/imadedetourbe/image rempotage/135 moyen.png",
      packaging: "BLOC 5KG",
      color: "green",
      features: ["Structure fine à moyenne", "Haute qualité", "Pour plantes exigeantes"],
    },
    {
      id: 4,
      name: "TERREAU FIBRE COCO SAC 70L",
      image: "/imadedetourbe/image rempotage/3W4 fibreux.png",
      packaging: "SAC 70L",
      color: "green",
      features: ["Structure fibreuse", "30% de fibres vertes", "Aération maximale"],
    }
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
