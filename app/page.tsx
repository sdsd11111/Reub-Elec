"use client"

import { useState, useEffect, useRef, type TouchEvent } from "react"
import Image from "next/image"
import { Share2, ChevronLeft, ChevronRight, X, Plus, ChevronDown, MessageCircle, Send, MapPin, Phone, Clock, Mail, Map, PhoneCall, MessageSquare, Instagram, Facebook, Twitter } from "lucide-react"

// Constantes para configuración
const HERO_SLIDE_INTERVAL = 7000 // 7 segundos para el slider del hero

function Home() {
  // Estados para el formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

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
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)
  
  // Lightbox state for each service
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    currentImageIndex: 0,
    currentCategory: null as keyof typeof categoryImages | null,
    images: [] as {src: string, alt: string}[]
  })
  
  // Cerrar menú al hacer clic en un enlace
  const closeMobileMenu = () => {
    setIsMenuOpen(false)
  }
  
  // Function to open lightbox with a specific image from a category
  const openLightbox = (category: keyof typeof categoryImages, index: number) => {
    setLightboxState({
      isOpen: true,
      currentImageIndex: index,
      currentCategory: category,
      images: [...categoryImages[category]]
    })
    document.body.style.overflow = 'hidden' // Prevent scrolling when lightbox is open
  }
  
  // Function to close lightbox
  const closeLightbox = () => {
    setLightboxState(prev => ({
      ...prev,
      isOpen: false
    }))
    document.body.style.overflow = 'auto' // Re-enable scrolling
  }
  
  // Function to navigate between images in the current category
  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (!lightboxState.currentCategory) return
    
    const currentIndex = lightboxState.currentImageIndex
    const totalImages = lightboxState.images.length
    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1
    
    // Handle boundaries within the current category
    if (newIndex >= totalImages) {
      newIndex = 0 // Loop to first image
    } else if (newIndex < 0) {
      newIndex = totalImages - 1 // Loop to last image
    }
    
    setLightboxState(prev => ({
      ...prev,
      currentImageIndex: newIndex
    }))
  }
  
  // Function to navigate to a specific image in the current category
  const goToImage = (index: number) => {
    setLightboxState(prev => ({
      ...prev,
      currentImageIndex: index
    }))
  }
  
  // Handle keyboard events for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxState.isOpen) return
      
      switch (e.key) {
        case 'Escape':
          closeLightbox()
          break
        case 'ArrowRight':
          navigateLightbox('next')
          break
        case 'ArrowLeft':
          navigateLightbox('prev')
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxState.isOpen, lightboxState.currentImageIndex])

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

  // Imágenes para el hero slider con textos optimizados para SEO
  const heroImages = [
    { 
      src: "/images/Hero.jpg", 
      alt: "Técnico experto instalando medidor de luz en Loja - Reubí Elec" 
    },
    { 
      src: "/images/Hero 2.jpg", 
      alt: "Reparación profesional de medidores eléctricos en Loja - Especialistas certificados" 
    },
    { 
      src: "/images/Hero 3.jpg", 
      alt: "Venta e instalación de medidores de luz digitales en Loja - Soluciones eléctricas" 
    },
    { 
      src: "/images/Hero 4.jpeg", 
      alt: "Servicio técnico de medidores prepago en Loja - Atención inmediata 24/7" 
    }
  ]

  // Imágenes para categorías específicas
  const categoryImages = {
    // Medidores de luz digitales y convencionales
    alimentaria: [
      { 
        src: "/images/Medidores de luz digitales y convencionales 1.jpeg", 
        alt: "Instalación de medidor convencional" 
      },
      { 
        src: "/images/Medidores de luz digitales y convencionales 2.jpeg", 
        alt: "Medidor convencional instalado" 
      },
      { 
        src: "/images/Medidores de luz digitales y convencionales 3.jpeg", 
        alt: "Instalación profesional de medidor" 
      },
      { 
        src: "/images/Medidores de luz digitales y convencionales 4.jpeg", 
        alt: "Trabajo en cuadro de medidores" 
      },
    ],
    // Medidores de luz recargables e inteligentes
    hogar: [
      { 
        src: "/images/Medidores de luz recargables e inteligentes 1.jpeg", 
        alt: "Medidor recargable moderno" 
      },
      { 
        src: "/images/Medidores de luz recargables e inteligentes 2.jpeg", 
        alt: "Instalación de medidor inteligente" 
      },
      { 
        src: "/images/Medidores de luz recargables e inteligentes 3.jpg", 
        alt: "Sistema de medición recargable" 
      },
      { 
        src: "/images/Medidores de luz recargables e inteligentes 4.jpeg", 
        alt: "Panel de control de medidor inteligente" 
      },
    ],
    // Cajas para agua potable, TV y telecomunicaciones
    hospitalaria: [
      { 
        src: "/images/Cajas para agua potable, TV y telecomunicaciones 1.jpeg", 
        alt: "Caja de distribución para servicios" 
      },
      { 
        src: "/images/Cajas para agua potable, TV y telecomunicaciones 2.jpeg", 
        alt: "Instalación de caja de servicios" 
      },
      { 
        src: "/images/Cajas para agua potable, TV y telecomunicaciones 3.jpeg", 
        alt: "Caja de distribución organizada" 
      },
      { 
        src: "/images/Cajas para agua potable, TV y telecomunicaciones 4.jpeg", 
        alt: "Instalación profesional de cajas" 
      },
      { 
        src: "/images/Cajas para agua potable, TV y telecomunicaciones 5.jpeg", 
        alt: "Sistema de distribución completo" 
      },
    ],
  }

  // Testimonios
  const testimonials = [
    {
      name: "Karina Mora",
      role: "Loja",
      text: "Excelente servicio. Me instalaron la caja para mi medidor de luz recargable en menos de un día. Todo quedó profesional y seguro.",
      image: "/images/Clientes satisfechos.jpg",
    },
    {
      name: "Luis Vázquez",
      role: "Administrador de edificio",
      text: "Tenía problemas con los medidores de mis inquilinos y Reubí Elec solucionó todo. Trabajo limpio y puntual.",
      image: "/images/Clientes satisfechos 2.jpg",
    },
    {
      name: "Patricia Jiménez",
      role: "Propietaria",
      text: "Reubí Elec me ayudó a actualizar mi sistema a medidor digital. Muy buena atención y materiales de calidad.",
      image: "/images/Clientes satisfechos 3.jpg",
    },
    {
      name: "Jonathan Cabrera",
      role: "Local comercial en el centro",
      text: "Los contacté por WhatsApp, y en menos de 24 horas tenía mi caja instalada. 100% recomendados.",
      image: "/images/Clientes satisfechos 4.jpg",
    },
  ]

  // Preguntas frecuentes
  const faqItems = [
    {
      question: "¿Qué tipo de medidores instalan?",
      answer:
        "Instalamos cajas para medidores de luz convencionales, digitales, recargables e inteligentes, adaptándonos a sistemas monofásicos, bifásicos y trifásicos.",
    },
    {
      question: "¿Puedo instalar un medidor de luz prepago en mi vivienda?",
      answer:
        "Sí, ofrecemos soluciones adaptadas para medidores prepago, ideales para arrendamientos o control de consumo por inquilino.",
    },
    {
      question: "¿Dónde están ubicados?",
      answer:
        "Nos encontramos en Loja, Ecuador, junto a la EERSSA (calle Rocafuerte). Atendemos en toda la ciudad y zonas cercanas.",
    },
    {
      question: "¿Cuál es el costo de instalación?",
      answer:
        "El precio depende del tipo de caja, medidor y ubicación. Solicita tu cotización sin compromiso por WhatsApp.",
    },
    {
      question: "¿Hacen instalaciones en casas, edificios y negocios?",
      answer:
        "Sí, trabajamos con todo tipo de inmuebles: residencias, locales comerciales, departamentos, condominios y edificios institucionales.",
    },
    {
      question: "¿Qué materiales usan para las cajas?",
      answer:
        "Fabricamos en metal galvanizado y otros materiales resistentes a la intemperie, garantizando seguridad y durabilidad.",
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

  const scrollToCard = (index: number) => {
    const slider = sliderRef.current
    if (!slider) return
    
    const cardWidth = slider.scrollWidth / 3
    slider.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    })
    setCurrentCardIndex(index)
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

  // Efecto para manejar el scroll del slider de cards en móvil
  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    const handleScroll = () => {
      const scrollPosition = slider.scrollLeft
      const cardWidth = slider.scrollWidth / 3
      const newIndex = Math.round(scrollPosition / cardWidth)
      setCurrentCardIndex(newIndex)
    }

    slider.addEventListener('scroll', handleScroll, { passive: true })
    return () => slider.removeEventListener('scroll', handleScroll)
  }, [])

  // Lightbox component
  const Lightbox = () => {
    if (!lightboxState.isOpen || !lightboxState.currentCategory) return null
    
    const currentImage = lightboxState.images[lightboxState.currentImageIndex]
    const totalImages = lightboxState.images.length
    
    // Function to get category name for display
    const getCategoryName = (category: string) => {
      switch(category) {
        case 'alimentaria': return 'Medidores convencionales'
        case 'hogar': return 'Medidores inteligentes'
        case 'hospitalaria': return 'Cajas de distribución'
        default: return ''
      }
    }
    
    return (
      <div 
        className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/90 backdrop-blur-sm" 
        onClick={closeLightbox}
      >
        <div 
          className="relative w-full max-w-6xl max-h-[80vh] flex flex-col h-full" 
          onClick={e => e.stopPropagation()}
        >
          {/* Close button */}
          <button 
            onClick={closeLightbox}
            className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Cerrar galería"
          >
            <X size={32} />
          </button>
          
          {/* Category title */}
          <div className="text-white text-lg font-medium mb-4 text-center">
            {getCategoryName(lightboxState.currentCategory)}
          </div>
          
          {/* Main image container */}
          <div className="relative flex-1 bg-black rounded-lg overflow-hidden">
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              className="object-contain"
              priority
            />
            
            {/* Navigation arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateLightbox('prev')
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors z-10"
              aria-label="Imagen anterior"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                navigateLightbox('next')
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors z-10"
              aria-label="Siguiente imagen"
            >
              <ChevronRight size={28} />
            </button>
            
            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-1.5 rounded-full text-sm">
              {lightboxState.currentImageIndex + 1} / {totalImages}
            </div>
          </div>
          
          {/* Thumbnail navigation */}
          <div className="mt-4 w-full overflow-x-auto pb-2">
            <div className="flex space-x-2 px-2">
              {lightboxState.images.map((img, idx) => (
                <div 
                  key={`${lightboxState.currentCategory}-${idx}`}
                  className="relative flex-shrink-0"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      goToImage(idx)
                    }}
                    className={`relative w-16 h-16 rounded-md overflow-hidden transition-all duration-200 border-2 ${
                      idx === lightboxState.currentImageIndex
                        ? 'border-yellow-400 scale-105' 
                        : 'border-transparent opacity-70 hover:opacity-100 hover:border-white/50'
                    }`}
                    aria-label={`Ver imagen ${idx + 1}`}
                  >
                    <div className="relative w-full h-full">
                      <Image 
                        src={img.src} 
                        alt="" 
                        fill 
                        className="object-cover"
                        sizes="64px"
                        priority={idx === lightboxState.currentImageIndex}
                      />
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Lightbox */}
      <Lightbox />
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground">
        <div className="container max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <Image
              src="/images/Reubi Elec.jpg"
              alt="Reubí Elec Logo"
              width={180}
              height={50}
              className="h-12 w-auto"
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#servicios" className="hover:text-secondary transition-colors">
              Servicios
            </a>
            <a href="#testimonios" className="hover:text-secondary transition-colors">
              Testimonios
            </a>
            <a href="#faq" className="hover:text-secondary transition-colors">
              FAQ
            </a>
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.metalca.ec"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary transition-colors flex items-center gap-2"
            >
              <Share2 size={18} />
              Compartir
            </a>
            <a
              href="https://wa.me/593986286990"
              className="bg-secondary hover:bg-yellow-600 text-secondary-foreground py-2 px-4 rounded-md flex items-center gap-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="secondary-foreground"
                className="shrink-0"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>

          {/* Mobile - Botón de menú hamburguesa */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
              aria-label="Menú de navegación"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil */}
      <div className={`fixed inset-0 z-50 bg-black/50 transition-all duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} md:hidden`}>
        <div className={`fixed left-0 top-0 h-full w-4/5 max-w-sm bg-primary/95 backdrop-blur-sm transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} p-6 flex flex-col`}>
          <div className="flex justify-between items-center">
            <Image
              src="/images/Reubi Elec.jpg"
              alt="Reubí Elec Logo"
              width={180}
              height={50}
              className="h-12 w-auto"
              priority
            />
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="text-white p-2"
              aria-label="Cerrar menú"
            >
              <X size={24} />
            </button>
          </div>
          
          <nav className="flex-1 flex flex-col justify-center space-y-8">
            <a 
              href="#servicios" 
              className="text-2xl font-medium text-white hover:text-secondary transition-colors"
              onClick={closeMobileMenu}
            >
              Nuestros Servicios
            </a>
            <a 
              href="#galeria" 
              className="text-2xl font-medium text-white hover:text-secondary transition-colors"
              onClick={closeMobileMenu}
            >
              Galería
            </a>
            <a 
              href="#testimonios" 
              className="text-2xl font-medium text-white hover:text-secondary transition-colors"
              onClick={closeMobileMenu}
            >
              Testimonios
            </a>
            <a 
              href="#por-que-elegirnos" 
              className="text-2xl font-medium text-white hover:text-secondary transition-colors"
              onClick={closeMobileMenu}
            >
              ¿Por qué elegirnos?
            </a>
            <a 
              href="#contacto" 
              className="text-2xl font-medium text-white hover:text-secondary transition-colors"
              onClick={closeMobileMenu}
            >
              Contacto
            </a>
            <a
              href="https://wa.me/593986286990"
              className="mt-8 inline-flex items-center justify-center gap-2 bg-secondary hover:bg-yellow-600 text-secondary-foreground py-3 px-6 rounded-md text-lg font-medium transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="shrink-0"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </nav>
        </div>
      </div>

      {/* WhatsApp Button Fixed para todos los dispositivos */}
      <a
        href="https://api.whatsapp.com/send/?phone=593986286990&text&type=phone_number&app_absent=0"
        className="fixed bottom-8 right-8 z-50 whatsapp-fixed bg-secondary hover:bg-yellow-600 text-secondary-foreground p-4 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="shrink-0"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      <main>
        {/* Hero Section - Full Screen with Background Image and Slider */}
        <section id="inicio" className="relative min-h-screen flex items-center justify-center bg-none text-foreground">
          {/* Background Image Slider with Overlay */}
          <div className="absolute inset-0 z-0">
            {heroImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === heroSlideIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevHeroSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-accent/80 text-white p-2 rounded-full hover:bg-accent transition-colors"
            aria-label="Imagen anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNextHeroSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-accent/80 text-white p-2 rounded-full hover:bg-accent transition-colors"
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
                  index === heroSlideIndex ? "bg-secondary" : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="container max-w-screen-xl mx-auto px-4 text-center relative z-10 pt-16 md:pt-24">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-extrabold mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] leading-tight" style={{ color: '#FFFFFF' }}>
              Expertos en <span className="whitespace-nowrap">Medidores de Luz</span> <span className="whitespace-nowrap">en Loja, Ecuador</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-white/90">
              <span className="hidden md:inline">Reparación, venta e instalación profesional de medidores eléctricos. Soluciones confiables para tu hogar o negocio en Loja. Atención inmediata 24/7.</span>
              <span className="md:hidden">Reparación y venta de medidores eléctricos en Loja. ¡Solución inmediata!</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/593986286990"
                className="inline-flex items-center justify-center bg-secondary hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-md text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
                </svg>
                WhatsApp
              </a>
              <a
                href="tel:+593986286990"
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-md text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl border border-white/20"
              >
                <Phone size={20} className="mr-2" />
                Llamar Ahora
              </a>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section id="casos-exito-video" className="bg-white py-16">
          <div className="container max-w-screen-xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Nuestros Proyectos en Acción</h2>
            <div className="w-full max-w-md mx-auto mt-12 rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative" style={{ paddingBottom: '177.78%' }}> {/* 9:16 Aspect Ratio for Reels */}
                <video
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  src="/images/Video.mp4"
                  title="Nuestros Proyectos en Acción"
                  controls
                  playsInline
                  style={{ objectFit: 'cover' }}
                  preload="metadata"
                >
                  Tu navegador no soporta el elemento de video.
                </video>
                {/* Instagram-like controls overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
                  <div className="flex justify-between w-full">
                    <div className="bg-black/30 backdrop-blur-sm rounded-full p-2 pointer-events-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="bg-black/30 backdrop-blur-sm rounded-full p-2 pointer-events-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                        <path d="M10 12a1 1 0 100-2 1 1 0 000 2z" />
                        <path d="M10 9a1 1 0 01-1-1V6a1 1 0 112 0v2a1 1 0 01-1 1z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex justify-center space-x-4 mb-4">
                    <button className="bg-transparent border-2 border-white rounded-full p-3 pointer-events-auto hover:bg-white/20 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quiénes Somos Section */}
        <section id="quienes-somos" className="bg-gray-50 py-20">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Expertos en Medidores de Luz en Loja</h2>
              <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Especialistas en reparación e instalación de medidores eléctricos para hogares y negocios en Loja</p>
            </div>
            
            {/* Mobile Slider */}
            <div className="md:hidden mb-12 relative">
              <div 
                ref={sliderRef}
                className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth -mx-4 px-4 pb-4"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {[0, 1, 2].map((index) => (
                  <div key={index} className="flex-shrink-0 w-full px-2 snap-start">
                    {index === 0 && (
                      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mx-auto" style={{ maxWidth: '400px' }}>
                        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-gray-900 text-center">Nuestra Misión</h3>
                        <p className="text-gray-600 text-center">
                          <span className="text-black">Proporcionar soluciones eléctricas innovadoras y confiables que mejoren la calidad de vida de nuestros clientes, garantizando siempre la máxima seguridad y eficiencia energética.</span>
                        </p>
                      </div>
                    )}
                    {index === 1 && (
                      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mx-auto" style={{ maxWidth: '400px' }}>
                        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-gray-900 text-center">10+ Años de Experiencia</h3>
                        <p className="text-gray-600 text-center">
                          <span className="text-black">Con más de una década en el mercado, hemos desarrollado el conocimiento y la experiencia necesarios para ofrecer soluciones eléctricas de la más alta calidad en toda la región.</span>
                        </p>
                      </div>
                    )}
                    {index === 2 && (
                      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mx-auto" style={{ maxWidth: '400px' }}>
                        <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-gray-900 text-center">Nuestro Compromiso</h3>
                        <p className="text-gray-600 text-center">
                          <span className="text-black">En Reubí Elec nos comprometemos con la satisfacción total de nuestros clientes, ofreciendo garantía en todos nuestros servicios y asesoramiento personalizado para cada necesidad.</span>
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* Dots indicator */}
              <div className="flex justify-center mt-4 space-x-2">
                {[0, 1, 2].map((dot) => (
                  <button
                    key={dot}
                    onClick={() => scrollToCard(dot)}
                    className={`w-2 h-2 rounded-full transition-colors ${dot === currentCardIndex ? 'bg-secondary w-4' : 'bg-gray-300'}`}
                    aria-label={`Ir a tarjeta ${dot + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-3 gap-8 mb-16">
              {/* Misión */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Nuestra Misión</h3>
                <p className="text-gray-600">
                  <span className="text-black">Proporcionar soluciones eléctricas innovadoras y confiables que mejoren la calidad de vida de nuestros clientes, garantizando siempre la máxima seguridad y eficiencia energética.</span>
                </p>
              </div>
              
              {/* Experiencia */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">10+ Años de Experiencia</h3>
                <p className="text-gray-600">
                  <span className="text-black">Con más de una década en el mercado, hemos desarrollado el conocimiento y la experiencia necesarios para ofrecer soluciones eléctricas de la más alta calidad en toda la región.</span>
                </p>
              </div>
              
              {/* Compromiso */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-2">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">Nuestro Compromiso</h3>
                <p className="text-gray-600">
                  <span className="text-black">En Reubí Elec nos comprometemos con la satisfacción total de nuestros clientes, ofreciendo garantía en todos nuestros servicios y asesoramiento personalizado para cada necesidad.</span>
                </p>
              </div>
            </div>
            
            {/* Sobre Nosotros */}
            <div className="max-w-5xl mx-auto bg-white p-8 md:p-10 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 text-center">Sobre Nosotros</h3>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-gray-600 mb-4">
                    <span className="text-black">En Reubí Elec nos especializamos en la instalación y mantenimiento de medidores de luz, cajas de distribución y soluciones eléctricas para hogares y negocios. Nuestro equipo de técnicos certificados garantiza un servicio profesional y de calidad.</span>
                  </p>
                  <p className="text-black">
                    Nos enorgullece ofrecer soluciones personalizadas que se adaptan a las necesidades específicas de cada cliente, asegurando la máxima eficiencia energética y seguridad en cada instalación.
                  </p>
                </div>
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
                  <Image 
                    src="/images/Sobre Nosotros.jpg" 
                    alt="Equipo de trabajo de Reubí Elec" 
                    fill 
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section with Sliders */}
        <section id="servicios" className="bg-gray-100 py-16">
          <div className="container max-w-screen-xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Reparación y Venta de Medidores en Loja</h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Soluciones profesionales para problemas con tu medidor de luz
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Service Card 1 - Medidores de luz digitales y convencionales */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="text-5xl text-primary text-center mb-4">🔌</div>
                  <h3 className="text-xl font-bold text-center mb-3">Medidores de luz digitales y convencionales</h3>
                  <p className="text-gray-600 text-center">
                    Instalamos cajas metálicas y plásticas para sistemas monofásicos, bifásicos o trifásicos.
                  </p>
                </div>

                {/* Slider for Industria Alimenticia */}
                <div className="relative">
                  <div
                    ref={sliderRefs.alimentaria}
                    className="relative w-full h-64 bg-gray-100 touch-slider overflow-hidden"
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
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            openLightbox('alimentaria', index)
                          }}
                          className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                          aria-label="Ver imagen en pantalla completa"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </button>
                      </div>
                    ))}

                    {/* Navigation Arrows */}
                    <button
                      onClick={() => handlePrevSlide("alimentaria")}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-secondary text-secondary-foreground p-1.5 rounded-full hover:bg-yellow-600 transition-colors shadow-md w-8 h-8 flex items-center justify-center"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => handleNextSlide("alimentaria")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-secondary text-secondary-foreground p-1.5 rounded-full hover:bg-yellow-600 transition-colors shadow-md w-8 h-8 flex items-center justify-center"
                      aria-label="Imagen siguiente"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Service Card 2 - Medidores de luz recargables e inteligentes */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="text-5xl text-primary text-center mb-4">⚡</div>
                  <h3 className="text-xl font-bold text-center mb-3">Medidores de luz recargables e inteligentes</h3>
                  <p className="text-gray-600 text-center">
                    Adaptamos tu red eléctrica a medidores de luz modernos y sistemas de prepago.
                  </p>
                </div>

                {/* Slider for Línea Hogar */}
                <div className="relative">
                  <div
                    ref={sliderRefs.hogar}
                    className="relative w-full h-64 bg-gray-100 touch-slider overflow-hidden"
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
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            openLightbox('hogar', index)
                          }}
                          className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                          aria-label="Ver imagen en pantalla completa"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </button>
                      </div>
                    ))}

                    {/* Navigation Arrows */}
                    <button
                      onClick={() => handlePrevSlide("hogar")}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-secondary text-secondary-foreground p-1.5 rounded-full hover:bg-yellow-600 transition-colors shadow-md w-8 h-8 flex items-center justify-center"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => handleNextSlide("hogar")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-secondary text-secondary-foreground p-1.5 rounded-full hover:bg-yellow-600 transition-colors shadow-md w-8 h-8 flex items-center justify-center"
                      aria-label="Imagen siguiente"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Service Card 3 - Cajas para agua potable, TV y telecomunicaciones */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="text-5xl text-primary text-center mb-4">📦</div>
                  <h3 className="text-xl font-bold text-center mb-3">Cajas para agua potable, TV y telecomunicaciones</h3>
                  <p className="text-gray-600 text-center">
                    Fabricación a medida de cajas seguras para diferentes tipos de servicios públicos.
                  </p>
                </div>

                {/* Slider for Línea Hospitalaria */}
                <div className="relative">
                  <div
                    ref={sliderRefs.hospitalaria}
                    className="relative w-full h-64 bg-gray-100 touch-slider overflow-hidden"
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
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            openLightbox('hospitalaria', index)
                          }}
                          className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                          aria-label="Ver imagen en pantalla completa"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </button>
                      </div>
                    ))}

                    {/* Navigation Arrows */}
                    <button
                      onClick={() => handlePrevSlide("hospitalaria")}
                      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-secondary text-secondary-foreground p-1.5 rounded-full hover:bg-yellow-600 transition-colors shadow-md w-8 h-8 flex items-center justify-center"
                      aria-label="Imagen anterior"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => handleNextSlide("hospitalaria")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-secondary text-secondary-foreground p-1.5 rounded-full hover:bg-yellow-600 transition-colors shadow-md w-8 h-8 flex items-center justify-center"
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Clientes Satisfechos con Nuestros Medidores en Loja</h2>

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
                  <div className="relative z-10 p-6 flex flex-col h-full justify-end">
                    <p className="italic mb-4 line-clamp-4" style={{ color: '#FFFFFF' }}>{testimonial.text}</p>
                    <div>
                      <p className="font-bold text-lg" style={{ color: '#FFFFFF' }}>{testimonial.name}</p>
                      <p className="text-sm" style={{ color: '#FFFFFF' }}>{testimonial.role}</p>
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
                    <div className="bg-white p-6 rounded-lg shadow-md relative">
                      <div className="absolute -top-4 -left-4 text-4xl text-primary">"</div>
                      <p className="mb-4" style={{ color: '#000000' }}>{testimonial.text}</p>
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-accent/20 mr-4 overflow-hidden flex items-center justify-center">
                          <Image
                            src={testimonial.image || "/placeholder-user.jpg"}
                            alt={testimonial.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold" style={{ color: '#000000' }}>{testimonial.name}</p>
                          <p className="text-sm" style={{ color: '#000000' }}>{testimonial.role}</p>
                        </div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Preguntas sobre Medidores de Luz en Loja</h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Resolvemos tus dudas sobre reparación e instalación de medidores
            </p>

            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-accent/20 pb-4 mb-4"
                  onClick={() => toggleFaq(index)}
                >
                  <button className="w-full flex justify-between items-center text-left group">
                    <h4 className="font-medium text-lg text-accent group-hover:text-primary transition-colors">
                      {faq.question}
                    </h4>
                    <div className="p-1 rounded-full group-hover:bg-accent/10 transition-colors">
                      <ChevronDown
                        size={20}
                        className={`transition-transform duration-200 text-accent ${
                          activeFaqIndex === index ? "transform rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      activeFaqIndex === index ? "max-h-96 mt-3 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-muted-foreground">{faq.answer}</p>
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
            <h2 className="text-3xl font-bold text-center mb-12">Soporte para Medidores de Luz en Loja</h2>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Contact Info */}
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-primary mb-8 pb-4 border-b border-gray-200">Información de Contacto</h3>
                <div className="space-y-8">
                  {/* Location */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-50 p-3 rounded-full text-primary">
                      <MapPin size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">TRABAJAMOS EN LOJA, ECUADOR Y ALREDEDORES</h3>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-50 p-3 rounded-full text-green-600">
                      <MessageSquare size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">ESCRÍBENOS DIRECTO POR WHATSAPP</h3>
                      <a 
                        href="https://wa.me/593986286990" 
                        className="text-primary hover:underline inline-block mt-1 text-base font-medium transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        👉 Enviar mensaje ahora
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-50 p-3 rounded-full text-primary">
                      <PhoneCall size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">LLÁMANOS DIRECTAMENTE</h3>
                      <a 
                        href="tel:+593986286990" 
                        className="text-black hover:text-primary transition-colors text-base font-medium"
                      >
                        +593 98 628 6990
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-50 p-3 rounded-full text-primary">
                      <Map size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">UBICACIÓN FÍSICA</h3>
                      <p className="text-black mb-3">
                        Rocafuerte entre Olmedo y Juan Jose Peña, Loja, Ecuador 162-30
                        <span className="block text-sm text-gray-800 mt-1">(Referencia: Junto a la EERSSA, Edificio Radio Luz y Vida)</span>
                      </p>
                      <a 
                        href="https://maps.app.goo.gl/8FRuW5WTBLXmJwFo8" 
                        className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MapPin size={16} className="mr-1" /> Ver en Google Maps
                      </a>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-50 p-3 rounded-full text-primary">
                      <Share2 size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">SÍGUENOS</h3>
                      <div className="flex space-x-4">
                        <a 
                          href="https://facebook.com/reubielec" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gray-100 hover:bg-blue-100 p-2 rounded-full text-blue-600 transition-colors"
                          aria-label="Facebook"
                        >
                          <Facebook size={20} />
                        </a>
                        <a 
                          href="https://instagram.com/reubielec" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gray-100 hover:bg-pink-100 p-2 rounded-full text-pink-600 transition-colors"
                          aria-label="Instagram"
                        >
                          <Instagram size={20} />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <span className="text-xl mt-1">📩</span>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Horarios y atención</h3>
                      <p className="text-gray-600">
                        Lunes a Sábado — 8h00 a 18h00
                        <br />
                        <span className="text-sm">Contáctanos fuera de horario y te responderemos a la brevedad.</span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <a 
                      href="https://wa.me/593986286990" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary/90 text-foreground font-medium py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
                    >
                      <MessageCircle className="w-5 h-5" />
                      ¡Solicita tu instalación ahora!
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Envíanos un mensaje</h3>
                <form 
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsSubmitting(true);
                    setSubmitStatus({ type: null, message: '' });

                    try {
                      const response = await fetch('/api/send-email', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                      });

                      const data = await response.json();
                      
                      if (response.ok) {
                        setSubmitStatus({ type: 'success', message: '¡Mensaje enviado con éxito!' });
                        setFormData({ name: '', email: '', phone: '', message: '' });
                      } else {
                        throw new Error(data.error || 'Error al enviar el mensaje');
                      }
                    } catch (error) {
                      setSubmitStatus({ 
                        type: 'error', 
                        message: 'Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.' 
                      });
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                      required
                    ></textarea>
                  </div>
                  {submitStatus.message && (
                    <div className={`p-3 rounded-md ${
                      submitStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {submitStatus.message}
                    </div>
                  )}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-secondary hover:bg-secondary/90 text-foreground font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        'Enviando...'
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Enviar mensaje
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Map Section - Full width below the two columns */}
            <div className="mt-16 w-full">
              <div className="w-full flex justify-center">
                <h3 className="text-2xl font-bold mb-8 text-center inline-block">Encuéntranos Aquí</h3>
              </div>
              <div className="relative w-full px-2 md:px-8">
                <div className="relative" style={{ paddingBottom: '40%' }}>
                  <div className="absolute inset-0 rounded-2xl shadow-2xl overflow-hidden mx-auto w-full">
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d329.0845620404659!2d-79.19947582073458!3d-3.997935591703735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sRocafuerte%20entre%20Olmedo%20y%20Juan%20Jose%20Pe%C3%B1a%2C%20Loja%2C%20Ecuador%20162-30!5e1!3m2!1ses-419!2sec!4v1754535941318!5m2!1ses-419!2sec" 
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ubicación de Reubí Elec"
                      className="absolute inset-0 w-full h-full"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-6">
        <div className="container max-w-screen-xl mx-auto px-4 text-center">
          <p className="text-sm">
            Diseñado por @cesarreyesjaramillo.com 2025 Reubí Elec. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home
