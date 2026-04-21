import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemas'
import { StudioLogo, StudioNavbar } from './src/sanity/components/StudioBranding'
import { Home, FileText, Layout, Users, Briefcase, Award, Calendar, Image } from 'lucide-react'

export default defineConfig({
  name: 'default',
  title: '3NT STUDIO',

  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your_project_id',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',

  basePath: '/admin',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('3NT STUDIO Content')
          .items([
            // GRUP: HOME PAGES
            S.listItem()
              .title('Home Page')
              .icon(Home)
              .child(
                S.list()
                  .title('Home Page Management')
                  .items([
                    S.documentTypeListItem('homeContent').title('Home Content').icon(FileText),
                    S.documentTypeListItem('services').title('Service Item').icon(Briefcase),
                    S.documentTypeListItem('team').title('Team Member').icon(Users),
                    S.documentTypeListItem('clients').title('Client Logo').icon(Award),
                    S.documentTypeListItem('testimonials').title('Testimonial').icon(Layout),
                  ])
              ),

            S.divider(), // Garis pembatas

            // MENU LAINNYA
            S.documentTypeListItem('portfolio').title('Portfolio').icon(Image),
            S.documentTypeListItem('pricing').title('Pricing').icon(FileText),
            S.documentTypeListItem('booking').title('Booking Reservations').icon(Calendar),
          ]),
    }),
  ],

  studio: {
    components: {
      logo: StudioLogo,
      navbar: StudioNavbar,
    }
  },

  schema: {
    types: schemaTypes,
  },

  auth: {
    loginMethod: 'dual',
    providers: [
      {
        name: 'sanity',
        title: 'Sanity',
        url: 'https://www.sanity.io/login',
      },
    ],
    redirectOnSingle: true,
  },
})
