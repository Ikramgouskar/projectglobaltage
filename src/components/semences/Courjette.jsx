
import { useState, useEffect} from "react"
import productsData from "../../data/semences.json"
import "../../style/corgette.css"
export default function Courjette() {
  const [corgettes, setCorgettes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)




  useEffect(() => {
    try {
      const corgetteCategory = productsData.products.find((product) => product.category === "COURGETTES")
      setCorgettes(corgetteCategory?.products || [])
      setLoading(false)
    } catch (error) {
      console.error("Error loading corgettes:", error)
      setError("Impossible de charger les données. Veuillez réessayer plus tard.")
      setLoading(false)
    }
  }, [])



  return (
    
      <div className="corgette-container">
        <div className="corgette-header">
          <h2 className="corgette-title">corgette</h2>
          <div className="corgette-icon">
           
          </div>
        </div>
  
        {loading ? (
          <div className="corgette-loading">Chargement des produits...</div>
        ) : error ? (
          <div className="corgette-error">{error}</div>
        ) : (
          <div className="corgette-table-container">
            <table className="corgette-table">
              <thead>
                <tr>
                  <th>PRODUIT</th>
                  <th>NOM</th>
                  <th>DESCRIPTION</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {corgettes.length > 0 ? (
                  corgettes.map((corgette) => (
                    <tr key={corgette.id}>
                      <td>
                        <div className="corgette-image-container">
                          <img
                            src={corgette.image || "/placeholder.svg"}
                            alt={corgette.nom}
                            className="corgette-image"
                            onError={(e) => {
                              e.currentTarget.onerror = null
                              e.currentTarget.src = "/placeholder.svg"
                            }}
                          />
                        </div>
                      </td>
                      <td className="corgette-name">{corgette.nom}</td>
                      <td className="corgette-description">{corgette.description}</td>
                      <td>
                        <button className="corgette-button">Ajouter</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="corgette-empty">
                      Aucun produit disponible
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
}
