import { Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FormularioSolicitud } from "@/components/formulario-solicitud";
import { BarraMovil } from "@/components/pie";
import { claseBoton, IconoWhatsapp, TarjetaProducto } from "@/components/ui";
import { obtenerCatalogoCompleto } from "@/lib/catalogo";
import {
  AREA_VETERINARIA,
  descripcionProducto,
  enlaceWhatsapp,
  etiquetaProducto,
  relacionados,
  separarVeterinaria,
  urlImagen,
} from "@/lib/catalogo-base";
import { sitioUrl } from "@/lib/sitio";
import { Galeria } from "./galeria";

export const revalidate = 300;

type Params = Promise<{ slug: string }>;

/** Busca en todo el catálogo: los equipos veterinarios también tienen su ficha aquí. */
async function buscar(slug: string) {
  const c = await obtenerCatalogoCompleto();
  return { c, p: c.productos.find((x) => x.slug === slug) ?? null };
}

export async function generateStaticParams() {
  const c = await obtenerCatalogoCompleto();
  return c.productos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { p } = await buscar((await params).slug);
  if (!p) return { title: "Producto no encontrado" };
  const titulo = `${p.titulo}${p.marca && !p.titulo.toLowerCase().includes(p.marca.toLowerCase()) ? ` ${p.marca}` : ""} en Bolivia`;
  return {
    title: titulo,
    description: descripcionProducto(p),
    alternates: { canonical: `/productos/${p.slug}` },
    openGraph: {
      title: `${titulo} · LaraMed`,
      description: descripcionProducto(p),
      images: p.fotos[0] ? [{ url: urlImagen(p.fotos[0], 1600) }] : undefined,
    },
  };
}

