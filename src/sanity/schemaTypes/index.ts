import { type SchemaTypeDefinition } from 'sanity'
import { servicePackage } from './servicePackage'
import { navbar } from './Navbar'
import { hero } from './Hero'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [servicePackage, navbar, hero], 
}
