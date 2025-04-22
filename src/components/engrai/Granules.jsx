
import { useEffect, useState } from "react"
import productsData from "../../data/engrais.json"
import "../../style/engraissoluble.css"

export default function Granules() {
  const [granules, setEgranules] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      const engraisCategory = productsData.products.find((product) => product.category === "NPKGRANULES")
      setEgranules(engraisCategory?.products || [])
      setLoading(false)
    } catch (error) {
      console.error("Error loading engraises:", error)
      setError("Impossible de charger les données. Veuillez réessayer plus tard.")
      setLoading(false)
    }
  }, [])

  return (
    <div className="engrais-container">
      <div className="engrais-header">
        <h2 className="engrais-title">Engrais soluble</h2>
        <div className="engrais-icon">
         
        </div>
      </div>

      {loading ? (
        <div className="engrais-loading">Chargement des produits...</div>
      ) : error ? (
        <div className="engrais-error">{error}</div>
      ) : (
        <div className="engrais-table-container">
          <table className="engrais-table">
            <thead>
              <tr>
                <th>PRODUIT</th>
                <th>NOM</th>
                <th>DESCRIPTION</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {granules.length > 0 ? (
                granules.map((tomate) => (
                  <tr key={tomate.id}>
                    <td>
                      <div className="engrais-image-container">
                        <img
                          src={tomate.image || "/placeholder.svg"}
                          alt={tomate.nom}
                          className="engrais-image"
                          onError={(e) => {
                            e.currentTarget.onerror = null
                            e.currentTarget.src = "/placeholder.svg"
                          }}
                        />
                      </div>
                    </td>
                    <td className="engrais-name">{tomate.nom}</td>
                    <td className="engrais-description">{tomate.description}</td>
                    <td>
                      <button className="engrais-button">Ajouter</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="engrais-empty">
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
