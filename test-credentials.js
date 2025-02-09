import { v2 as cloudinary } from 'cloudinary';

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: 'dbvnxip2j', // Tu Cloud Name
  api_key: '143688399255672', // Tu API Key
  api_secret: 'HVwQuz2icspFwP5D4Ip6YRkSNLA' // Tu API Secret
});

// Test de credenciales
cloudinary.api.resources({ max_results: 1 })
  .then((result) => {
    console.log('Conexión exitosa:', result.resources);
  })
  .catch((error) => {
    console.error('Error con las credenciales:', error);
  });
