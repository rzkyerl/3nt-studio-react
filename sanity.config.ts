import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Photo Studio Admin',

  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your_project_id',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',

  basePath: '/admin',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },

  auth: {
    loginMethod: 'dual', // Allows both SAML and email/password
    providers: [
      {
        name: 'sanity',
        title: 'Sanity',
        url: 'https://www.sanity.io/login',
      },
    ],
    // This effectively hides Google/GitHub providers in the embedded studio
    // and forces the use of Sanity's own email/password login
    redirectOnSingle: true,
  },
})
