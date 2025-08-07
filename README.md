# METALCA Landing Page

Este proyecto contiene el código fuente para la página web de METALCA, una empresa de servicios metalmecánicos.

## Características Principales

1. **Hero Slider Automático**
   - Ubicación: Sección principal al inicio de la página
   - Funcionalidad: Cambia automáticamente entre imágenes cada 7 segundos
   
   ### Cómo modificar:
   - **Ajustar tiempo de espera**: En `app/page.tsx`, busca la variable `HERO_SLIDE_INTERVAL` y cambia su valor (en milisegundos)
   - **Agregar/quitar imágenes**: En `app/page.tsx`, modifica el array `heroImages` añadiendo o eliminando objetos con `src` y `alt`
   - **Cambiar estilos**: Los estilos de flechas e indicadores se encuentran en las clases CSS dentro de la sección Hero

2. **Galería Filtrable por Categorías**
   - Ubicación: Debajo de la sección "Nuestros Servicios"
   - Funcionalidad: Permite filtrar imágenes por categoría (Todas, Alimentaria, Hogar, Hospitalaria)
   
   ### Cómo modificar:
   - **Añadir nuevas categorías**: 
     1. En `app/page.tsx`, añade la nueva categoría al array `categories`
     2. Agrega nuevas imágenes al array `galleryImages` con el `category` correspondiente
   - **Cambiar diseño del grid**: Modifica las clases CSS en el contenedor de la galería (por ejemplo, cambiar `grid-cols-2 md:grid-cols-3` para ajustar el número de columnas)

3. **Testimonios con Slider en Móvil**
   - Ubicación: Sección "Clientes Satisfechos"
   - Funcionalidad: Muestra testimonios en cards rectangulares, con slider en vista móvil
   
   ### Cómo modificar:
   - **Añadir/editar testimonios**: En `app/page.tsx`, modifica el array `testimonials`
   - **Cambiar estilos**: Ajusta las clases CSS en los componentes de testimonios

4. **Preguntas Frecuentes (Acordeón)**
   - Ubicación: Sección final antes del contacto
   - Funcionalidad: Acordeón que muestra/oculta respuestas al hacer clic en las preguntas
   
   ### Cómo modificar:
   - **Añadir/editar preguntas**: En `app/page.tsx`, modifica el array `faqItems`
   - **Cambiar comportamiento**: Ajusta la lógica en la función `toggleFaq`

## Responsividad

El sitio está diseñado para ser completamente responsivo:
- El slider del hero se adapta a todos los tamaños de pantalla
- La galería filtrable cambia de 3 columnas en escritorio a 2 y 1 en tablets y móviles
- Los testimonios se muestran en grid en escritorio y como slider en móvil
- El acordeón de FAQ tiene botones suficientemente grandes para interacción táctil
\`\`\`

Ahora, vamos a actualizar el archivo principal con todas las características solicitadas:
