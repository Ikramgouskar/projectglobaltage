
import { Link } from "react-router-dom"
import "../style/tourb.css"
export default function Tourbe() {

  return (
    <div className="tourb-container">
      <div className="tourb-hero">
        <div className="soil-particles"></div>
        <h1 className="tourb-title">Nos Tourbes et Substrats</h1>
        <p className="tourb-subtitle">
          Des solutions de qualité supérieure pour vos cultures
        </p>
      </div>

      <div 
        className="substrate-grid" 
        
        >
          <div 
            
            className="substrate-card "
         
            
          >
            <div className="card-content">
            <div className="icon-container">
        <img src="/imadedetourbe/tourbeglobal.png" className="category-img" />
 
          </div>
              
              <div className="card-info">
                <h3 className="category-name">TOURBES SEMIS</h3>
                <div className="product-count">
                  <span className="count">10</span>
                  <span className="count-text">Produits</span>
                </div>
                <p className="category-description">Tourbes spécialement conçues pour les semis et la germination des graines."
                </p>
                <Link to="/tourbsemis " className="view-products">
                  Voir les produits
                  
                  <span className="arrow">→</span>
                </Link>
              </div>
            </div>
            
            <div className="card-background">
              <div className="bg-pattern"></div>
              <div className="soil-texture"></div>
            </div>
          </div>
       
      </div>





 
      <div className="substrate-grid" >
          <div className="substrate-card ">
            <div className="card-content">
            <div className="icon-container">
        <img src="/imadedetourbe/tourbeglobal.png" className="category-img" />
 
          </div>
              
              <div className="card-info">
                <h3 className="category-name">TOURBES REMPOTAGE</h3>
                <div className="product-count">
                  <span className="count">6</span>
                  <span className="count-text">Produits</span>
                </div>
                <p className="category-description">Mélanges de tourbes idéaux pour le rempotage des plantes en croissance.
                </p>
                <Link to="" className="view-products">
                  Voir les produits
                  <span className="arrow">→</span>
                </Link>
              </div>
            </div>
            
            <div className="card-background">
              <div className="bg-pattern"></div>
              <div className="soil-texture"></div>
            </div>
          </div>
       
      </div>





      <div className="substrate-grid" >
          <div className="substrate-card ">
            <div className="card-content">
            <div className="icon-container">
        <img src="/imadedetourbe/tourbeglobal.png" className="category-img" />
 
          </div>
              
              <div className="card-info">
                <h3 className="category-name">SUBSTRATS FRUITS ROUGES</h3>
                <div className="product-count">
                  <span className="count">7</span>
                  <span className="count-text">Produits</span>
                </div>
                <p className="category-description">Substrats spécifiques pour la culture des fruits rouges et baies.
                </p>
                <Link to="" className="view-products">
                  Voir les produits
                  <span className="arrow">→</span>
                </Link>
              </div>
            </div>
            
            <div className="card-background">
              <div className="bg-pattern"></div>
              <div className="soil-texture"></div>
            </div>
          </div>
       
      </div>




      <div className="substrate-grid" >
          <div className="substrate-card ">
            <div className="card-content">
            <div className="icon-container">
        <img src="/imadedetourbe/tourbeglobal.png" className="category-img" />
 
          </div>
              
              <div className="card-info">
                <h3 className="category-name">SUBSTRATS MELANGE</h3>
                <div className="product-count">
                  <span className="count">2</span>
                  <span className="count-text">Produits</span>
                </div>
                <p className="category-description">Mélanges de substrats polyvalents pour diverses applications horticoles.
                </p>
                <Link to="" className="view-products">
                  Voir les produits
                  <span className="arrow">→</span>
                </Link>
              </div>
            </div>
            
            <div className="card-background">
              <div className="bg-pattern"></div>
              <div className="soil-texture"></div>
            </div>
          </div>
       
      </div>





      <div className="substrate-grid" >
          <div className="substrate-card ">
            <div className="card-content">
            <div className="icon-container">
        <img src="/imadedetourbe/tourbeglobal.png" className="category-img" />
 
          </div>
              
              <div className="card-info">
                <h3 className="category-name">SUBSTRATS COCO</h3>
                <div className="product-count">
                  <span className="count">4</span>
                  <span className="count-text">Produits</span>
                </div>
                <p className="category-description">Substrats à base de fibre de coco, écologiques et renouvelables.
                </p>
                <Link to="" className="view-products">
                  Voir les produits
                  <span className="arrow">→</span>
                </Link>
              </div>
            </div>
            
            <div className="card-background">
              <div className="bg-pattern"></div>
              <div className="soil-texture"></div>
            </div>
          </div>
       
      </div>










      <div className="tourb-features">
        <h2 className="features-title">Pourquoi choisir nos substrats?</h2>
        
        <div className="features-grid">
          <div className="feature">
            <div className="feature-icon quality"></div>
            <h3>Qualité Premium</h3>
            <p>Nos substrats sont fabriqués à partir de matières premières soigneusement sélectionnées.</p>
          </div>
          
          <div className="feature">
            <div className="feature-icon sustainable"></div>
            <h3>Développement Durable</h3>
            <p>Nous nous engageons dans une démarche respectueuse de l'environnement.</p>
          </div>
          
          <div className="feature">
            <div className="feature-icon performance"></div>
            <h3>Performance Optimale</h3>
            <p>Formulations spécifiques pour répondre aux besoins de chaque type de culture.</p>
          </div>
        </div>
      </div>
      
      <div className="soil-particles bottom"></div>
    </div>
  )
}
