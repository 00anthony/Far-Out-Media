import { type SchemaTypeDefinition } from 'sanity'
import { servicePackage } from './servicePackage'
import { navbar } from './Navbar'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [servicePackage, navbar], 
}
