"use client"

import { useState } from "react"
import { useCart } from "./CartSystem"
import axios from "axios"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"

export default function Panier() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCustomerInfo((prev) => ({ ...prev, [name]: value }))
  }


   const handleCheckout = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)

    try {
      // Create order object
      const order = {
        customer: customerInfo,
        products: cartItems,
        date: new Date().toISOString(),
        status: "pending",
        totalItems: cartItems.reduce((total, item) => total + item.quantity, 0),
        // Add any other relevant fields
      }

      // Post to JSON Server
      const response = await axios.post("http://localhost:3001/orders", order)
      
      // Check if the request was successful
      if (response.status === 201) {
        // Clear cart and reset form
        clearCart()
        setCustomerInfo({
          name: "",
          email: "",
          phone: "",
          address: "",
        })
        setSubmitSuccess(true)
        setIsCheckingOut(false)
      } else {
        throw new Error("Failed to save order")
      }
    } catch (error) {
      console.error("Error saving order:", error)
      setSubmitError(error.message || "Failed to save order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Styles for the cart page
  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "120px auto",
      padding: "0 20px",
    },
    title: {
      fontSize: "28px",
      marginBottom: "30px",
      color: "#3c4a3e",
      textAlign: "center",
    },
    content: {
      display: "grid",
      gridTemplateColumns: "1fr 350px",
      gap: "30px",
    },
    items: {
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
      overflow: "hidden",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    tableHeader: {
      backgroundColor: "#f9f9f9",
      padding: "15px",
      textAlign: "left",
      fontWeight: "600",
      color: "#3c4a3e",
      borderBottom: "1px solid #eee",
    },
    tableCell: {
      padding: "15px",
      borderBottom: "1px solid #eee",
      verticalAlign: "middle",
    },
    productImage: {
      width: "80px",
    },
    productImageImg: {
      width: "70px",
      height: "70px",
      objectFit: "cover",
      borderRadius: "4px",
      backgroundColor: "#f9f9f9",
    },
    productName: {
      fontWeight: "500",
      color: "#333",
    },
    quantityControl: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    quantityBtn: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "28px",
      height: "28px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      backgroundColor: "white",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    quantityValue: {
      fontWeight: "500",
      minWidth: "30px",
      textAlign: "center",
    },
    removeBtn: {
      background: "none",
      border: "none",
      color: "#e53e3e",
      cursor: "pointer",
      padding: "5px",
      borderRadius: "4px",
      transition: "background-color 0.2s",
    },
    summary: {
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
      padding: "20px",
      position: "sticky",
      top: "20px",
      height: "fit-content",
    },
    summaryTitle: {
      fontSize: "18px",
      marginBottom: "20px",
      color: "#3c4a3e",
      paddingBottom: "10px",
      borderBottom: "1px solid #eee",
    },
    summaryItems: {
      marginBottom: "20px",
    },
    summaryRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "10px",
      fontSize: "15px",
      color: "#555",
    },
    summaryRowTotal: {
      fontWeight: "600",
      fontSize: "18px",
      color: "#3c4a3e",
      marginTop: "15px",
      paddingTop: "15px",
      borderTop: "1px solid #eee",
    },
    checkoutBtn: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#4caf50",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s",
    },
    checkoutForm: {
      marginTop: "20px",
    },
    formTitle: {
      fontSize: "16px",
      marginBottom: "15px",
      color: "#3c4a3e",
    },
    formGroup: {
      marginBottom: "15px",
    },
    formLabel: {
      display: "block",
      marginBottom: "5px",
      fontSize: "14px",
      color: "#555",
    },
    formInput: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
    },
    formTextarea: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "14px",
      height: "80px",
      resize: "vertical",
    },
    checkoutActions: {
      display: "flex",
      gap: "10px",
      marginTop: "20px",
    },
    cancelBtn: {
      flex: "1",
      padding: "10px",
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s",
      backgroundColor: "#f5f5f5",
      border: "1px solid #ddd",
      color: "#555",
    },
    submitBtn: {
      flex: "1",
      padding: "10px",
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s",
      backgroundColor: "#4caf50",
      border: "none",
      color: "white",
    },
    emptyCart: {
      textAlign: "center",
      padding: "150px 20px",
      color: "#666",
    },
    emptyCartIcon: {
      color: "#ccc",
      marginBottom: "20px",
    },
    emptyCartTitle: {
      fontSize: "24px",
      marginBottom: "10px",
      color: "#3c4a3e",
    },
    emptyCartText: {
      marginBottom: "30px",
    },
    continueShoppingLink: {
      display: "inline-block",
      padding: "12px 24px",
      backgroundColor: "#4caf50",
      color: "white",
      textDecoration: "none",
      borderRadius: "6px",
      fontWeight: "500",
      transition: "background-color 0.2s",
    },
  }

  if (cartItems.length === 0) {
    return (
      <div style={styles.emptyCart}>
        <ShoppingBag size={64} style={styles.emptyCartIcon} />
        <h2 style={styles.emptyCartTitle}>Votre panier est vide</h2>
        <p style={styles.emptyCartText}>Ajoutez des produits à votre panier pour passer commande.</p>
        <a
          href="/engrai"
          style={styles.continueShoppingLink}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#3d9140")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}
        >
          Continuer vos achats
        </a>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Votre Panier</h1>

      <div style={styles.content}>
        <div style={styles.items}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Produit</th>
                <th style={styles.tableHeader}>Nom</th>
                <th style={styles.tableHeader}>Quantité</th>
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td style={{ ...styles.tableCell, ...styles.productImage }}>
                    <img src={item.image || "/placeholder.svg"} alt={item.nom} style={styles.productImageImg} />
                  </td>
                  <td style={{ ...styles.tableCell, ...styles.productName }}>{item.nom}</td>
                  <td style={styles.tableCell}>
                    <div style={styles.quantityControl}>
                      <button
                        style={styles.quantityBtn}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Diminuer la quantité"
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
                      >
                        <Minus size={16} />
                      </button>
                      <span style={styles.quantityValue}>{item.quantity}</span>
                      <button
                        style={styles.quantityBtn}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Augmenter la quantité"
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </td>
                  <td style={styles.tableCell}>
                    <button
                      style={styles.removeBtn}
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Supprimer du panier"
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(229, 62, 62, 0.1)")}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={styles.summary}>
          <h2 style={styles.summaryTitle}>Résumé de la commande</h2>
          <div style={styles.summaryItems}>
            <div style={styles.summaryRow}>
              <span>Nombre d'articles:</span>
              <span>{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
            </div>
            <div style={{ ...styles.summaryRow, ...styles.summaryRowTotal }}>
              <span>Total:</span>
              <span>Sur devis</span>
            </div>
          </div>

          {!isCheckingOut ? (
            <button
              style={styles.checkoutBtn}
              onClick={() => setIsCheckingOut(true)}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#3d9140")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}
            >
              Demander un devis
            </button>
          ) : (
            <form style={styles.checkoutForm} onSubmit={handleCheckout}>
              <h3 style={styles.formTitle}>Vos informations</h3>

              <div style={styles.formGroup}>
                <label htmlFor="name" style={styles.formLabel}>
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  required
                  style={styles.formInput}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.formLabel}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  required
                  style={styles.formInput}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="phone" style={styles.formLabel}>
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  required
                  style={styles.formInput}
                />
              </div>

              <div style={styles.formGroup}>
                <label htmlFor="address" style={styles.formLabel}>
                  Adresse
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  required
                  style={styles.formTextarea}
                />
              </div>

              <div style={styles.checkoutActions}>
                <button
                  type="button"
                  style={styles.cancelBtn}
                  onClick={() => setIsCheckingOut(false)}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#eee")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f5f5f5")}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  style={styles.submitBtn}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#3d9140")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}
                >
                  Envoyer la demande
                </button>
              </div>
              {submitError && (
                <div style={{ 
                  color: "#e53e3e",
                  marginBottom: "15px",
                  padding: "10px",
                  backgroundColor: "#fff5f5",
                  borderRadius: "4px"
                }}>
                  {submitError}
                </div>
              )}

              {submitSuccess && (
                <div style={{ 
                  color: "#38a169",
                  marginBottom: "15px",
                  padding: "10px",
                  backgroundColor: "#f0fff4",
                  borderRadius: "4px"
                }}>
                  Order submitted successfully!
                </div>
              )}

              
            </form>

            
          )}
          
        </div>
      </div>
    </div>
  )
}
