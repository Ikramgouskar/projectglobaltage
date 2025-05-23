"use client"

import { useEffect, useRef, useState } from "react"
import { Clock, MapPin, Users, Handshake, ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import "../style/home.css"
import video from "../assum/vedio.mp4"

// Add this CSS to your home.css file or create a style tag in your component


export default function Home() {
  const statsRef = useRef(null)
  const categoriesRef = useRef(null)
  const counterRefs = useRef([])

  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Array of images for the carousel
  const carouselImages = [
    "/imge_home/group2.png",
    "/imge_home/image.png",
    "/imge_home/photo1.png",
    "/imge_home/photo2.png",
    "/imge_home/photo3.png",
    "/imge_home/photo4.png",
    "/imge_home/photo5.png",

    

    
    // Add more images as needed
  ]

  // Optional alt texts for better accessibility


  // Carousel navigation functions
  const goToNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1))
    setTimeout(() => setIsAnimating(false), 500) // Match transition duration
  }

  const goToPrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1))
    setTimeout(() => setIsAnimating(false), 500) // Match transition duration
  }

  const goToIndex = (index) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 500) // Match transition duration
  }

  useEffect(() => {
    // Animate stats and categories on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")

            // Start counter animations when stats section is visible
            if (entry.target === statsRef.current) {
              animateCounters()
            }
          }
        })
      },
      { threshold: 0.5 }, // Trigger when 50% of the element is visible,
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    if (categoriesRef.current) {
      observer.observe(categoriesRef.current)
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current)
      }
      if (categoriesRef.current) {
        observer.unobserve(categoriesRef.current)
      }
    }
  }, [])

  const animateCounters = () => {
    counterRefs.current.forEach((counter) => {
      if (!counter) return

      const target = Number.parseInt(counter.getAttribute("data-value") || "0")
      const duration = 2000
      let startTimestamp = null

      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / duration, 1)

        let value
        if (target === 1987) {
          // Special case for year
          value = Math.floor(1950 + progress * (target - 1950))
        } else if (target === 1500) {
          // For larger numbers
          value = Math.floor(progress * target)
        } else {
          // For smaller numbers
          value = Math.floor(progress * target)
        }

        counter.textContent = value.toString()

        if (progress < 1) {
          window.requestAnimationFrame(step)
        } else {
          counter.textContent = target.toString()
        }
      }

      window.requestAnimationFrame(step)
    })
  }

  return (
    <>
      {/* Add carousel styles */}
     

      <video src={video} loop autoPlay muted onEnded={(e) => e.target.play()} />

      <main className="min-h-screen">
        <section>
          <div className="about-content">
            <div className="leaf-decoration left-leaf"></div>
            <div className="leaf-decoration right-leaf"></div>

            <p className="about-text">
              Forte de plus de 30 ans d'expérience, la société CASEM a développé une gamme diversifiée de produits,
              intrants et matériels agricoles reconnus pour leur qualité. Les marques que nous commercialisons sont
              soigneusement choisies et comptent parmi les leaders dans leurs secteurs respectifs, assurant ainsi à nos
              clients la garantie d'une qualité constante et une sécurité d'utilisation. Depuis la création de CASEM,
              nous nous sommes également efforcés de proposer à nos clients de nouveaux produits et de nouvelles
              solutions apportant des réponses innovantes à leurs problématiques. Cette philosophie continue à guider
              notre démarche à ce jour.
            </p>
          </div>
        </section>

        {/* Image Carousel */}
        <div className="image-">
          <div className="carousel-container">
            <div className="carousel-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {carouselImages.map((imgSrc, index) => (
                <div key={index} className="carousel-slide">
                  <img src={imgSrc || "/placeholder.svg"}  />
                </div>
              ))}
            </div>

            <button className="carousel-arrow carousel-prev" onClick={goToPrev} aria-label="Image précédente">
              <ChevronLeft />
            </button>

            <button className="carousel-arrow carousel-next" onClick={goToNext} aria-label="Image suivante">
              <ChevronRight />
            </button>

            <div className="carousel-dots">
              {carouselImages.map((_, index) => (
                <div
                  key={index}
                  className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
                  onClick={() => goToIndex(index)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Aller à l'image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <section className="product-categories" ref={categoriesRef}>
          <div className="container">
            <div className="categories-grid">
              <div className="category-item">
                <div className="category-icon">
                  <img
                    src="/icons/semences.svg"
                    alt="Semences"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2356a15e' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'%3E%3C/path%3E%3C/svg%3E"
                    }}
                  />
                </div>

                <Link to="/produit" className="logo-link">
                  <h3 className="category-title">Semences</h3>
                </Link>
              </div>

              <div className="category-item">
                <div className="category-icon">
                  <img
                    src="/icons/tourbes.svg"
                    alt="Tourbes et substrats"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2356a15e' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'%3E%3C/path%3E%3C/svg%3E"
                    }}
                  />
                </div>

                <Link to="/tourb" className="logo-link">
                  <h3 className="category-title">Tourbes et substrats</h3>
                </Link>
              </div>

              <div className="category-item">
                <div className="category-icon">
                  <img
                    src="/icons/engrais.svg"
                    alt="Engrais"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2356a15e' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M12 2v6'%3E%3C/path%3E%3Cpath d='M5 10h14'%3E%3C/path%3E%3Cpath d='M5 18h14'%3E%3C/path%3E%3Cpath d='M12 22v-6'%3E%3C/path%3E%3Cpath d='M19 16V8'%3E%3C/path%3E%3Cpath d='M5 16V8'%3E%3C/path%3E%3C/svg%3E"
                    }}
                  />
                </div>

                <Link to="/engrai" className="logo-link">
                  <h3 className="category-title">Engrais</h3>
                </Link>
              </div>

              <div className="category-item">
                <div className="category-icon">
                  <img
                    src="/icons/filets.svg"
                    alt="Filets agricoles"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2356a15e' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M3 3h18v18H3z'%3E%3C/path%3E%3Cpath d='M3 9h18'%3E%3C/path%3E%3Cpath d='M3 15h18'%3E%3C/path%3E%3Cpath d='M9 3v18'%3E%3C/path%3E%3Cpath d='M15 3v18'%3E%3C/path%3E%3C/svg%3E"
                    }}
                  />
                </div>
                <Link to="/filets" className="logo-link">
                  Filets agricoles
                </Link>
              </div>

              <div className="category-item">
                <div className="category-icon">
                  <img
                    src="/icons/biostimulants.svg"
                    alt="Biostimulants & Oligo-éléments"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2356a15e' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpath d='M8 21h8'%3E%3C/path%3E%3Cpath d='M12 21v-4'%3E%3C/path%3E%3Cpath d='M12 17a5 5 0 0 0 5-5c0-2-2-3-3-4s-2-3-2-5c0 2-1 4-2 5s-3 2-3 4a5 5 0 0 0 5 5z'%3E%3C/path%3E%3C/svg%3E"
                    }}
                  />
                </div>
                <Link to="/boitstimulant" className="logo-link">
                  Biostimulants & Oligo-éléments{" "}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="image-showcase">
          <img src="/imge_home/image2.png" alt="CASEM Agricultural Products" />
        </div>

        <section className="stats-section" ref={statsRef}>
          <div className="container mx-auto px-4 py-16">
            <h2 className="stats-title">Notre Histoire en Chiffres</h2>

            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-icon">
                  <Clock className="icon" />
                </div>
                <div className="stat-number" data-value="1987" ref={(el) => (counterRefs.current[0] = el)}>
                  0
                </div>
                <div className="stat-label">Depuis</div>
              </div>

              <div className="stat-item">
                <div className="stat-icon">
                  <MapPin className="icon" />
                </div>
                <div className="stat-number" data-value="4" ref={(el) => (counterRefs.current[1] = el)}>
                  0
                </div>
                <div className="stat-label">Agences</div>
              </div>

              <div className="stat-item">
                <div className="stat-icon">
                  <Users className="icon" />
                </div>
                <div className="stat-number" data-value="1500" ref={(el) => (counterRefs.current[2] = el)}>
                  0
                </div>
                <div className="stat-label">Clients</div>
              </div>

              <div className="stat-item">
                <div className="stat-icon">
                  <Handshake className="icon" />
                </div>
                <div className="stat-number" data-value="20" ref={(el) => (counterRefs.current[3] = el)}>
                  0
                </div>
                <div className="stat-label">Partenaires</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
