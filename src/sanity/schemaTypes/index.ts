import { type SchemaTypeDefinition } from 'sanity'
import { servicePackage } from './servicePackage'
import { navbar } from './Navbar'
import { hero } from './Hero'
import { featuredWork } from './FeaturedWork'
import { workProject } from './workProject'
import { about } from './About'
import { benefits } from './Benefits'
import { process } from './Process'
import { testimonials } from './Testimonials'
import { contactSection } from './Contactsection'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    servicePackage, 
    navbar, 
    hero, 
    featuredWork,
    workProject,
    about,
    benefits,
    process, 
    testimonials, 
    contactSection, 
  ], 
}
