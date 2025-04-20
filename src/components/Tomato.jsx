"use client"

import { useEffect, useState } from "react"
import productsData from "../data/semences.json"
export default function Home() {
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
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h2 style={{
        fontSize: '1.875rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
        textAlign: 'center'
      }}>Tomate</h2>
      
      {loading ? (
        <div style={{
          padding: '2rem',
          textAlign: 'center'
        }}>Chargement des produits...</div>
      ) : error ? (
        <div style={{
          color: '#ef4444',
          padding: '2rem',
          textAlign: 'center'
        }}>{error}</div>
      ) : (
        <div style={{
          overflowX: 'auto',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: 'white'
          }}>
            <thead>
              <tr style={{
                backgroundColor: '#f3f4f6',
                textAlign: 'left'
              }}>
                <th style={{
                  padding: '1rem',
                  borderBottom: '1px solid #e5e7eb'
                }}>Produit</th>
                <th style={{
                  padding: '1rem',
                  borderBottom: '1px solid #e5e7eb'
                }}>Nom</th>
                <th style={{
                  padding: '1rem',
                  borderBottom: '1px solid #e5e7eb'
                }}>Description</th>
                <th style={{
                  padding: '1rem',
                  borderBottom: '1px solid #e5e7eb'
                }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {tomates.length > 0 ? (
                tomates.map((tomate) => (
                  <tr key={tomate.id} style={{
                    borderBottom: '1px solid #e5e7eb',
                    '&:hover': {
                      backgroundColor: '#f9fafb'
                    }
                  }}>
                    <td style={{
                      padding: '1rem'
                    }}>
                      <div style={{
                        width: '100px',
                        height: '100px'
                      }}>
                        <img
                          src={tomate.image || "/placeholder.svg"}
                          alt={tomate.nom}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '0.25rem'
                          }}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/placeholder.svg";
                          }}
                        />
                      </div>
                    </td>
                    <td style={{
                      padding: '1rem',
                      fontWeight: '500'
                    }}>{tomate.nom}</td>
                    <td style={{
                      padding: '1rem',
                      color: '#4b5563'
                    }}>{tomate.description}</td>
                    <td style={{
                      padding: '1rem'
                    }}>
                      <button style={{
                        backgroundColor: '#3b82f6',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.375rem',
                        border: 'none',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#2563eb'
                        }
                      }}>
                        Ajouter
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{
                    padding: '2rem',
                    textAlign: 'center'
                  }}>
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
