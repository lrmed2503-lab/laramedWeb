import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {producto} from './producto'
import {categoria} from './categoria'
import {carruselPrincipal} from './carruselPrincipal'
import {publicacion} from './publicacion'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [ blockContentType, producto, categoria, carruselPrincipal, publicacion ],
}
