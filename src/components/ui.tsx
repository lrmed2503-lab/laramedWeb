import Link from "next/link";
import type { Producto } from "@/lib/catalogo-base";
import { etiquetaProducto, srcsetImagen, urlImagen } from "@/lib/catalogo-base";

// Piezas comunes de la web: botones, títulos de sección, fotos y tarjeta de producto.

const BOTON = {
  primario: "bg-azul text-white hover:bg-noche hover:text-white",
  acento: "bg-turquesa text-noche hover:bg-[#00c2ba] hover:text-noche",
  borde:
    "border border-linea bg-white text-tinta hover:border-azul hover:text-azul",
  bordeAzul:
    "border border-azul bg-white text-azul hover:bg-hielo hover:text-azul",
} as const;

export function claseBoton(v: keyof typeof BOTON = "primario", chico = false) {
  return `inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-semibold no-underline transition-colors ${
    chico ? "px-4 py-2 text-sm" : "px-6 py-3 text-base"
  } ${BOTON[v]}`;
}

export function Antetitulo({
  children,
  claro = false,
}: {
  children: React.ReactNode;
  claro?: boolean;
}) {
  return (
    <p
      className={`m-0 text-[13px] font-bold tracking-[3px] uppercase ${claro ? "text-turquesa" : "text-turquesa-profundo"}`}
    >
      {children}
    </p>
  );
}

export function IconoWhatsapp({
  className = "size-5",
  color = "#25D366",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.6 2.1 1.1 1 2 1.3 2.3 1.4.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z" />
    </svg>
  );
}

/** Foto del ERP en su versión liviana; `sizes` dice qué tamaño ocupa en la pantalla. */
export function Foto({
  ruta,
  alt,
  sizes,
  className,
  prioridad = false,
}: {
  ruta: string;
  alt: string;
  sizes: string;
  className?: string;
  prioridad?: boolean;
}) {
  return (
    // biome-ignore lint/performance/noImgElement: las versiones livianas las da el ERP (?ancho=)
    <img
      src={urlImagen(ruta, 800)}
      srcSet={srcsetImagen(ruta)}
      sizes={sizes}
      alt={alt}
      className={className}
      loading={prioridad ? "eager" : "lazy"}
      fetchPriority={prioridad ? "high" : undefined}
      decoding="async"
    />
  );
}

export function SinFoto({ className = "" }: { className?: string }) {
  return (
    <span
      className={`flex items-center justify-center text-sm text-niebla ${className}`}
    >
      Foto próximamente
    </span>
  );
}

/** Tarjeta del catálogo y de destacados. */
export function TarjetaProducto({
  p,
  area,
  prioridad = false,
}: {
  p: Producto;
  area?: string;
  prioridad?: boolean;
}) {
  const href = `/productos/${p.slug}`;
  const etiqueta = [etiquetaProducto(p), area?.toUpperCase()]
    .filter(Boolean)
    .join(" · ");
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-linea bg-white">
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className="flex h-52 items-center justify-center bg-hielo p-4"
      >
        {p.fotos[0] ? (
          <Foto
            ruta={p.fotos[0]}
            alt=""
            sizes="(max-width: 640px) 90vw, 300px"
            className="block max-h-44 max-w-full object-contain"
            prioridad={prioridad}
          />
        ) : (
          <SinFoto />
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-1.5 px-5 pt-4 pb-5">
        {etiqueta && (
          <span className="text-[11px] font-bold tracking-[2px] text-turquesa-profundo">
            {etiqueta}
          </span>
        )}
        <h3 className="m-0 font-titulo text-[17px] leading-tight font-semibold">
          <Link href={href} className="text-noche no-underline hover:underline">
            {p.titulo}
          </Link>
        </h3>
        {p.frase && (
          <p className="m-0 text-sm leading-snug text-niebla">{p.frase}</p>
        )}
        <div className="mt-auto flex flex-wrap gap-2 pt-3">
          <Link
            href={`${href}#solicitud`}
            className={claseBoton("primario", true)}
          >
            Cotizar
            <span className="sr-only"> {p.titulo}</span>
          </Link>
          <Link href={href} className={claseBoton("borde", true)}>
            Ver detalle
            <span className="sr-only"> de {p.titulo}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
