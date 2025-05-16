

import { createContext, useContext, useState, useEffect } from "react"
import { ShoppingCart } from "lucide-react"

// ==================== CART CONTEXT ====================

// Create a context for the cart
const CartContext = createContext()

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext)
  return context // This will be undefined if used outside a CartProvider
}

// Cart provider component
export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage or empty array
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart")
      return savedCart ? JSON.parse(savedCart) : []
    }
    return []
  })

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cartItems))
    }
  }, [cartItems])

  // Add item to cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Check if item already exists in cart
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        // If item exists, increase quantity
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        // If item doesn't exist, add it with quantity 1
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
  }

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCartItems((prevItems) => prevItems.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([])
  }

  // Get total number of items in cart
  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  // Calculate total price
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      // If the item has a price, use it, otherwise default to 0
      const price = item.price || 0
      return total + price * item.quantity
    }, 0)
  }

  // Context value
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartCount,
    getCartTotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// ==================== CART ICON COMPONENT ====================

export const CartIcon = () => {
  const cart = useContext(CartContext)
  const [showPreview, setShowPreview] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const isCartAvailable = cart !== undefined
  const cartItems = isCartAvailable ? cart.cartItems : []
  const count = isCartAvailable ? cart.getCartCount() : 0

  useEffect(() => {
    setIsMounted(true)
  }, [])

  
  const styles = {
    container: {
      position: "relative",
    },
    button: {
      background: "none",
      border: "none",
      cursor: "pointer",
      position: "relative",
      color: "#3c4a3e",
      padding: "8px",
      borderRadius: "50%",
      transition: "background-color 0.2s",
    },
    buttonHover: {
      backgroundColor: "rgba(76, 175, 80, 0.1)",
    },
    count: {
      position: "absolute",
      top: "0",
      right: "0",
      backgroundColor: "#4caf50",
      color: "white",
      fontSize: "12px",
      fontWeight: "bold",
      height: "18px",
      width: "18px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
    },
    preview: {
      position: "absolute",
      top: "100%",
      right: "0",
      width: "300px",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      zIndex: "100",
      padding: "16px",
      marginTop: "8px",
    },
    previewTitle: {
      margin: "0 0 12px 0",
      fontSize: "16px",
      color: "#3c4a3e",
    },
    previewItems: {
      listStyle: "none",
      padding: "0",
      margin: "0",
      maxHeight: "250px",
      overflowY: "auto",
    },
    previewItem: {
      display: "flex",
      alignItems: "center",
      padding: "8px 0",
      borderBottom: "1px solid #f0f0f0",
    },
    previewImage: {
      width: "40px",
      height: "40px",
      borderRadius: "4px",
      overflow: "hidden",
      marginRight: "12px",
      backgroundColor: "#f9f9f9",
    },
    previewImageImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    previewDetails: {
      flex: "1",
      display: "flex",
      flexDirection: "column",
    },
    previewName: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#333",
    },
    previewQuantity: {
      fontSize: "12px",
      color: "#666",
      marginTop: "2px",
    },
    previewMore: {
      textAlign: "center",
      padding: "8px 0",
      fontSize: "13px",
      color: "#666",
      fontStyle: "italic",
    },
    previewActions: {
      marginTop: "12px",
      display: "flex",
      justifyContent: "flex-end",
    },
    previewLink: {
      display: "inline-block",
      padding: "8px 16px",
      backgroundColor: "#4caf50",
      color: "white",
      textDecoration: "none",
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "500",
      transition: "background-color 0.2s",
    },
    previewLinkHover: {
      backgroundColor: "#3d9140",
    },
  }

  if (!isCartAvailable) {
    console.error("CartIcon must be used within a CartProvider")
    return null // Or return a non-functional version of the icon
  }

  return (
    <div style={styles.container}>
      <button
        style={styles.button}
        onClick={() => setShowPreview(!showPreview)}
        aria-label="Shopping cart"
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "rgba(76, 175, 80, 0.1)")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "")}
      >
        <ShoppingCart size={24} />
        {count > 0 && <span style={styles.count}>{count}</span>}
      </button>

      {isMounted && showPreview && count > 0 && (
        <div style={styles.preview}>
          <h3 style={styles.previewTitle}>Panier ({count})</h3>
          <ul style={styles.previewItems}>
            {cartItems.slice(0, 3).map((item) => (
              <li key={item.id} style={styles.previewItem}>
                <div style={styles.previewImage}>
                  <img src={item.image || "/placeholder.svg"} alt={item.nom} style={styles.previewImageImg} />
                </div>
                <div style={styles.previewDetails}>
                  <span style={styles.previewName}>{item.nom}</span>
                  <span style={styles.previewQuantity}>Qté: {item.quantity}</span>
                </div>
              </li>
            ))}
            {cartItems.length > 3 && <li style={styles.previewMore}>+{cartItems.length - 3} autres produits</li>}
          </ul>
          <div style={styles.previewActions}>
            <a
              href="/panier"
              style={styles.previewLink}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#3d9140")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}
            >
              Voir le panier
            </a>
          </div>
        </div>
      )}
    </div>
  )
}


