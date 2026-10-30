// Tipos del catálogo que entrega el ERP (`GET /api/web/catalogo`) y reglas puras para mostrarlo.
// Sin acceso a red: se usa en el servidor y en componentes de cliente.

export type Elemento = {
  nombre: string;
  detalle: string | null;
  imagen: string | null;
};

export type Producto = {
  slug: string;
  codigo: string;
  titulo: string;
  nombre: string;
  marca: string | null;
  modelo: string | null;
  pais: string | null;
  registroAgemed: string | null;
  /** Área principal (lo que el equipo es). */
  area: string | null;
  /** Todas sus áreas: la principal y las de «También se usa en» (ERP nuevo). */
  areas?: string[];
  frase: string | null;
  beneficios: string[];
  destacado: boolean;
  fotos: string[];
  actualizado: string;
};

export type Area = { slug: string; nombre: string; productos: number };

export type Oficina = {
  ciudad: string;
  direccion: string | null;
  nota: string | null;
};

export type Empresa = {
  titular: string;
  subtitulo: string;
  nosotros: string;
  desde: string;
  oficinas: string[];
  cobertura: string;
  /** Oficinas con dirección (ERP: Configuración → Página web). Puede faltar en versiones viejas. */
  direcciones?: Oficina[];
  whatsapp: string;
  correo: string;
  facebook: string | null;
  tiktok: string | null;
  direccion: string;
  telefonos: string;
};

export type Catalogo = {
  empresa: Empresa;
  areas: Area[];
  productos: Producto[];
  marcas: Elemento[];
  clientes: Elemento[];
  fotos: Elemento[];
};

/** Catálogo vacío: cuando la web aún no está conectada al ERP. */
export const CATALOGO_VACIO: Catalogo = {
  empresa: {
    titular: "Equipos médicos y servicio técnico para hospitales de Bolivia",
    subtitulo:
      "Ventilación, anestesia, monitoreo, infusión e insumos de marcas internacionales, con instalación, capacitación y mantenimiento de nuestro propio equipo técnico.",
    nosotros: "",
    desde: "2021",
    oficinas: ["La Paz", "El Alto", "Cochabamba"],
    cobertura: "Ventas en todo el país",
    whatsapp: "69722332",
    correo: "info@laramedbo.com",
    facebook: null,
    tiktok: null,
    direccion: "",
    telefonos: "",
  },
  areas: [],
  productos: [],
  marcas: [],
  clientes: [],
  fotos: [],
};

/**
 * Dirección pública de una imagen del ERP. El ERP la entrega como `/api/web/imagen/<id>`; la web
 * la sirve como `/imagenes/<id>` (next.config la pasa al ERP), con `?ancho=` para la versión liviana.
 */
export function urlImagen(ruta: string, ancho?: 160 | 320 | 800 | 1600) {
  const id = ruta.split("/").pop() ?? "";
  return `/imagenes/${id}${ancho ? `?ancho=${ancho}` : ""}`;
}

/** `srcset` con las versiones livianas que da el ERP. */
export function srcsetImagen(ruta: string) {
  return ([320, 800, 1600] as const)
    .map((a) => `${urlImagen(ruta, a)} ${a}w`)
    .join(", ");
}

const normalizar = (t: string) =>
  t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** El producto aparece en el área: la principal o una de «También se usa en». */
export function estaEnArea(p: Producto, area: string) {
  return p.area === area || (p.areas ?? []).includes(area);
}

/** Área del ERP (Configuración → Página web) de los equipos de uso veterinario. */
export const AREA_VETERINARIA = "veterinaria";

/**
 * Los equipos veterinarios (área principal «Veterinaria») van en su propia sección (/veterinaria):
 * no se mezclan con el catálogo médico, el inicio ni las áreas del hospital.
 */
export function separarVeterinaria(c: Catalogo) {
  const esVet = (p: Producto) => p.area === AREA_VETERINARIA;
  return {
    medico: {
      ...c,
      areas: c.areas.filter((a) => a.slug !== AREA_VETERINARIA),
      productos: c.productos.filter((p) => !esVet(p)),
    },
    veterinarios: c.productos.filter(esVet),
  };
}

