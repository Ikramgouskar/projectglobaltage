
import { useState, useEffect} from "react"
import productsData from "../../data/semences.json"

import "../../style/poiverent.css"
export default function Courgette() {
  const [poiverents, setPoiverents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)




  useEffect(() => {
    try {
      const poiverentCategory = productsData.products.find((product) => product.category === "POIVERENT")
      setPoiverents(poiverentCategory?.products || [])
      setLoading(false)
    } catch (error) {
      console.error("Error loading poiverents:", error)
      setError("Impossible de charger les données. Veuillez réessayer plus tard.")
      setLoading(false)
    }
  }, [])


 
  return (

    <div className="poiverent-container">
    <div className="poiverent-header">
      <h2 className="poiverent-title">Poiverent</h2>
      <div className="poiverent-icon">
       
      </div>
    </div>

    {loading ? (
      <div className="poiverent-loading">Chargement des produits...</div>
    ) : error ? (
      <div className="poiverent-error">{error}</div>
    ) : (
      <div className="poiverent-table-container">
        <table className="poiverent-table">
          <thead>
            <tr>
              <th>PRODUIT</th>
              <th>NOM</th>
              <th>DESCRIPTION</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {poiverents.length > 0 ? (
              poiverents.map((pastequ) => (
                <tr key={pastequ.id}>
                  <td>
                    <div className="poiverent-image-container">
                      <img
                        src={pastequ.image || "/placeholder.svg"}
                        alt={pastequ.nom}
                        className="poiverent-image"
                        onError={(e) => {
                          e.currentTarget.onerror = null
                          e.currentTarget.src = "/placeholder.svg"
                        }}
                      />
                    </div>
                  </td>
                  <td className="poiverent-name">{pastequ.nom}</td>
                  <td className="poiverent-description">{pastequ.description}</td>
                  <td>
                    <button className="poiverent-button">Ajouter</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="poiverent-empty">
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
