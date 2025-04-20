
import { useState, useEffect, useRef } from "react"
import "../style/melon.css"
export default function Melon() {
  const [melons, setMelons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const tableRef = useRef(null)
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

  // Animation effect - runs after component mounts and data is loaded
  useEffect(() => {
    // Only run animations when we have data and the table exists
    if (!loading && !error && melons.length > 0 && tableRef.current) {
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
  }, [loading, error, melons])

  useEffect(() => {
    // Set loading state
    setLoading(true)
    setError(null)

    // For demo purposes, we'll use the local JSON data
    // In a real app, you would fetch from the API
    const demoData = {
      melons: [
        {
          id: 1,
          image: "/imgedemelon/melon1.png",
          nom: "SEMENCES MELON GARONA",
          description: "Emballage : 1000 Gaines Melon charantais",
        },
        {
          id: 2,
          image: "/imgedemelon/melon2.png",
          nom: "SEMENCES MELON CALISTA 1000 GRAINES",
          description: "Emballage : 1000 GR Melon Galia",
        }
        ,
        {
          id: 3,
          image: "/imgedemelon/melon3.png",
          nom: "SEMENCES MELON NAJMA 1000 GR",
          description: "Emballage : 1000 GR Melon jaune (précoce)",
        }
        ,
        {
          id: 4,
          image: "/imgedemelon/melon4.png",
          nom: "SEMENCES MELON CALISTA 1000 GRAINES",
          description: "Emballage : 1000 GR Melon Galia",
        }
      ],
    }

    // Simulate API fetch with a timeout
    setTimeout(() => {
      try {
        setMelons(demoData.melons)
        setLoading(false)
      } catch (error) {
        console.error("Error loading melons:", error)
        setError("Impossible de charger les données. Veuillez réessayer plus tard.")
        setLoading(false)
      }
    }, 500)

  }, [API_URL])

  return (
    <div className="melon-table-container"> <h2>Mellon</h2>
      {loading ? (
        <div className="melon-loading">Chargement des produits...</div>
      ) : error ? (
        <div className="melon-error">{error}</div>
      ) : (
        <table className="melon-table" ref={tableRef}>
          <thead>
            <tr>
              <th>Produit</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {melons.length > 0 ? (
              melons.map((melon) => (
                <tr key={melon.id}>
                  <td>
                    <img
                      src={melon.image || "/placeholder.svg"}
                      alt={melon.nom}
                      className="melon-image"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = "/imagedemelons/melon1.png" // Fallback image with correct path
                      }}
                    />
                  </td>
                  <td>{melon.nom}</td>
                  <td>{melon.description}</td>
                  <td>
                    <button className="melon-button">Ajouter</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="melon-empty">
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
