

import { useState, useEffect } from "react"
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Send, ArrowUp } from 'lucide-react'
import "../style/footer.css"

export default function Footer() {


  return (
    <footer class="footer" >
      <div class="footer-leaves">
        <div class="leaf leaf-1"></div>
        <div class="leaf leaf-2"></div>
        <div class="leaf leaf-3"></div>
      </div>
      
      <div class="footer-content-wrapper">
        <div class="footer-content" >
          <div class="footer-info">
            <div class="footer-logo">
              <h2>CASEM</h2>
              <p class="tagline">Votre partenaire agricole depuis 1987</p>
            </div>
            <p class="footer-description">
              Forte de plus de 30 ans d'expérience, la société CASEM a développé une gamme diversifiée de produits, 
              intrants et matériels agricoles reconnus pour leur qualité.
            </p>
            <div class="contact-info">
              <div class="contact-item">
                <Phone size={18} />
                <span>+212 522 123 456</span>
              </div>
              <div class="contact-item">
                <Mail size={18} />
                <span>contact@casem.ma</span>
              </div>
              <div class="contact-item">
                <MapPin size={18} />
                <span>123 Avenue Mohammed V, Casablanca, Maroc</span>
              </div>
            </div>
          </div>
          <br />

          <div class="footer-links">
            <div class="links-column">
              <h3>Produits</h3>
              
            </div>
            <div class="links-column">
              <h3>À propos</h3>
              
            </div>
            <div class="links-column">
              <h3>Support</h3>
              
            </div>
          </div>
<br />
          <div class="footer-newsletter">
            <h3>Newsletter</h3>
            <br />
            <p>Inscrivez-vous pour recevoir nos actualités et offres spéciales</p>
            <form class="newsletter-form">
              <div class="form-group ">
                <input 
                  type="email" 
                  placeholder="Votre email"  class="imput"
                 
                 
                />
               

                <button type="submit">
                  <Send size={18} />
                </button>
              </div>
            </form>
            <div class="social-links">
              <a href="#" class="social-link">
                <Facebook size={20} />
              </a>
              <a href="#" class="social-link">
                <Instagram size={20} />
              </a>
              <a href="#" class="social-link">
                <Twitter size={20} />
              </a>
              <a href="#" class="social-link">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="copyright">
          <p>&copy; {new Date().getFullYear()} CASEM. Tous droits réservés.</p>
        </div>
       
      </div>
    </footer>
  )
}
