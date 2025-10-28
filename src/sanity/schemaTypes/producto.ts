import {defineType, defineField, defineArrayMember} from 'sanity'

export const producto = defineType({
  name: 'producto',
  title: 'Producto',
  type: 'document',
  fields: [
    defineField({
      name: 'nombre',
      title: 'Nombre',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Enlace',
      type: 'slug',
      options: { source: 'nombre' },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'imagenPrincipal',
      title: 'Imagen Principal',
      type: 'image',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'imagenes',
      title: 'Imágenes',
      type: 'array',
      of: [defineArrayMember({ type: 'image' })]
    }),
    defineField({
      name: 'destacado',
      title: 'Destacado',
      type: 'boolean'
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'blockContent'
    }),
    defineField({
      name: 'tabla',
      title: 'Tabla',
      type: 'image'
    }),
    defineField({
      name: 'categoria',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'categoria' }]
    })
  ],
  preview: {
    select: {
      title: 'nombre',
      media: 'imagenPrincipal'
    }
  }
})
