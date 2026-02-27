import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Tags } from './collections/Tags'
import { News } from './collections/News'
import { KnowledgeBase } from './collections/KnowledgeBase'
import { Blogs } from './collections/Blogs'
import { Cases } from './collections/Cases'
import { Skills } from './collections/Skills'
import { Hardware } from './collections/Hardware'
import { Events } from './collections/Events'
import { Signups } from './collections/Signups'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- TokenStar AI星球',
    },
  },
  collections: [
    Users,
    Media,
    Categories,
    Tags,
    News,
    KnowledgeBase,
    Blogs,
    Cases,
    Skills,
    Hardware,
    Events,
    Signups,
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'tokenstar_secret_2026',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || 'postgresql://strapi_user:strapi_password@127.0.0.1:5432/tokenstar_db',
    },
  }),
  upload: {
    limits: {
      fileSize: 10000000, // 10MB
    },
  },
  cors: ['http://localhost:3000', 'http://localhost:3001'],
  csrf: ['http://localhost:3000', 'http://localhost:3001'],
})
