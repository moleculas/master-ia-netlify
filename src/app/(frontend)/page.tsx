import PageTemplate, { generateMetadata } from './[slug]/page'

export default PageTemplate

export { generateMetadata }

//import Page from './[slug]/page'

// Función para obtener la página marcada como `isHomePage`
// async function fetchHomePage() {
//   const apiUrl = process.env.PAYLOAD_PUBLIC_URL || 'http://localhost:3000/api' // URL base de tu API
//   const response = await fetch(`${apiUrl}/pages?where[isHomePage][equals]=true`, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })

//   if (!response.ok) {
//     throw new Error('Error al obtener la página de inicio')
//   }

//   const data = await response.json()
//   const homePage = data.docs?.[0] // Tomamos la primera página marcada como inicio

//   if (!homePage) {
//     throw new Error('No se encontró ninguna página marcada como página de inicio')
//   }

//   return homePage.slug // Devuelve el slug de la página de inicio
// }

// export default async function HomePage() {
//   const slug = await fetchHomePage() // Obtén el slug de la página de inicio
//   return <Page params={Promise.resolve({ slug })} /> // Renderiza la página con el slug dinámico
// }