/** Familias del catálogo: salen del tipo de producto del ERP (prefijo del código EQ-, CON-, REP-). */
export type Familia = "equipos" | "insumos" | "repuestos";

export const FAMILIAS: Record<
  Familia,
  {
    nombre: string;
    ruta: string;
    /** Texto corto para el menú y las tarjetas del inicio. */
    detalle: string;
    /** Título para Google de la familia o de una de sus áreas. */
    tituloGoogle: string;
    buscar: string;
    vacio: string;
  }
> = {
  equipos: {
    nombre: "Equipos médicos",
    ruta: "/productos",
    detalle: "Ventilación, anestesia, monitoreo, infusión y diagnóstico",
    tituloGoogle: "equipos médicos en Bolivia",
    buscar: "Buscar equipo, marca o modelo…",
    vacio: "Importamos bajo pedido. Cuéntenos qué equipo necesita.",
  },
  insumos: {
    nombre: "Insumos y consumibles",
    ruta: "/insumos",
    detalle: "Material de impresión médica e insumos para quirófano y terapia",
    tituloGoogle: "insumos médicos en Bolivia",
    buscar: "Buscar insumo, papel, circuito…",
    vacio: "Cuéntenos qué insumo necesita y le cotizamos.",
  },
  repuestos: {
    nombre: "Repuestos y accesorios",
    ruta: "/repuestos",
    detalle: "Cables, sensores, brazaletes y repuestos para sus equipos",
    tituloGoogle: "repuestos y accesorios para equipos médicos en Bolivia",
    buscar: "Buscar repuesto, sensor, cable…",
    vacio:
      "Díganos el equipo (marca y modelo) y el repuesto que busca: lo conseguimos.",
  },
};

export const ORDEN_FAMILIAS: Familia[] = ["equipos", "insumos", "repuestos"];

/** Familia del producto según su código (CON- insumos, REP- repuestos; lo demás, equipos). */
export function familiaDe(p: Pick<Producto, "codigo">): Familia {
  const prefijo = p.codigo.split("-")[0]?.toUpperCase();
  if (prefijo === "CON") return "insumos";
  if (prefijo === "REP") return "repuestos";
  return "equipos";
}

export const deFamilia = (productos: Producto[], f: Familia) =>
  productos.filter((p) => familiaDe(p) === f);

/** Áreas con al menos un producto de la lista, con la cuenta de esa lista. */
export function areasConProductos(areas: Area[], productos: Producto[]) {
  return areas
    .map((a) => ({
      ...a,
      productos: productos.filter((p) => estaEnArea(p, a.slug)).length,
    }))
    .filter((a) => a.productos > 0);
}

/**
 * Repuestos y accesorios que comparten un área con el equipo (p. ej. sensores y brazaletes para
 * un monitor). Primero los del área principal del equipo.
 */
export function repuestosPara(productos: Producto[], p: Producto, cuantos = 3) {
  const areas = new Set([p.area, ...(p.areas ?? [])].filter(Boolean));
  const puntos = (r: Producto) =>
    p.area && estaEnArea(r, p.area)
      ? 2
      : [...areas].some((a) => estaEnArea(r, a as string))
        ? 1
        : 0;
  return deFamilia(productos, "repuestos")
    .map((r) => ({ r, n: puntos(r) }))
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n - a.n)
    .slice(0, cuantos)
    .map((x) => x.r);
}

export type Filtros = { area?: string; marca?: string; q?: string };

/** Productos que pasan los filtros del catálogo (área, marca y texto, sin tildes). */
export function filtrarProductos(productos: Producto[], f: Filtros) {
  const palabras = normalizar(f.q ?? "")
    .split(/\s+/)
    .filter(Boolean);
  const marca = f.marca ? normalizar(f.marca) : "";
  return productos.filter((p) => {
    if (f.area && !estaEnArea(p, f.area)) return false;
    if (marca && normalizar(p.marca ?? "") !== marca) return false;
    if (!palabras.length) return true;
    const texto = normalizar(
      [p.titulo, p.nombre, p.modelo, p.marca, p.frase, p.codigo]
        .filter(Boolean)
        .join(" "),
    );
    return palabras.every((w) => texto.includes(w));
  });
}

