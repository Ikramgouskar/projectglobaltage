
import { useState, useEffect} from "react"
import productsData from "../../data/semences.json"

import "../../style/melon.css"
export default function Melon() {
  const [melons, setMelons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)


  
  useEffect(() => {
    try {
      const melonCategory = productsData.products.find((product) => product.category === "MELONS")
      setMelons(melonCategory?.products || [])
      setLoading(false)
    } catch (error) {
      console.error("Error loading melons:", error)
      setError("Impossible de charger les données. Veuillez réessayer plus tard.")
      setLoading(false)
    }
  }, [])


  return (
    <div className="melon-container">
    <div className="melon-header">
      <h2 className="melon-title">melon</h2>
      <div className="melon-icon">
       
      </div>
    </div>

    {loading ? (
      <div className="melon-loading">Chargement des produits...</div>
    ) : error ? (
      <div className="melon-error">{error}</div>
    ) : (
      <div className="melon-table-container">
        <table className="melon-table">
          <thead>
            <tr>
              <th>PRODUIT</th>
              <th>NOM</th>
              <th>DESCRIPTION</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {melons.length > 0 ? (
              melons.map((melon) => (
                <tr key={melon.id}>
                  <td>
                    <div className="melon-image-container">
                      <img
                        src={melon.image || "/placeholder.svg"}
                        alt={melon.nom}
                        className="melon-image"
                        onError={(e) => {
                          e.currentTarget.onerror = null
                          e.currentTarget.src = "/placeholder.svg"
                        }}
                      />
                    </div>
                  </td>
                  <td className="melon-name">{melon.nom}</td>
                  <td className="melon-description">{melon.description}</td>
                  <td>
                    <button className="melon-button">Ajouter</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="melon-empty">
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
