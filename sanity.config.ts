'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'
import { servicePackage } from './src/sanity/schemaTypes/servicePackage'
import { navbar } from './src/sanity/schemaTypes/Navbar'
import { hero } from './src/sanity/schemaTypes/Hero'
import { featuredWork } from './src/sanity/schemaTypes/FeaturedWork'
import { workProject } from './src/sanity/schemaTypes/workProject'
import { about } from './src/sanity/schemaTypes/About'
import { benefits } from './src/sanity/schemaTypes/Benefits'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema: { types: [
    servicePackage, 
    navbar, 
    hero, 
    featuredWork,
    workProject,
    about, 
    benefits,
  ]},
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
