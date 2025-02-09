import fs from 'fs'
import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

const cloudinaryImages = JSON.parse(fs.readFileSync('cloudinary-images.json', 'utf-8'))

const PAYLOAD_API_URL = process.env.PAYLOAD_API_URL || 'https://master-ia-payload.netlify.app/api/media'
const PAYLOAD_SECRET = process.env.PAYLOAD_SECRET

if (!PAYLOAD_SECRET) {
  console.error('ERROR: PAYLOAD_SECRET no está definido en el entorno.')
  process.exit(1)
}

async function uploadImagesToPayload() {
  for (const image of cloudinaryImages) {
    const payloadData = {
      filename: image.public_id,
      url: image.secure_url,
      public_id: image.public_id,
      width: image.width,
      height: image.height,
      format: image.format,
      size: image.bytes,
    }

    try {
      const response = await fetch(PAYLOAD_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${PAYLOAD_SECRET}`,
        },
        body: JSON.stringify(payloadData),
      })

      if (!response.ok) {
        console.error(`Error subiendo ${image.public_id}:`, await response.text())
      } else {
        console.log(`Imagen subida correctamente: ${image.public_id}`)
      }
    } catch (error) {
      console.error(`Error en la solicitud para ${image.public_id}:`, error)
    }
  }
}

uploadImagesToPayload()
