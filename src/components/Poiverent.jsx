
import { useState, useEffect, useRef } from "react"
import "../style/poiverent.css"
export default function Courgette() {
  const [poiverents, setPoiverents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const tableRef = useRef(null)
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

  // Animation effect - runs after component mounts and data is loaded
  useEffect(() => {
    // Only run animations when we have data and the table exists
    if (!loading && !error && poiverents.length > 0 && tableRef.current) {
      // Add animation to the table
      tableRef.current.style.animation = "tableReveal 0.8s ease-out forwards"

      // Get all table rows
      const tableRows = tableRef.current.querySelectorAll("tbody tr")

      // Add animation to each row with a delay
      tableRows.forEach((row, index) => {
        // Set a custom property for animation delay
        row.style.setProperty("--row-index", index + 1)

        // Add animation with a staggered delay
        setTimeout(
          () => {
            row.style.animation = "rowFadeIn 0.5s forwards"
          },
          100 * (index + 1),
        )
      })
    }
  }, [loading, error, poiverents])

  useEffect(() => {
    // Set loading state
    setLoading(true)
    setError(null)

    // For demo purposes, we'll use the local JSON data
    // In a real app, you would fetch from the API
    const demoData = {
      poiverents: [
        {
          id: 1,
          image: "/imagedepoiverents/poiverent1.png",
          nom: "SEMENCES POIVRON COLINA 1000 GR",
          description: "Emballage : 1000 GR Poivron doux Italien",
        },
        {
          id: 2,
          image: "/imagedepoiverents/poiverent2.png",
          nom: "SEMENCES POIVRON DOUX ITALIEN ANDALOUS",
          description: "Emballage : 1000 graines Poivron doux italien",
        },
        {
          id: 3,
          image: "/imagedepoiverents/poiverent3.png",
          nom: "SEMENCES PIMENT SAHEM",
          description: "Emballage : 2500 graines Piment fort",
        },
        {
          id: 4,
          image: "/imagedepoiverents/poiverente4.png",
          nom: "SEMENCES PIMENT SAIDAH",
          description: " Emballage : 2500 graines Piment fort",
        }
      ],
    }

    // Simulate API fetch with a timeout
    setTimeout(() => {
      try {
        setPoiverents(demoData.poiverents)
        setLoading(false)
      } catch (error) {
        console.error("Error loading poiverents:", error)
        setError("Impossible de charger les données. Veuillez réessayer plus tard.")
        setLoading(false)
      }
    }, 500)

  }, [API_URL])

  return (
    <div className="poiverent-table-container">
     <h2>Poiverent</h2>
      {loading ? (
        <div className="poiverent-loading">Chargement des produits...</div>
      ) : error ? (
        <div className="poiverent-error">{error}</div>
      ) : (
        <table className="poiverent-table" ref={tableRef}>
          <thead>
            <tr>
              <th>Produit</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {poiverents.length > 0 ? (
              poiverents.map((courgette) => (
                <tr key={courgette.id}>
                  <td>
                    <img
                      src={courgette.image || "/placeholder.svg"}
                      alt={courgette.nom}
                      className="poiverent-image"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = "/imagedepoiverents/courgette1.png" // Fallback image with correct path
                      }}
                    />
                  </td>
                  <td>{courgette.nom}</td>
                  <td>{courgette.description}</td>
                  <td>
                    <button className="poiverent-button">Ajouter</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="poiverent-empty">
                  Aucun produit disponible
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}
