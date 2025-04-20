

import "../style/tomate.css"
import { useState, useEffect, useRef } from "react"

export default function Tomato() {
  const [tomates, setTomates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const tableRef = useRef(null)
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

  // Animation effect - runs after component mounts and data is loaded
  useEffect(() => {
    // Only run animations when we have data and the table exists
    if (!loading && !error && tomates.length > 0 && tableRef.current) {
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
  }, [loading, error, tomates])

  useEffect(() => {
    // Set loading state
    setLoading(true)
    setError(null)

    // For demo purposes, we'll use the local JSON data
    // In a real app, you would fetch from the API
    const demoData = {
      tomates: [
        {
          id: 1,
          image: "/imagedetomate/tomate1.png",
          nom: "SEMENCES TOMATE ARENA F1",
          description: "Emballage : 1000 Graines, Tomate Calibre 2 - Sous Serre",
        },
        {
          id: 2,
          image: "/imagedetomate/tomate2.png",
          nom: "TOMATE RONDE CLASSIQUE",
          description: "Sachet de 500 graines",
        },
        {
          id: 3,
          image: "/imagedetomate/tomate3.png",
          nom: "TOMATE CERISE ROUGE",
          description: "Sachet de 250 graines, Idéal pour les salades",
        },
        {
          id: 4,
          image: "/imagedetomate/tomate4.png",
          nom: "TOMATE COEUR DE BOEUF",
          description: "Emballage : 500 Graines, Variété ancienne charnue",
        },
        {
          id: 5,
          image: "/imagedetomate/tomate5.png",
          nom: "TOMATE SAN MARZANO",
          description: "Sachet de 300 graines, Parfaite pour les sauces",
        },
      ],
    }

    // Simulate API fetch with a timeout
    setTimeout(() => {
      try {
        setTomates(demoData.tomates)
        setLoading(false)
      } catch (error) {
        console.error("Error loading tomatoes:", error)
        setError("Impossible de charger les données. Veuillez réessayer plus tard.")
        setLoading(false)
      }
    }, 500)

  }, [API_URL])

  return (
    <div className="tomato-table-container">
      <h2>Tomate</h2>
      {loading ? (
        <div className="tomato-loading">Chargement des produits...</div>
      ) : error ? (
        <div className="tomato-error">{error}</div>
      ) : (
        <table className="tomato-table" ref={tableRef}>
          <thead>
            <tr>
              <th>Produit</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tomates.length > 0 ? (
              tomates.map((tomate) => (
                <tr key={tomate.id}>
                  <td>
                    <img
                      src={tomate.image || "/placeholder.svg"}
                      alt={tomate.nom}
                      className="tomato-image"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = "/imagedetomate/tomate1.png" // Fallback image with correct path
                      }}
                    />
                  </td>
                  <td>{tomate.nom}</td>
                  <td>{tomate.description}</td>
                  <td>
                    <button className="tomato-button">Ajouter</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="tomato-empty">
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
