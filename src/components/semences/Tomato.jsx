
import { useEffect, useState } from "react"
import productsData from "../../data/semences.json"
import "../../style/tomate.css"

export default function Tomato() {
  const [tomates, setTomates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      const tomatoCategory = productsData.products.find((product) => product.category === "TOMATES")
      setTomates(tomatoCategory?.products || [])
      setLoading(false)
    } catch (error) {
      console.error("Error loading tomatoes:", error)
      setError("Impossible de charger les données. Veuillez réessayer plus tard.")
      setLoading(false)
    }
  }, [])

  return (
    <div className="tomato-container">
      <div className="tomato-header">
        <h2 className="tomato-title">Tomate</h2>
        <div className="tomato-icon">
         
        </div>
      </div>

      {loading ? (
        <div className="tomato-loading">Chargement des produits...</div>
      ) : error ? (
        <div className="tomato-error">{error}</div>
      ) : (
        <div className="tomato-table-container">
          <table className="tomato-table">
            <thead>
              <tr>
                <th>PRODUIT</th>
                <th>NOM</th>
                <th>DESCRIPTION</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {tomates.length > 0 ? (
                tomates.map((tomate) => (
                  <tr key={tomate.id}>
                    <td>
                      <div className="tomato-image-container">
                        <img
                          src={tomate.image || "/placeholder.svg"}
                          alt={tomate.nom}
                          className="tomato-image"
                          onError={(e) => {
                            e.currentTarget.onerror = null
                            e.currentTarget.src = "/placeholder.svg"
                          }}
                        />
                      </div>
                    </td>
                    <td className="tomato-name">{tomate.nom}</td>
                    <td className="tomato-description">{tomate.description}</td>
                    <td>
                      <button className="tomato-button">Ajouter</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="tomato-empty">
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
