
import { useState, useEffect, useRef } from "react"
import "../style/corgette.css"
export default function Courgette() {
  const [courgettes, setCourgettes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const tableRef = useRef(null)
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

  // Animation effect - runs after component mounts and data is loaded
  useEffect(() => {
    // Only run animations when we have data and the table exists
    if (!loading && !error && courgettes.length > 0 && tableRef.current) {
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
  }, [loading, error, courgettes])

  useEffect(() => {
    // Set loading state
    setLoading(true)
    setError(null)

    // For demo purposes, we'll use the local JSON data
    // In a real app, you would fetch from the API
    const demoData = {
      courgettes: [
        {
          id: 1,
          image: "/imagedecourgettes/corgete1.png",
          nom: "SEMENCES COURGETTES DIKRA F1",
          description: "Emballage : 1000 Graines Courgette blanche",
        },
        {
          id: 2,
          image: "/imagedecourgettes/corgete2.png",
          nom: "SEMENCES COURGETTE DONATELLO 1000 GR",
          description: "Emballage : 1000 GR Courgette noire plein champs",
        },
        {
          id: 3,
          image: "/imagedecourgettes/corgete3.png",
          nom: "SEMENCES COURGETTE NOIRE NAXOS",
          description: "Emballage : 1000 graines Courgette noire plein champs",
        },
        {
          id: 4,
          image: "/imagedecourgettes/corgete4.png",
          nom: "SEMENCES COURGETTE RAFAELLO 1000 GR",
          description: " Emballage : 1000 GR Courgette noire serres",
        },
        {
          id: 5,
          image: "/imagedecourgettes/corgete5.png",
          nom: "SEMENCES COURGETTE ENIGMA 1000 GR",
          description: "Emballage : 1000 GR Courgette blanche",
        },

        {
            id: 6,
            image: "/imagedecourgettes/corgete6.png",
            nom: "SEMENCES COURGETTE ALMAS F1 GR",
            description: "Emballage : 1000 GR Courgette blanche",
          }
      ],
    }

    // Simulate API fetch with a timeout
    setTimeout(() => {
      try {
        setCourgettes(demoData.courgettes)
        setLoading(false)
      } catch (error) {
        console.error("Error loading courgettes:", error)
        setError("Impossible de charger les données. Veuillez réessayer plus tard.")
        setLoading(false)
      }
    }, 500)

  }, [API_URL])

  return (
    <div className="corgette-table-container">
       <h2>Courgette</h2>
      {loading ? (
        <div className="corgette-loading">Chargement des produits...</div>
      ) : error ? (
        <div className="corgette-error">{error}</div>
      ) : (
        <table className="corgette-table" ref={tableRef}>
          <thead>
            <tr>
              <th>Produit</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {courgettes.length > 0 ? (
              courgettes.map((courgette) => (
                <tr key={courgette.id}>
                  <td>
                    <img
                      src={courgette.image || "/placeholder.svg"}
                      alt={courgette.nom}
                      className="corgette-image"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = "/imagedecourgettes/courgette1.png" // Fallback image with correct path
                      }}
                    />
                  </td>
                  <td>{courgette.nom}</td>
                  <td>{courgette.description}</td>
                  <td>
                    <button className="corgette-button">Ajouter</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="corgette-empty">
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
