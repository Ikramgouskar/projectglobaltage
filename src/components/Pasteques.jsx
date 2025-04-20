
import { useState, useEffect, useRef } from "react"
import "../style/pasteques.css"
export default function Pasteques() {
  const [pasteques, setPasteques] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const tableRef = useRef(null)
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

  // Animation effect - runs after component mounts and data is loaded
  useEffect(() => {
    // Only run animations when we have data and the table exists
    if (!loading && !error && pasteques.length > 0 && tableRef.current) {
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
  }, [loading, error, pasteques])

  useEffect(() => {
    // Set loading state
    setLoading(true)
    setError(null)

    // For demo purposes, we'll use the local JSON data
    // In a real app, you would fetch from the API
    const demoData = {
      pasteques: [
        {
          id: 1,
          image: "/imgedepasteque/pasteque1.png",
          nom: "SEMENCES PASTEQUE DALLAS 1000 GRAINES",
          description: "Emballage : 1000 GR Pastèque Crimson",
        },
        {
          id: 2,
          image: "/imgedepasteque/pasteque2.png",
          nom: "Emballage : 1000 GR Pastèque Crimson",
          description: "Emballage : 1000 graines Pastèque Crimson",
        }
      ],
    }

    // Simulate API fetch with a timeout
    setTimeout(() => {
      try {
        setPasteques(demoData.pasteques)
        setLoading(false)
      } catch (error) {
        console.error("Error loading pasteques:", error)
        setError("Impossible de charger les données. Veuillez réessayer plus tard.")
        setLoading(false)
      }
    }, 500)

  }, [API_URL])

  return (
    <div className="pasteque-table-container">
        <h2>Pasteque</h2>
      {loading ? (
        <div className="pasteque-loading">Chargement des produits...</div>
      ) : error ? (
        <div className="pasteque-error">{error}</div>
      ) : (
        <table className="pasteque-table" ref={tableRef}>
          <thead>
            <tr>
              <th>Produit</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pasteques.length > 0 ? (
              pasteques.map((pasteque) => (
                <tr key={pasteque.id}>
                  <td>
                    <img
                      src={pasteque.image || "/placeholder.svg"}
                      alt={pasteque.nom}
                      className="pasteque-image"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = "/imagedepasteques/pasteque1.png" // Fallback image with correct path
                      }}
                    />
                  </td>
                  <td>{pasteque.nom}</td>
                  <td>{pasteque.description}</td>
                  <td>
                    <button className="pasteque-button">Ajouter</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="pasteque-empty">
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
