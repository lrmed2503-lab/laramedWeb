// types/global.d.ts
declare global {
  type Producto = {
    _id: string;
    nombre: string;
    slug: string;
    imagenPrincipal?: string;
    imagenes?: string[];
    destacado?: boolean;
    descripcion?: any;
    tabla?: string;
    categoria?: {
      nombre: string;
      slug: string;
    };
  };

  type Categoria = {
    _id: string;
    nombre: string;
    slug: string;
    imagen?: string;
  };

  type Publicacion = {
    _id: string;
    titulo: string;
    imagen?: string;
    descripcion?: any;
    fecha?: string;
  };
}

export {};
