
import { useEffect, useRef } from "react"
import "../style/about.css"

export default function About() {
  const historyRef = useRef(null)
  const missionRef = useRef(null)
  const valuesRef = useRef(null)
  const teamRef = useRef(null)
  const locationRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.2 }
    )

    const sections = [historyRef, missionRef, valuesRef, teamRef, locationRef]
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

  return (
    <div className="about-container">
      <div className="about-hero">
        <div className="leaf-decoration leaf-top-left"></div>
        <div className="leaf-decoration leaf-top-right"></div>
        <div className="leaf-decoration leaf-bottom-left"></div>
        <div className="leaf-decoration leaf-bottom-right"></div>
        
        <h1 className="about-title">À Propos de CASEM</h1>
        <p className="about-subtitle">
          Votre partenaire de confiance dans le secteur agricole depuis 1987
        </p>
      </div>

      <section className="about-section history-section" ref={historyRef}>
        <div className="section-content">
          <h2 className="section-title">Notre Histoire</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>1987</h3>
                <p>Fondation de CASEM avec une vision claire : fournir des produits agricoles de qualité supérieure aux agriculteurs marocains.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>1995</h3>
                <p>Expansion de notre gamme de produits pour inclure des semences, des engrais et des équipements d'irrigation innovants.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>2005</h3>
                <p>Ouverture de nouvelles agences à travers le Maroc pour mieux servir nos clients dans différentes régions.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>2015</h3>
                <p>Introduction de solutions agricoles durables et respectueuses de l'environnement pour répondre aux défis du changement climatique.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>Aujourd'hui</h3>
                <p>CASEM continue d'innover et de s'adapter aux besoins changeants du secteur agricole, tout en maintenant son engagement envers la qualité et le service client.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section mission-section" ref={missionRef}>
        <div className="section-content">
          
          
          <h2 className="section-title">Notre Mission</h2>
          <div className="mission-container">
            <div className="mission-icon">
              <svg viewBox="0 0 24 24" className="mission-svg">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <p className="mission-text">
              Chez CASEM, notre mission est de contribuer au développement durable de l'agriculture marocaine en fournissant des produits, intrants et matériels agricoles de haute qualité. Nous nous engageons à soutenir les agriculteurs avec des solutions innovantes qui améliorent la productivité tout en respectant l'environnement.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section values-section" ref={valuesRef}>
        <div className="section-content">
          <h2 className="section-title">Nos Valeurs</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" className="value-svg">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3>Qualité</h3>
              <p>Nous ne proposons que des produits de qualité supérieure, soigneusement sélectionnés auprès des meilleurs fournisseurs.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" className="value-svg">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3>Innovation</h3>
              <p>Nous recherchons constamment de nouvelles solutions pour répondre aux défis agricoles d'aujourd'hui et de demain.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" className="value-svg">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3>Service Client</h3>
              <p>Nous plaçons nos clients au centre de nos préoccupations, en offrant un service personnalisé et des conseils d'experts.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg viewBox="0 0 24 24" className="value-svg">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3>Durabilité</h3>
              <p>Nous nous engageons à promouvoir des pratiques agricoles durables qui préservent les ressources naturelles pour les générations futures.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section team-section" ref={teamRef}>
        <div className="section-content">
          <h2 className="section-title">Notre Équipe</h2>
          <p className="team-intro">
            Notre équipe est composée de professionnels passionnés et expérimentés dans le domaine agricole, dédiés à vous offrir le meilleur service et les meilleurs conseils.
          </p>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-photo"></div>
              <h3>Mohammed Alami</h3>
              <p className="member-title">Directeur Général</p>
            </div>
            <div className="team-member">
              <div className="member-photo"></div>
              <h3>Fatima Benali</h3>
              <p className="member-title">Responsable Technique</p>
            </div>
            <div className="team-member">
              <div className="member-photo"></div>
              <h3>Ahmed Tazi</h3>
              <p className="member-title">Responsable Commercial</p>
            </div>
            <div className="team-member">
              <div className="member-photo"></div>
              <h3>Laila Mansouri</h3>
              <p className="member-title">Experte en Agronomie</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section location-section" ref={locationRef}>
        <div className="section-content">
          <h2 className="section-title">Nos Agences</h2>
          <div className="locations-container">
            <div className="location-card">
              <div className="location-icon">
                <svg viewBox="0 0 24 24" className="location-svg">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3>Casablanca</h3>
              <p>123 Boulevard Mohammed V<br />Casablanca, Maroc</p>
              <p>Tél: +212 522 123 456</p>
            </div>
            <div className="location-card">
              <div className="location-icon">
                <svg viewBox="0 0 24 24" className="location-svg">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3>Rabat</h3>
              <p>45 Avenue Hassan II<br />Rabat, Maroc</p>
              <p>Tél: +212 537 789 012</p>
            </div>
            <div className="location-card">
              <div className="location-icon">
                <svg viewBox="0 0 24 24" className="location-svg">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3>Marrakech</h3>
              <p>78 Rue Moulay Ismail<br />Marrakech, Maroc</p>
              <p>Tél: +212 524 345 678</p>
            </div>
            <div className="location-card">
              <div className="location-icon">
                <svg viewBox="0 0 24 24" className="location-svg">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3>Agadir</h3>
              <p>15 Boulevard Hassan I<br />Agadir, Maroc</p>
              <p>Tél: +212 528 901 234</p>
            </div>
          </div>
        </div>
      </section>

    
    </div>
  )
}