/** Marcas de los productos publicados (sin repetir, en mayúsculas, por orden alfabético). */
export function marcasDeProductos(productos: Producto[]) {
  const vistas = new Map<string, string>();
  for (const p of productos) {
    const m = p.marca?.trim();
    if (m && !vistas.has(normalizar(m)))
      vistas.set(normalizar(m), m.toUpperCase());
  }
  return [...vistas.values()].sort((a, b) => a.localeCompare(b, "es"));
}

/** Destacados para el inicio: primero los marcados; si faltan, completa con los que tienen foto. */
export function destacados(productos: Producto[], cuantos = 4) {
  const marcados = productos.filter((p) => p.destacado);
  const resto = productos.filter((p) => !p.destacado && p.fotos.length > 0);
  return [...marcados, ...resto].slice(0, cuantos);
}

/** «También le puede interesar»: misma área principal, otra área en común, luego misma marca. */
export function relacionados(productos: Producto[], p: Producto, cuantos = 3) {
  const otros = productos.filter((o) => o.slug !== p.slug);
  const puntos = (o: Producto) =>
    (o.area && o.area === p.area
      ? 2
      : (o.areas ?? []).some((a) => estaEnArea(p, a))
        ? 1
        : 0) +
    (o.marca && p.marca && normalizar(o.marca) === normalizar(p.marca)
      ? 1
      : 0) +
    (o.fotos.length ? 0.5 : 0);
  return otros
    .map((o) => ({ o, n: puntos(o) }))
    .filter((x) => x.n >= 1)
    .sort((a, b) => b.n - a.n)
    .slice(0, cuantos)
    .map((x) => x.o);
}

/** Foto que representa un área en el inicio: la de un producto con foto, primero los del área principal. */
export function fotoDeArea(productos: Producto[], area: string) {
  const conFoto = productos.filter((p) => p.fotos.length);
  return (
    (
      conFoto.find((p) => p.area === area) ??
      conFoto.find((p) => estaEnArea(p, area))
    )?.fotos[0] ?? null
  );
}

/** Celular boliviano para wa.me (591 + 8 dígitos). */
export function numeroWhatsapp(celular: string) {
  const d = celular.replace(/\D/g, "");
  return d.length === 8 ? `591${d}` : d;
}

export function enlaceWhatsapp(celular: string, texto?: string) {
  const base = `https://wa.me/${numeroWhatsapp(celular)}`;
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base;
}

/** «Etiqueta» de la tarjeta: marca y país en mayúsculas («AEONMED · CHINA»). */
export function etiquetaProducto(p: Pick<Producto, "marca" | "pais">) {
  return [p.marca, p.pais]
    .map((t) => t?.trim())
    .filter(Boolean)
    .join(" · ")
    .toUpperCase();
}

/** Descripción para Google (máximo ~155 caracteres). */
export function descripcionProducto(p: Producto) {
  const base =
    p.frase?.trim() ||
    [p.nombre, p.marca && `marca ${p.marca}`, p.modelo && `modelo ${p.modelo}`]
      .filter(Boolean)
      .join(", ");
  const texto = `${base}. Cotización, instalación y servicio técnico en Bolivia.`;
  return texto.length <= 158
    ? texto
    : `${texto.slice(0, 155).replace(/\s+\S*$/, "")}…`;
}

/** Oficinas para «Nosotros»: las del ERP o, si no hay, las ciudades sin dirección. */
export function oficinasDeEmpresa(e: Empresa): Oficina[] {
  if (e.direcciones?.length) return e.direcciones;
  return e.oficinas.map((ciudad) => ({ ciudad, direccion: null, nota: null }));
}

/** «Cómo llegar» en Google Maps a partir de la dirección y la ciudad. */
export function enlaceMapa(o: Oficina) {
  const q = [o.direccion, o.ciudad, "Bolivia"].filter(Boolean).join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}
