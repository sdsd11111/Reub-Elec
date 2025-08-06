"use client"

import { useState, useEffect, useRef, type TouchEvent } from "react"
import Image from "next/image"
import { Share2, ChevronLeft, ChevronRight, X, Plus } from "lucide-react"

// Constantes para configuración
const HERO_SLIDE_INTERVAL = 7000 // 7 segundos para el slider del hero

export default function Home() {
  // Estados para los diferentes componentes
  const [activeSlides, setActiveSlides] = useState({
    alimentaria: 0,
    hogar: 0,
    hospitalaria: 0,
  })
  const [heroSlideIndex, setHeroSlideIndex] = useState(0)
  const [mobileTestimonialIndex, setMobileTestimonialIndex] = useState(0)
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Referencias para los sliders táctiles
  const sliderRefs = {
    alimentaria: useRef<HTMLDivElement>(null),
    hogar: useRef<HTMLDivElement>(null),
    hospitalaria: useRef<HTMLDivElement>(null),
    testimonial: useRef<HTMLDivElement>(null),
  }

  // Variables para el manejo de gestos táctiles
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)

  // Detectar si es móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Imágenes para el hero slider
  const heroImages = [
    { src: "/images/equipo-portada.jpg", alt: "Equipo METALCA - Profesionales metalmecánicos" },
    { src: "/images/hogar-2.png", alt: "Escalera moderna con paneles de vidrio" },
    { src: "/images/hospitalaria-1.png", alt: "Puertas de acero inoxidable para baños" },
    { src: "/images/hospitalaria-3.png", alt: "Urinarios con divisores de acero inoxidable" }, // Replaced hogar-1.png
  ]

  // Imágenes para categorías específicas
  const categoryImages = {
    alimentaria: [
      { src: "/images/alimentaria-1.png", alt: "Campana extractora de acero inoxidable" },
      { src: "/images/alimentaria-2.png", alt: "Parrilla de acero inoxidable" },
      { src: "/images/alimentaria-3.png", alt: "Fachada de establecimiento de comida" },
    ],
    hogar: [
      { src: "/images/hogar-1.png", alt: "Cocina exterior con encimeras de acero inoxidable" },
      { src: "/images/hogar-2.png", alt: "Escalera moderna con paneles de vidrio" },
      { src: "/images/hogar-3.png", alt: "Campana extractora con azulejos decorativos" },
    ],
    hospitalaria: [
      { src: "/images/hospitalaria-1.png", alt: "Puertas de acero inoxidable para baños" },
      { src: "/images/hospitalaria-2.png", alt: "Lavamanos y puertas médicas de acero inoxidable" },
      { src: "/images/hospitalaria-3.png", alt: "Urinarios con divisores de acero inoxidable" },
    ],
  }

  // Testimonios
  const testimonials = [
    {
      name: "Restaurante El Dorado",
      role: "Cliente Corporativo",
      text: "El trabajo que realizó METALCA en nuestra cocina industrial superó todas nuestras expectativas. La calidad del acero inoxidable y los acabados son excelentes.",
      image: "/images/alimentaria-1.png",
    },
    {
      name: "Familia Rodríguez",
      role: "Cliente Residencial",
      text: "Contratamos a METALCA para fabricar pasamanos y puertas para nuestro hogar. El resultado fue impecable y el servicio muy profesional.",
      image: "/images/hogar-2.png",
    },
    {
      name: "Clínica Santa Ana",
      role: "Sector Salud",
      text: "Las divisiones y puertas de acero inoxidable que instalaron en nuestras áreas críticas cumplen con todas las normativas sanitarias. Excelente trabajo.",
      image: "/images/hospitalaria-2.png",
    },
    {
      name: "Cafetería Aroma",
      role: "Negocio Local",
      text: "La barra y estanterías que diseñaron para nuestra cafetería son perfectas. Además, el equipo de instalación fue muy profesional y cuidadoso.",
      image: "/images/alimentaria-3.png",
    },
  ]

  // Preguntas frecuentes
  const faqItems = [
    {
      question: "¿Ofrecen garantía en sus productos de acero inoxidable?",
      answer:
        "Sí. En METALCA todos nuestros trabajos en acero inoxidable cuentan con garantía de durabilidad y resistencia, respaldados por controles de calidad constantes y personal altamente capacitado.",
    },
    {
      question: "¿En cuánto tiempo entregan un proyecto a medida?",
      answer:
        "Nuestro tiempo estándar de entrega es de 2 a 4 semanas, dependiendo de la complejidad. Le brindamos un cronograma detallado desde la cotización y actualizaciones semanales para que siempre esté informado.",
    },
    {
      question: "¿Puedo visitar sus instalaciones en Cuenca?",
      answer:
        "Claro. Estamos ubicados en Av. Abelardo J. Andrade & Luis Pasteur. Puede agendar una visita de lunes a viernes, de 8:00 a 13:00 y 14:00 a 17:00, para conocer nuestro taller y ver avances en vivo.",
    },
    {
      question: "¿Trabajan con proyectos residenciales y comerciales?",
      answer:
        "Sí. Tenemos experiencia tanto en la Línea Hogar (pasamanos, asadores) como en Industria Alimenticia (campanas, extractores) y Hospitalaria (lavamanos, puertas plomadas) desde 2018.",
    },
    {
      question: "¿Cómo solicito una cotización?",
      answer:
        "Puede llamarnos al +593 98 101 4827 o escribirnos por WhatsApp. Le pediremos detalles del proyecto y en 24 h le enviamos una propuesta con precios y plazos.",
    },
    {
      question: "¿Qué certificaciones o normas cumplen sus procesos?",
      answer:
        "Todos nuestros procesos siguen estándares ISO y normativas nacionales de calidad en metalmecánica, garantizando seguridad y eficiencia en cada producto.",
    },
    {
      question: "¿Ofrecen instalación o solo fabricación?",
      answer:
        "METALCA brinda servicio integral: diseño, fabricación e instalación en sitio, a cargo de nuestro equipo profesional, para que no tenga que preocuparse por nada más.",
    },
  ]

  // Funciones para navegación de slides de categorías
  const handleSlideChange = (category: "alimentaria" | "hogar" | "hospitalaria", index: number) => {
    setActiveSlides((prev) => ({
      ...prev,
      [category]: index,
    }))
  }

  const handleNextSlide = (category: "alimentaria" | "hogar" | "hospitalaria") => {
    const images = categoryImages[category]
    setActiveSlides((prev) => ({
      ...prev,
      [category]: (prev[category] + 1) % images.length,
    }))
  }

  const handlePrevSlide = (category: "alimentaria" | "hogar" | "hospitalaria") => {
    const images = categoryImages[category]
    setActiveSlides((prev) => ({
      ...prev,
      [category]: (prev[category] - 1 + images.length) % images.length,
    }))
  }

  // Funciones para navegación del hero slider
  const handleNextHeroSlide = () => {
    setHeroSlideIndex((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1))
  }

  const handlePrevHeroSlide = () => {
    setHeroSlideIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1))
  }

  // Navegación de testimonios
  const handleNextTestimonial = () => {
    setMobileTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const handlePrevTestimonial = () => {
    setMobileTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  // Toggle para el acordeón de FAQ
  const toggleFaq = (index: number) => {
    if (activeFaqIndex === index) {
      setActiveFaqIndex(null)
    } else {
      setActiveFaqIndex(index)
    }
  }

  // Funciones para manejo de gestos táctiles
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: TouchEvent, category: "alimentaria" | "hogar" | "hospitalaria" | "testimonial") => {
    touchEndX.current = e.changedTouches[0].clientX
    handleSwipe(category)
  }

  const handleSwipe = (category: "alimentaria" | "hogar" | "hospitalaria" | "testimonial") => {
    const minSwipeDistance = 50
    const swipeDistance = touchEndX.current - touchStartX.current

    if (Math.abs(swipeDistance) < minSwipeDistance) return

    if (category === "testimonial") {
      if (swipeDistance > 0) {
        handlePrevTestimonial()
      } else {
        handleNextTestimonial()
      }
    } else {
      if (swipeDistance > 0) {
        handlePrevSlide(category as "alimentaria" | "hogar" | "hospitalaria")
      } else {
        handleNextSlide(category as "alimentaria" | "hogar" | "hospitalaria")
      }
    }
  }

  // Auto-advance del hero slider cada 7 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextHeroSlide()
    }, HERO_SLIDE_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black text-white">
        <div className="container max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <Image
              src="/images/metalca-logo-rectangular.jpg"
              alt="METALCA Logo"
              width={180}
              height={40}
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#servicios" className="hover:text-red-600 transition-colors">
              Servicios
            </a>
            <a href="#testimonios" className="hover:text-red-600 transition-colors">
              Testimonios
            </a>
            <a href="#faq" className="hover:text-red-600 transition-colors">
              FAQ
            </a>
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.metalca.ec"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600 transition-colors flex items-center gap-2"
            >
              <Share2 size={18} />
              Compartir
            </a>
            <a
              href="http://wa.me/593981014827"
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md flex items-center gap-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="white"
                className="shrink-0"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Mobile - Solo logo, sin menú hamburguesa */}
          <div className="md:hidden">{/* Intencionalmente vacío - eliminamos el menú hamburguesa */}</div>
        </div>
      </header>

      {/* WhatsApp Button Fixed para móvil */}
      <a
        href="http://wa.me/593981014827"
        className="md:hidden whatsapp-fixed bg-green-500 hover:bg-green-600 text-white p-3 rounded-full flex items-center justify-center"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="white"
          className="shrink-0"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      <main>
        {/* Hero Section - Full Screen with Background Image and Slider */}
        <section id="inicio" className="relative min-h-screen flex items-center justify-center bg-black text-white">
          {/* Background Image Slider with Overlay */}
          <div className="absolute inset-0 z-0">
            {heroImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === heroSlideIndex ? "opacity-50" : "opacity-0"
                }`}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevHeroSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            aria-label="Imagen anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNextHeroSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            aria-label="Imagen siguiente"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex justify-center gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setHeroSlideIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === heroSlideIndex ? "bg-red-600" : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="container max-w-screen-xl mx-auto px-4 text-center relative z-10 pt-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Confianza y tranquilidad con METALCA</h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
              Precios a tu alcance y un trabajo garantizado.
            </p>
            <a
              href="http://wa.me/593981014827"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md text-lg transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              ¡Cotiza ya!
            </a>
          </div>
        </section>

        {/* Video Section */}
        <section id="casos-exito-video" className="bg-white py-16">
          <div className="container max-w-screen-xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Nuestros Proyectos en Acción</h2>
            <div className="max-w-screen-lg mx-auto aspect-w-16 aspect-h-9 rounded-lg shadow-md overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/cnMoGlXlbEE"
                title="METALCA - Proyectos en Acción"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Services Section with Sliders */}
        <section id="servicios" className="bg-gray-100 py-16">
          <div className="container max-w-screen-xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Nuestros Servicios Metalmecánicos</h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Diseño y fabricación en acero inoxidable con los más altos estándares de calidad
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Service Card 1 - Industria Alimenticia */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="text-5xl text-red-600 text-center mb-4">⚙️</div>
                  <h3 className="text-xl font-bold text-center mb-3">Industria Alimenticia</h3>
                  <p className="text-gray-600 text-center">
                    Campanas, extractores, mesas de trabajo, lavaderos, estanterías y equipamiento especializado.
                  </p>
                </div>

                {/* Slider for Industria Alimenticia */}
                <div className="relative">
                  <div
                    ref={sliderRefs.alimentaria}
                    className="aspect-w-16 aspect-h-9 bg-gray-100 touch-slider"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={(e) => handleTouchEnd(e, "alimentaria")}
                  >
                    {categoryImages.alimentaria.map((image, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-500 ${
                          index === activeSlides.alimentaria ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                      </div>
                    ))}

                    {/* Navigation Arrows */}
                    <button
                      onClick={() => handlePrevSlide("alimentaria")}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transition-colors shadow-md w-8 h-8 flex items-center justify-center"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => handleNextSlide("alimentaria")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transition-colors shadow-md w-8 h-8 flex items-center justify-center"
                      aria-label="Imagen siguiente"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Service Card 2 - Línea Hogar */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="text-5xl text-red-600 text-center mb-4">🏠</div>
                  <h3 className="text-xl font-bold text-center mb-3">Línea Hogar</h3>
                  <p className="text-gray-600 text-center">
                    Pasamanos, asadores, puertas, ventanas, escaleras y soluciones personalizadas para el hogar.
                  </p>
                </div>

                {/* Slider for Línea Hogar */}
                <div className="relative">
                  <div
                    ref={sliderRefs.hogar}
                    className="aspect-w-16 aspect-h-9 bg-gray-100 touch-slider"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={(e) => handleTouchEnd(e, "hogar")}
                  >
                    {categoryImages.hogar.map((image, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-500 ${
                          index === activeSlides.hogar ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                      </div>
                    ))}

                    {/* Navigation Arrows */}
                    <button
                      onClick={() => handlePrevSlide("hogar")}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transition-colors shadow-md w-8 h-8 flex items-center justify-center"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => handleNextSlide("hogar")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transition-colors shadow-md w-8 h-8 flex items-center justify-center"
                      aria-label="Imagen siguiente"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Service Card 3 - Línea Hospitalaria */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="text-5xl text-red-600 text-center mb-4">🏥</div>
                  <h3 className="text-xl font-bold text-center mb-3">Línea Hospitalaria</h3>
                  <p className="text-gray-600 text-center">
                    Lavamanos, puertas, divisiones, mobiliario y equipamiento especializado para centros médicos.
                  </p>
                </div>

                {/* Slider for Línea Hospitalaria */}
                <div className="relative">
                  <div
                    ref={sliderRefs.hospitalaria}
                    className="aspect-w-16 aspect-h-9 bg-gray-100 touch-slider"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={(e) => handleTouchEnd(e, "hospitalaria")}
                  >
                    {categoryImages.hospitalaria.map((image, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-500 ${
                          index === activeSlides.hospitalaria ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                      </div>
                    ))}

                    {/* Navigation Arrows */}
                    <button
                      onClick={() => handlePrevSlide("hospitalaria")}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transition-colors shadow-md w-8 h-8 flex items-center justify-center"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => handleNextSlide("hospitalaria")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transition-colors shadow-md w-8 h-8 flex items-center justify-center"
                      aria-label="Imagen siguiente"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section - Cards with background images */}
        <section id="testimonios" className="bg-gray-100 py-16">
          <div className="container max-w-screen-lg mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Clientes Satisfechos</h2>

            {/* Desktop Testimonials Grid */}
            <div className="hidden md:grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="relative overflow-hidden rounded-lg shadow-lg h-64">
                  {/* Background Image with Overlay */}
                  <div className="absolute inset-0">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={`${testimonial.name} - Cliente METALCA`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-6 flex flex-col h-full justify-end text-white">
                    <p className="italic mb-4 line-clamp-4">{testimonial.text}</p>
                    <div>
                      <p className="font-bold text-lg">{testimonial.name}</p>
                      <p className="text-sm text-gray-300">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Testimonials Slider */}
            <div className="md:hidden relative">
              <div
                ref={sliderRefs.testimonial}
                className="relative overflow-hidden rounded-lg shadow-lg h-64 touch-slider"
                onTouchStart={handleTouchStart}
                onTouchEnd={(e) => handleTouchEnd(e, "testimonial")}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === mobileTestimonialIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                  >
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={`${testimonial.name} - Cliente METALCA`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/60"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-6 flex flex-col h-full justify-end text-white">
                      <p className="italic mb-4">{testimonial.text}</p>
                      <div>
                        <p className="font-bold text-lg">{testimonial.name}</p>
                        <p className="text-sm text-gray-300">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrevTestimonial}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transition-colors shadow-md w-8 h-8 flex items-center justify-center"
                aria-label="Testimonio anterior"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={handleNextTestimonial}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transition-colors shadow-md w-8 h-8 flex items-center justify-center"
                aria-label="Testimonio siguiente"
              >
                <ChevronRight size={18} />
              </button>

              {/* Indicator */}
              <div className="flex justify-center mt-4 gap-2">
                <span className="text-sm text-gray-600">
                  {mobileTestimonialIndex + 1} / {testimonials.length}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Accordion */}
        <section id="faq" className="bg-white py-16">
          <div className="container max-w-screen-lg mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Preguntas Frecuentes</h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Respuestas a las dudas más comunes sobre nuestros servicios
            </p>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex justify-between items-center w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                    aria-expanded={activeFaqIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <h3 className="text-lg font-medium">{item.question}</h3>
                    <span className="text-red-600 flex-shrink-0 ml-4">
                      {activeFaqIndex === index ? <X size={20} /> : <Plus size={20} />}
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    className={`overflow-hidden transition-all duration-300 ${
                      activeFaqIndex === index ? "max-h-96 p-4" : "max-h-0"
                    }`}
                    aria-hidden={activeFaqIndex !== index}
                  >
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Banner Section - Fixed Background */}
        <section id="banner" className="relative h-80">
          <div
            className="fixed-bg absolute inset-0 bg-fixed"
            style={{
              backgroundImage: 'url("/images/hero-background.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
              height: "100%",
              width: "100%",
            }}
          >
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="bg-white py-16">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Contact Info */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Contáctanos</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Estamos listos para ayudarte con tu próximo proyecto. Contáctanos para una cotización personalizada.
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Ubicación</h3>
                    <p className="text-gray-600">Av. Abelardo J. Andrade &, Luis Pasteur</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Horario de Atención</h3>
                    <p className="text-gray-600">
                      Lunes a Viernes: 8:00 AM - 6:00 PM
                      <br />
                      Sábados: 8:00 AM - 1:00 PM
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Teléfono / WhatsApp</h3>
                    <div className="space-y-1">
                      <a href="tel:+593981014827" className="text-red-600 hover:underline block">
                        +593 98 101 4827
                      </a>
                      <a
                        href="http://wa.me/593981014827"
                        className="text-red-600 hover:underline block"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        WhatsApp: +593 98 101 4827
                      </a>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">Síguenos</h3>
                    <div className="flex space-x-4">
                      <a
                        href="https://www.instagram.com/metalcainox/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      </a>
                      <a
                        href="https://www.facebook.com/metalcainox"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div>
                <h3 className="text-2xl font-bold mb-6">Encuéntranos Aquí</h3>
                <div className="aspect-w-16 aspect-h-9 rounded-lg shadow overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d996.1899814134364!2d-79.01380053060126!3d-2.8854484604457475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91cd1706da1061a1%3A0x4029a8219c9f62c3!2sMetalca%20Inox!5e0!3m2!1ses!2sec!4v1747319376740!5m2!1ses!2sec"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de METALCA"
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-6">
        <div className="container max-w-screen-xl mx-auto px-4 text-center">
          <p className="text-sm mb-2">© 2024 METALCA. Todos los derechos reservados.</p>
          <p className="text-sm">
            Diseñado por{" "}
            <a
              href="https://cesarreyesjaramillo.com/"
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-white transition-colors"
            >
              Automatizotunegocio
            </a>
          </p>
        </div>
      </footer>
    </>
  )
}
