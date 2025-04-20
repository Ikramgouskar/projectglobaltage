"use client"

import { useState, useEffect, useRef } from "react"
import "../style/contact.css"
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Contact() {
  const [formState, setFormState] = useState({
    nom: "",
    email: "",
    telephone: "",
    sujet: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const formRef = useRef(null)
  const infoRef = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.2 },
    )

    const sections = [formRef, infoRef, mapRef]
    sections.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => {
      sections.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      })
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        nom: "",
        email: "",
        telephone: "",
        sujet: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 2000)
  }

  return (
    <div className="contact-container">
      <div className="contact-hero">
        <div className="leaf-decoration leaf-top-left"></div>
        <div className="leaf-decoration leaf-top-right"></div>
        <div className="leaf-decoration leaf-bottom-left"></div>
        <div className="leaf-decoration leaf-bottom-right"></div>

        <h1 className="contact-title">Contactez-Nous</h1>
        <p className="contact-subtitle">
          Nous sommes à votre écoute pour répondre à toutes vos questions et vous accompagner dans vos projets agricoles
        </p>
      </div>

      <div className="contact-content">
        <section className="contact-form-section" ref={formRef}>
          <div className="form-container">
            <h2 className="section-title">Envoyez-nous un message</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nom">Nom complet</label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formState.nom}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  required
                />
                <div className="input-focus-effect"></div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="Votre adresse email"
                  required
                />
                <div className="input-focus-effect"></div>
              </div>

              <div className="form-group">
                <label htmlFor="telephone">Téléphone</label>
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={formState.telephone}
                  onChange={handleChange}
                  placeholder="Votre numéro de téléphone"
                />
                <div className="input-focus-effect"></div>
              </div>

              <div className="form-group">
                <label htmlFor="sujet">Sujet</label>
                <input
                  type="text"
                  id="sujet"
                  name="sujet"
                  value={formState.sujet}
                  onChange={handleChange}
                  placeholder="Sujet de votre message"
                  required
                />
                <div className="input-focus-effect"></div>
              </div>

              <div className="form-group full-width">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Votre message"
                  rows="5"
                  required
                ></textarea>
                <div className="input-focus-effect"></div>
              </div>

              <button type="submit" className="submit-button" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    Envoyer <Send size={18} />
                  </>
                )}
              </button>

              {isSubmitted && (
                <div className="success-message">
                  <p>Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.</p>
                </div>
              )}
            </form>
          </div>
        </section>

        <section className="contact-info-section" ref={infoRef}>
          <div className="info-container">
            <h2 className="section-title">Nos Coordonnées</h2>

            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon">
                  <Phone className="icon" />
                </div>
                <h3>Téléphone</h3>
                <p>+212 522 123 456</p>
                <p>+212 661 789 012</p>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <Mail className="icon" />
                </div>
                <h3>Email</h3>
                <p>contact@casem.ma</p>
                <p>info@casem.ma</p>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <MapPin className="icon" />
                </div>
                <h3>Adresse</h3>
                <p>123 Boulevard Mohammed V</p>
                <p>Casablanca, Maroc</p>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <Clock className="icon" />
                </div>
                <h3>Horaires d'ouverture</h3>
                <p>Lundi - Vendredi: 8h30 - 17h30</p>
                <p>Samedi: 9h00 - 13h00</p>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-map-section" ref={mapRef}>
          <div className="map-container">
            <h2 className="section-title">Nous Trouver</h2>
            <div className="map-wrapper">
              <div className="map-placeholder">
                <div className="map-pin"></div>
                <div className="map-ripple"></div>
                <p className="map-text">CASEM - Siège Social</p>
              </div>
            </div>
          </div>
        </section>

        
      </div>

    </div>
  )
}
