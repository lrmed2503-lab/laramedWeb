import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Blog')
    .items([
      S.documentTypeListItem('producto').title('Producto'),
      S.documentTypeListItem('categoria').title('Categoria'),
      S.documentTypeListItem('carruselPrincipal').title('carruselPrincipal'),
      S.documentTypeListItem('publicacion').title('Publicacion'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['producto', 'categoria', 'carruselPrincipal', 'publicacion'].includes(item.getId()!),
      ),
    ])
