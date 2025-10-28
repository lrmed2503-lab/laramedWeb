import {defineType, defineField} from 'sanity'

export const categoria = defineType({
  name: 'categoria',
  title: 'Categoría',
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
      title: 'Slug',
      type: 'slug',
      options: { source: 'nombre' },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen',
      type: 'image',
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'nombre',
      media: 'imagen',
    }
  }
})
