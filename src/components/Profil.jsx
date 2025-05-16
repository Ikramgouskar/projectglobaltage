"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "../style/profil.css"

export default function Profil() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "Admin",
    avatar: "",
    username: "",
    joinDate: "",
    lastLogin: "",
    phone: "",
    address: "",
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch user data from localStorage
    const fetchUserData = () => {
      try {
        // Get the username from userlogin
        const username = localStorage.getItem("userlogin")

        // Get admin details from currentAdmin
        const currentAdminData = localStorage.getItem("currentAdmin")

        if (username && currentAdminData) {
          const adminData = JSON.parse(currentAdminData)

          // Set user data from the admin information
          setUserData({
            name: adminData.fullName || "Admin User",
            email: adminData.email || "admin@example.com",
            role: "Admin",
            username: username,
            avatar: adminData.avatar || "/default-avatar.png",
            joinDate: formatDate(adminData.joinDate) || new Date().toLocaleDateString(),
            lastLogin: formatDate(adminData.lastLogin) || new Date().toLocaleDateString(),
            phone: adminData.phone || "Not provided",
            address: adminData.address || "Not provided",
          })
        } else if (username) {
          // Fallback if we only have the username but no details
          // Check if this is a registered admin
          const registeredAdmins = JSON.parse(localStorage.getItem("registeredAdmins")) || []
          const adminInfo = registeredAdmins.find((admin) => admin.username === username)

          if (adminInfo) {
            setUserData({
              name: adminInfo.fullName || username,
              email: adminInfo.email || "admin@example.com",
              role: "Admin",
              username: username,
              avatar: adminInfo.avatar || "/default-avatar.png",
              joinDate: formatDate(adminInfo.joinDate) || new Date().toLocaleDateString(),
              lastLogin: formatDate(adminInfo.lastLogin) || new Date().toLocaleDateString(),
              phone: adminInfo.phone ,
              address: adminInfo.address || "Not provided",
            })
          } else {
            // If it's the hardcoded admin
            if (username === "ikramgouskar") {
              setUserData({
                name: "Ikram Gouskar",
                email: "admin@unique.com",
                role: "Admin",
                username: username,
                avatar: "/default-avatar.png",
                joinDate: new Date().toLocaleDateString(),
                lastLogin: new Date().toLocaleDateString(),
                phone: "0659873643",
                address: "Not provided",
              })
            } else {
              // Generic fallback
              setUserData({
                name: username,
                email: "admin@example.com",
                role: "Admin",
                username: username,
                avatar: "/default-avatar.png",
                joinDate: new Date().toLocaleDateString(),
                lastLogin: new Date().toLocaleDateString(),
                phone: "Not provided",
                address: "Not provided",
              })
            }
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  // Helper function to format ISO date strings
  const formatDate = (dateString) => {
    if (!dateString) return "Not available"

    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (e) {
      return dateString
    }
  }

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-cover"></div>
      
        
        <div className="profile-header-info">
          <h1>{userData.name}</h1>
          <span className="profile-role">{userData.role}</span>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <h2>Account Information</h2>
          <div className="profile-card">
            <div className="profile-info-item">
              <span className="info-label">Username</span>
              <span className="info-value">{userData.username}</span>
            </div>
            <div className="profile-info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{userData.email}</span>
            </div>
            <div className="profile-info-item">
              <span className="info-label">Member Since</span>
              <span className="info-value">{userData.joinDate}</span>
            </div>
            <div className="profile-info-item">
              <span className="info-label">Last Login</span>
              <span className="info-value">{userData.lastLogin}</span>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Contact Information</h2>
          <div className="profile-card">
            <div className="profile-info-item">
              <span className="info-label">Phone</span>
              <span className="info-value">{userData.phone}</span>
            </div>
            <div className="profile-info-item">
              <span className="info-label">Address</span>
              <span className="info-value">{userData.address}</span>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h2>Account Actions</h2>
          <div className="profile-actions">
           
            <Link to="/" className="profile-action-button back-button">
              <span className="button-icon">⬅️</span>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
