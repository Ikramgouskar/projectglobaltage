"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "../style/sittings.css"

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general")
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const [currentAdmin, setCurrentAdmin] = useState(null)
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    username: "",
    language: "english",
    timezone: "UTC",
    currency: "EUR",
    notifications: {
      email: true,
      browser: true,
      orderUpdates: true,
      newProducts: false,
      marketing: false,
    },
    appearance: {
      theme: "light",
      compactMode: false,
      fontSize: "medium",
    },
    store: {
      storeName: "UNIQUE JEWELRY",
      storeEmail: "contact@uniquejewelry.com",
      storePhone: "",
      storeAddress: "",
      taxRate: "20",
      shippingOptions: "standard",
    },
  })

  // Fetch user data from localStorage
  useEffect(() => {
    const fetchUserData = () => {
      try {
        // Get the current logged in username
        const username = localStorage.getItem("userlogin")

        if (!username) {
          console.error("No user logged in")
          setLoading(false)
          return
        }

        // Get admin details from currentAdmin
        const currentAdminData = localStorage.getItem("currentAdmin")
        let adminData = {}

        if (currentAdminData) {
          adminData = JSON.parse(currentAdminData)
          setCurrentAdmin(adminData)
        } else {
          // Try to find admin in registered admins
          const registeredAdmins = JSON.parse(localStorage.getItem("registeredAdmins")) || []
          const foundAdmin = registeredAdmins.find((admin) => admin.username === username)

          if (foundAdmin) {
            adminData = foundAdmin
            setCurrentAdmin(foundAdmin)
          } else if (username === "ikramgouskar") {
            // Hardcoded admin
            adminData = {
              username: "ikramgouskar",
              fullName: "Ikram Gouskar",
              email: "admin@uniquejewelry.com",
              joinDate: new Date().toISOString(),
            }
            setCurrentAdmin(adminData)
          }
        }

        // Update basic user data
        setUserData((prevData) => ({
          ...prevData,
          fullName: adminData.fullName || "",
          email: adminData.email || "",
          username: username,
        }))

        // Try to load admin-specific settings
        const adminSettingsKey = `adminSettings_${username}`
        const savedSettings = localStorage.getItem(adminSettingsKey)

        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings)
          setUserData((prevData) => ({
            ...prevData,
            ...parsedSettings,
            // Always ensure username is correct
            username: username,
          }))
        }
      } catch (error) {
        console.error("Error loading settings:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData({
      ...userData,
      [name]: value,
    })
  }

  const handleNestedInputChange = (category, name, value) => {
    setUserData({
      ...userData,
      [category]: {
        ...userData[category],
        [name]: value,
      },
    })
  }

  const handleCheckboxChange = (category, name) => {
    setUserData({
      ...userData,
      [category]: {
        ...userData[category],
        [name]: !userData[category][name],
      },
    })
  }

  const handleSaveSettings = () => {
    try {
      // Get the current username
      const username = localStorage.getItem("userlogin")

      if (!username) {
        console.error("No user logged in")
        return
      }

      // Save settings specific to this admin
      const adminSettingsKey = `adminSettings_${username}`
      localStorage.setItem(adminSettingsKey, JSON.stringify(userData))

      // Update admin information in currentAdmin
      if (currentAdmin) {
        const updatedAdmin = {
          ...currentAdmin,
          fullName: userData.fullName,
          email: userData.email,
        }
        localStorage.setItem("currentAdmin", JSON.stringify(updatedAdmin))

        // If this is a registered admin, update in the registered admins list too
        const registeredAdmins = JSON.parse(localStorage.getItem("registeredAdmins")) || []
        const updatedAdmins = registeredAdmins.map((admin) =>
          admin.username === username ? { ...admin, fullName: userData.fullName, email: userData.email } : admin,
        )
        localStorage.setItem("registeredAdmins", JSON.stringify(updatedAdmins))
      }

      // Show saved message
      setSaved(true)
      setTimeout(() => {
        setSaved(false)
      }, 3000)
    } catch (error) {
      console.error("Error saving settings:", error)
      alert("Failed to save settings. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="settings-loading">
        <div className="settings-spinner"></div>
        <p>Loading settings...</p>
      </div>
    )
  }

  // If no user is logged in, show an error
  if (!userData.username) {
    return (
      <div className="settings-error">
        <h2>Error Loading Settings</h2>
        <p>You must be logged in to view settings.</p>
        <Link to="/login" className="login-link">
          Go to Login
        </Link>
      </div>
    )
  }

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account settings and preferences</p>
        <div className="admin-info">
          <span className="admin-badge">Logged in as: {userData.username}</span>
        </div>
      </div>

      <div className="settings-content">
        <div className="settings-tabs">
          <button
            className={`tab-button ${activeTab === "general" ? "active" : ""}`}
            onClick={() => setActiveTab("general")}
          >
            General
          </button>
          <button
            className={`tab-button ${activeTab === "security" ? "active" : ""}`}
            onClick={() => setActiveTab("security")}
          >
            Security
          </button>
          <button
            className={`tab-button ${activeTab === "notifications" ? "active" : ""}`}
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </button>
          <button
            className={`tab-button ${activeTab === "appearance" ? "active" : ""}`}
            onClick={() => setActiveTab("appearance")}
          >
            Appearance
          </button>
          <button
            className={`tab-button ${activeTab === "store" ? "active" : ""}`}
            onClick={() => setActiveTab("store")}
          >
            Store Settings
          </button>
        </div>

        <div className="settings-panel">
          {/* General Settings */}
          {activeTab === "general" && (
            <div className="settings-section">
              <h2>General Settings</h2>
              <div className="settings-form">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={userData.fullName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="email" value={userData.email} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={userData.username}
                    onChange={handleInputChange}
                    disabled
                  />
                  <small>Username cannot be changed</small>
                </div>
                <div className="form-group">
                  <label htmlFor="language">Language</label>
                  <select id="language" name="language" value={userData.language} onChange={handleInputChange}>
                    <option value="english">English</option>
                    <option value="french">French</option>
                    <option value="spanish">Spanish</option>
                    <option value="german">German</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="timezone">Timezone</label>
                  <select id="timezone" name="timezone" value={userData.timezone} onChange={handleInputChange}>
                    <option value="UTC">UTC (Coordinated Universal Time)</option>
                    <option value="EST">EST (Eastern Standard Time)</option>
                    <option value="CST">CST (Central Standard Time)</option>
                    <option value="PST">PST (Pacific Standard Time)</option>
                    <option value="CET">CET (Central European Time)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="currency">Currency</label>
                  <select id="currency" name="currency" value={userData.currency} onChange={handleInputChange}>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div className="settings-section">
              <h2>Security Settings</h2>
              <div className="settings-form">
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input type="password" id="currentPassword" name="currentPassword" />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input type="password" id="newPassword" name="newPassword" />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input type="password" id="confirmPassword" name="confirmPassword" />
                </div>
                <button className="change-password-button">Change Password</button>

                <div className="security-section">
                  <h3>Login Sessions</h3>
                  <div className="session-item">
                    <div className="session-info">
                      <strong>Current Session</strong>
                      <span>Started: {new Date().toLocaleString()}</span>
                      <span>IP: 192.168.1.1</span>
                      <span>Browser: Chrome on Windows</span>
                    </div>
                    <button className="session-button">This Device</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <div className="settings-section">
              <h2>Notification Settings</h2>
              <div className="settings-form">
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={userData.notifications.email}
                      onChange={() => handleCheckboxChange("notifications", "email")}
                    />
                    <span>Email Notifications</span>
                  </label>
                  <p className="checkbox-description">Receive notifications via email</p>
                </div>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={userData.notifications.browser}
                      onChange={() => handleCheckboxChange("notifications", "browser")}
                    />
                    <span>Browser Notifications</span>
                  </label>
                  <p className="checkbox-description">Receive notifications in your browser</p>
                </div>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={userData.notifications.orderUpdates}
                      onChange={() => handleCheckboxChange("notifications", "orderUpdates")}
                    />
                    <span>Order Updates</span>
                  </label>
                  <p className="checkbox-description">Get notified about order status changes</p>
                </div>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={userData.notifications.newProducts}
                      onChange={() => handleCheckboxChange("notifications", "newProducts")}
                    />
                    <span>New Products</span>
                  </label>
                  <p className="checkbox-description">Get notified when new products are added</p>
                </div>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={userData.notifications.marketing}
                      onChange={() => handleCheckboxChange("notifications", "marketing")}
                    />
                    <span>Marketing Updates</span>
                  </label>
                  <p className="checkbox-description">Receive marketing and promotional emails</p>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === "appearance" && (
            <div className="settings-section">
              <h2>Appearance Settings</h2>
              <div className="settings-form">
                <div className="form-group">
                  <label htmlFor="theme">Theme</label>
                  <div className="theme-options">
                    <label className={`theme-option ${userData.appearance.theme === "light" ? "selected" : ""}`}>
                      <input
                        type="radio"
                        name="theme"
                        value="light"
                        checked={userData.appearance.theme === "light"}
                        onChange={(e) => handleNestedInputChange("appearance", "theme", e.target.value)}
                      />
                      <div className="theme-preview light-theme">
                        <div className="theme-header"></div>
                        <div className="theme-content"></div>
                      </div>
                      <span>Light</span>
                    </label>
                    <label className={`theme-option ${userData.appearance.theme === "dark" ? "selected" : ""}`}>
                      <input
                        type="radio"
                        name="theme"
                        value="dark"
                        checked={userData.appearance.theme === "dark"}
                        onChange={(e) => handleNestedInputChange("appearance", "theme", e.target.value)}
                      />
                      <div className="theme-preview dark-theme">
                        <div className="theme-header"></div>
                        <div className="theme-content"></div>
                      </div>
                      <span>Dark</span>
                    </label>
                    <label className={`theme-option ${userData.appearance.theme === "system" ? "selected" : ""}`}>
                      <input
                        type="radio"
                        name="theme"
                        value="system"
                        checked={userData.appearance.theme === "system"}
                        onChange={(e) => handleNestedInputChange("appearance", "theme", e.target.value)}
                      />
                      <div className="theme-preview system-theme">
                        <div className="theme-header"></div>
                        <div className="theme-content"></div>
                      </div>
                      <span>System</span>
                    </label>
                  </div>
                </div>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={userData.appearance.compactMode}
                      onChange={() => handleCheckboxChange("appearance", "compactMode")}
                    />
                    <span>Compact Mode</span>
                  </label>
                  <p className="checkbox-description">Use a more compact layout to show more content</p>
                </div>
                <div className="form-group">
                  <label htmlFor="fontSize">Font Size</label>
                  <select
                    id="fontSize"
                    value={userData.appearance.fontSize}
                    onChange={(e) => handleNestedInputChange("appearance", "fontSize", e.target.value)}
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Store Settings */}
          {activeTab === "store" && (
            <div className="settings-section">
              <h2>Store Settings</h2>
              <div className="settings-form">
                <div className="form-group">
                  <label htmlFor="storeName">Store Name</label>
                  <input
                    type="text"
                    id="storeName"
                    value={userData.store.storeName}
                    onChange={(e) => handleNestedInputChange("store", "storeName", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="storeEmail">Store Email</label>
                  <input
                    type="email"
                    id="storeEmail"
                    value={userData.store.storeEmail}
                    onChange={(e) => handleNestedInputChange("store", "storeEmail", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="storePhone">Store Phone</label>
                  <input
                    type="tel"
                    id="storePhone"
                    value={userData.store.storePhone}
                    onChange={(e) => handleNestedInputChange("store", "storePhone", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="storeAddress">Store Address</label>
                  <textarea
                    id="storeAddress"
                    value={userData.store.storeAddress}
                    onChange={(e) => handleNestedInputChange("store", "storeAddress", e.target.value)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="taxRate">Tax Rate (%)</label>
                  <input
                    type="text"
                    id="taxRate"
                    value={userData.store.taxRate}
                    onChange={(e) => handleNestedInputChange("store", "taxRate", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="shippingOptions">Default Shipping Option</label>
                  <select
                    id="shippingOptions"
                    value={userData.store.shippingOptions}
                    onChange={(e) => handleNestedInputChange("store", "shippingOptions", e.target.value)}
                  >
                    <option value="standard">Standard Shipping</option>
                    <option value="express">Express Shipping</option>
                    <option value="free">Free Shipping</option>
                    <option value="local">Local Pickup</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="settings-actions">
            {saved && <span className="save-message">Settings saved successfully!</span>}
            <div className="button-group">
              <Link to="/" className="cancel-button">
                Cancel
              </Link>
              <button className="save-button" onClick={handleSaveSettings}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