export default async function ProductoPagina({ params }: { params: Params }) {
  const { slug } = await params;
  const { c, p } = await buscar(slug);
  if (!p) notFound();
  // Un equipo veterinario se relaciona solo con otros veterinarios y su ruta pasa por /veterinaria.
  const vet = p.area === AREA_VETERINARIA;
  const { medico, veterinarios } = separarVeterinaria(c);
  const seccion = vet
    ? { nombre: "Veterinaria", href: "/veterinaria" }
    : { nombre: "Productos", href: "/productos" };
  const area = vet ? undefined : c.areas.find((a) => a.slug === p.area);
  const otros = relacionados(vet ? veterinarios : medico.productos, p, 3);
  const nombreArea = new Map(c.areas.map((a) => [a.slug, a.nombre]));
  const usoEn = medico.areas.filter((a) => (p.areas ?? []).includes(a.slug));
  const etiqueta = etiquetaProducto(p);
  const migas = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { name: "Inicio", item: `${sitioUrl()}/` },
      { name: seccion.nombre, item: `${sitioUrl()}${seccion.href}` },
      ...(area
        ? [
            {
              name: area.nombre,
              item: `${sitioUrl()}/productos?area=${area.slug}`,
            },
          ]
        : []),
      { name: p.titulo, item: `${sitioUrl()}/productos/${p.slug}` },
    ].map((x, i) => ({ "@type": "ListItem", position: i + 1, ...x })),
  };
  const datos = [
    p.registroAgemed && ["Registro sanitario", `AGEMED ${p.registroAgemed}`],
    p.pais && ["Origen", p.pais],
    ["Servicio técnico", "Propio en Bolivia"],
  ].filter(Boolean) as [string, string][];

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: datos estructurados para Google
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(migas).replace(/</g, "\\u003c"),
        }}
      />
      <section className="mx-auto max-w-[1240px] px-4 pt-6 pb-16 sm:px-6">
        <nav aria-label="Ruta" className="mb-6 text-sm text-niebla">
          <Link href="/">Inicio</Link> /{" "}
          <Link href={seccion.href}>{seccion.nombre}</Link>
          {area && (
            <>
              {" / "}
              <Link href={`/productos?area=${area.slug}`}>{area.nombre}</Link>
            </>
          )}{" "}
          / {p.titulo}
        </nav>
        <div className="flex flex-wrap items-start gap-10 lg:gap-12">
          <div className="min-w-0 flex-[1_1_440px]">
            <Galeria fotos={p.fotos} alt={p.titulo} />
          </div>
          <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-4.5">
            {etiqueta && (
              <span className="self-start rounded-[10px] bg-hielo px-3 py-1.5 text-xs font-bold tracking-[2px] text-turquesa-profundo">
                {etiqueta}
              </span>
            )}
            <h1 className="m-0 font-titulo text-[32px] leading-[1.1] font-bold text-noche sm:text-[44px]">
              {p.titulo}
            </h1>
            {p.frase && (
              <p className="m-0 text-lg leading-normal text-niebla sm:text-[19px]">
                {p.frase}
              </p>
            )}
            {p.beneficios.length > 0 && (
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-base">
                {p.beneficios.map((b) => (
                  <li key={b} className="flex gap-2.5">
                    <Check
                      className="mt-0.5 size-5 shrink-0 text-turquesa-profundo"
                      aria-hidden="true"
                    />
                    {b}
                  </li>
                ))}
              </ul>
            )}
            {usoEn.length > 1 && (
              <p className="m-0 flex flex-wrap items-center gap-2 text-sm text-niebla">
                Se usa en:
                {usoEn.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/productos?area=${a.slug}`}
                    className="rounded-full border border-linea px-3 py-1 text-tinta no-underline hover:border-azul hover:text-azul"
                  >
                    {a.nombre}
                  </Link>
                ))}
              </p>
            )}
            <dl className="m-0 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {datos.map(([t, v]) => (
                <div key={t} className="rounded-2xl border border-linea p-3.5">
                  <dt className="text-xs text-niebla">{t}</dt>
                  <dd className="m-0 mt-1 text-sm font-bold">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="flex flex-wrap gap-2.5">
              <a href="#solicitud" className={claseBoton("primario")}>
                Solicitar cotización
              </a>
              <a href="#ficha-tecnica" className={claseBoton("bordeAzul")}>
                Solicitar ficha técnica
              </a>
              <a
                href={enlaceWhatsapp(
                  c.empresa.whatsapp,
                  `Hola LaraMed, quisiera información sobre ${p.titulo} (${sitioUrl()}/productos/${p.slug}).`,
                )}
                target="_blank"
                rel="noopener"
                className={claseBoton("borde")}
              >
                <IconoWhatsapp />
                WhatsApp
              </a>
            </div>
            <p className="m-0 text-[13px] text-niebla">
              La ficha técnica completa se envía por correo o WhatsApp a quien
              la solicite.
            </p>
          </div>
        </div>
      </section>

      <section id="solicitud" className="relative bg-hielo">
        <span
          id="ficha-tecnica"
          className="absolute top-0"
          aria-hidden="true"
        />
        <div className="mx-auto flex max-w-[1240px] flex-wrap gap-10 px-4 py-14 sm:px-6 lg:py-16">
          <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-3.5">
            <h2 className="m-0 font-titulo text-[28px] font-semibold text-noche sm:text-[32px]">
              Solicite su cotización o la ficha técnica
            </h2>
            <p className="m-0 text-[17px] leading-relaxed text-niebla">
              Un asesor le responde con la propuesta, plazos de entrega y
              condiciones. Si pide la ficha técnica, se la enviamos por correo o
              WhatsApp.
            </p>
          </div>
          <div className="min-w-0 flex-[1_1_520px]">
            <FormularioSolicitud
              pestanas
              producto={{ slug: p.slug, titulo: p.titulo }}
              pagina={`/productos/${p.slug}`}
              mensajeEtiqueta="Cantidad y comentarios"
              mensajeEjemplo="Ej.: 2 unidades, entrega en Cochabamba"
            />
          </div>
        </div>
      </section>

      {otros.length > 0 && (
        <section className="mx-auto max-w-[1240px] px-4 pt-14 pb-24 sm:px-6">
          <h2 className="mt-0 mb-6 font-titulo text-[26px] font-semibold text-noche">
            También le puede interesar
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otros.map((o) => (
              <TarjetaProducto
                key={o.slug}
                p={o}
                area={nombreArea.get(o.area ?? "")}
              />
            ))}
          </div>
        </section>
      )}
      <BarraMovil whatsapp={c.empresa.whatsapp} cotizar="#solicitud" />
    </>
  );
}
