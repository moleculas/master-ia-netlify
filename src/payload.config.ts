// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

import mongoose from 'mongoose'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

let sharp
try {
  const sharpModule = await import('sharp')
  sharp = sharpModule.default
} catch (e) {
  sharp = null
}
console.log('Environment variables:');
console.log('DATABASE_URI length:', process.env.DATABASE_URI?.length);
console.log('DATABASE_URI starts with:', process.env.DATABASE_URI?.substring(0, 20));
console.log('DATABASE_URI contains mongodb+srv:', process.env.DATABASE_URI?.includes('mongodb+srv'));

try {
  mongoose.set('debug', true);

  const connection = mongoose.createConnection(process.env.DATABASE_URI || '', {
    retryWrites: true,
    w: 'majority'
  });

  connection.on('connected', () => {
    console.log('Mongoose connection successful');
  });

  connection.on('error', (error) => {
    console.error('Mongoose connection error:', error);
  });

} catch (error) {
  console.error('Error trying to connect to MongoDB:', error);
}
export default buildConfig({
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
    connectOptions: {
      retryWrites: true,
      w: 'majority'
    },
  }),
  collections: [Pages, Posts, Media, Categories, Users],
  cors: ['https://master-ia-payload.netlify.app', getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
  routes: {
    admin: '/admin',
    api: '/api',
    graphQL: '/graphql',
    graphQLPlayground: '/graphql-playground',
  },
})