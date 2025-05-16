

import { useEffect, useState } from "react"
import axios from "axios"
import { CheckCircle2, Clock, XCircle, Calendar, Package } from "lucide-react"
import "../style/order.css"

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3001/orders")
        setOrders(response.data)
      } catch (err) {
        setError("Failed to fetch orders")
        console.error("Error fetching orders:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:3001/orders/${orderId}`, {
        status: newStatus,
      })

      // Update local state
      setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
    } catch (err) {
      console.error("Error updating order status:", err)
    }
  }

  if (loading) return <div className="loading-state">Loading orders...</div>
  if (error) return <div className="error-state">{error}</div>
  if (orders.length === 0) return <div className="empty-state">No orders found</div>

  return (
    <div className="orders-container">
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th className="orders-table-header">Order ID</th>
              <th className="orders-table-header">Customer</th>
              <th className="orders-table-header">Products</th>
              <th className="orders-table-header">Date</th>
              <th className="orders-table-header">Status</th>
              <th className="orders-table-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="orders-table-cell">
                  <div className="order-id">{order.id}</div>
                </td>
                <td className="orders-table-cell">
                  <div className="customer-info">
                    <div className="customer-name">{order.customer.name}</div>
                    <div className="customer-detail">{order.customer.email}</div>
                    <div className="customer-detail">{order.customer.phone}</div>
                    <div className="customer-detail">{order.customer.address}</div>
                  </div>
                </td>
                <td className="orders-table-cell">
                  {order.products.map((product) => (
                    <div key={product.id} className="product-container">
                      <img
                        src={product.image || "/placeholder.svg?height=60&width=60"}
                        className="product-image"
                        alt={product.nom}
                      />
                      <div className="product-details">
                        <div className="product-name">{product.nom}</div>
                        <div className="product-meta">
                          <div className="meta-item">
                            <Package size={14} className="meta-icon" />
                            <span className="meta-label">Qty:</span>
                            <span className="meta-value">{product.quantity}</span>
                          </div>
                          <div className="meta-item">
                            <span className="meta-label">Category:</span>
                            <span className="meta-value">{product.category}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="total-items">Total Items: {order.totalItems}</div>
                </td>
                <td className="orders-table-cell">
                  <div className="order-date">
                    <Calendar size={16} className="date-icon" />
                    {new Date(order.date).toLocaleString()}
                  </div>
                </td>
                <td className="orders-table-cell">
                  {order.status === "pending" && (
                    <div className="status status-pending">
                      <Clock size={16} /> Pending
                    </div>
                  )}
                  {order.status === "completed" && (
                    <div className="status status-completed">
                      <CheckCircle2 size={16} /> Completed
                    </div>
                  )}
                  {order.status === "cancelled" && (
                    <div className="status status-cancelled">
                      <XCircle size={16} /> Cancelled
                    </div>
                  )}
                </td>
                <td className="orders-table-cell">
                  {order.status === "pending" && (
                    <div className="action-buttons">
                      <button
                        className="action-button complete-button"
                        onClick={() => updateOrderStatus(order.id, "completed")}
                      >
                        <CheckCircle2 size={16} /> Complete
                      </button>
                      <button
                        className="action-button cancel-button"
                        onClick={() => updateOrderStatus(order.id, "cancelled")}
                      >
                        <XCircle size={16} /> Cancel
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
