import productsData from "../../data/semences.json"
import "../../style/pasteques.css"
import { useState, useEffect } from "react"
export default function Pasteques() {
  const [pasteques, setPasteques] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
 
   


  useEffect(() => {
    try {
      const pastequeCategory = productsData.products.find((product) => product.category === "PASTEQUES")
      setPasteques(pastequeCategory?.products || [])
      setLoading(false)
    } catch (error) {
      console.error("Error loading pasteques:", error)
      setError("Impossible de charger les données. Veuillez réessayer plus tard.")
      setLoading(false)
    }
  }, [])



  return (
    <div className="pasteque-container">
      <div className="pasteque-header">
        <h2 className="pasteque-title">pasteque</h2>
        <div className="pasteque-icon">
         
        </div>
      </div>

      {loading ? (
        <div className="pasteque-loading">Chargement des produits...</div>
      ) : error ? (
        <div className="pasteque-error">{error}</div>
      ) : (
        <div className="pasteque-table-container">
          <table className="pasteque-table">
            <thead>
              <tr>
                <th>PRODUIT</th>
                <th>NOM</th>
                <th>DESCRIPTION</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {pasteques.length > 0 ? (
                pasteques.map((pastequ) => (
                  <tr key={pastequ.id}>
                    <td>
                      <div className="pasteque-image-container">
                        <img
                          src={pastequ.image || "/placeholder.svg"}
                          alt={pastequ.nom}
                          className="pasteque-image"
                          onError={(e) => {
                            e.currentTarget.onerror = null
                            e.currentTarget.src = "/placeholder.svg"
                          }}
                        />
                      </div>
                    </td>
                    <td className="pasteque-name">{pastequ.nom}</td>
                    <td className="pasteque-description">{pastequ.description}</td>
                    <td>
                      <button className="pasteque-button">Ajouter</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="pasteque-empty">
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
