import { type SchemaTypeDefinition } from 'sanity'
import { servicePackage } from './servicePackage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [servicePackage],
}
