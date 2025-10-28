import { defineType, defineField } from 'sanity'

export const publicacion = defineType({
  name: 'publicacion',
  title: 'Publicaciones',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required().error('El título es obligatorio'),
    }),
    defineField({
      name: 'imagen',
      title: 'Imagen',
      type: 'image',
      validation: (Rule) => Rule.required().error('La imagen es obligatoria'),
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'blockContent', // 🔹 Ahora usa Portable Text
      validation: (Rule) => Rule.required().error('La descripción es obligatoria'),
    }),
    defineField({
      name: 'fecha',
      title: 'Fecha',
      type: 'datetime',
      validation: (Rule) => Rule.required().error('La fecha es obligatoria'),
    }),
  ],
  preview: {
    select: {
      title: 'titulo',
      media: 'imagen',
      subtitle: 'fecha',
    },
    prepare({ title, media, subtitle }) {
      return {
        title,
        media,
        subtitle: subtitle
          ? new Date(subtitle).toLocaleDateString('es-BO', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : '',
      }
    },
  },
})
