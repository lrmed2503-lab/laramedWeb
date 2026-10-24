import { Check } from "lucide-react";
import Link from "next/link";
import { FormularioSolicitud } from "@/components/formulario-solicitud";
import { BarraMovil } from "@/components/pie";
import {
  Antetitulo,
  claseBoton,
  Foto,
  IconoWhatsapp,
  SinFoto,
  TarjetaProducto,
} from "@/components/ui";
import { obtenerCatalogo } from "@/lib/catalogo";
import {
  type Area,
  destacados,
  enlaceWhatsapp,
  fotoDeArea,
} from "@/lib/catalogo-base";
import { sitioUrl } from "@/lib/sitio";

export const revalidate = 300;

/** Texto corto de cada área (las 6 de inicio); un área nueva muestra cuántos productos tiene. */
const DETALLE_AREA: Record<string, string> = {
  "cuidados-intensivos":
    "Ventiladores mecánicos y equipos para terapia intensiva y emergencia",
  "quirofano-y-anestesia": "Máquinas de anestesia e insumos para quirófano",
  monitoreo: "Monitores de signos vitales para UTI, emergencia y quirófano",
  infusion: "Bombas de infusión volumétricas y de jeringa",
  diagnostico: "Electrocardiógrafos y equipos de rayos X",
  insumos: "Placas radiográficas, papel de registro, circuitos y filtros",
};
const detalleArea = (a: Area) =>
  DETALLE_AREA[a.slug] ??
  (a.productos === 1 ? "1 producto" : `${a.productos} productos`);

const SERVICIOS = [
  [
    "Servicio técnico",
    "Mantenimiento preventivo y correctivo, también de equipos de otras marcas.",
  ],
  [
    "Contratos de mantenimiento",
    "Visitas programadas, inspecciones y repuestos menores incluidos.",
  ],
  [
    "Alquiler de equipos",
    "Ventiladores y otros equipos por día o por horas de uso.",
  ],
  ["Instalación", "Puesta en marcha en su servicio, con acta de entrega."],
  ["Capacitación", "Formación al personal en el uso y cuidado del equipo."],
] as const;

export default async function Inicio() {
  const c = await obtenerCatalogo();
  const { empresa } = c;
  const lista = destacados(c.productos, 4);
  const principal = lista.find((p) => p.fotos.length) ?? null;
  const areas = c.areas.filter((a) => a.productos > 0);
  const nombreArea = new Map(c.areas.map((a) => [a.slug, a.nombre]));
  const ciudades = empresa.oficinas.join(" · ").toUpperCase();
  const organizacion = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LaraMed S.R.L.",
    url: sitioUrl(),
    logo: `${sitioUrl()}/icon.png`,
    email: empresa.correo,
    telephone: `+591${empresa.whatsapp.replace(/\D/g, "")}`,
    foundingDate: empresa.desde,
    areaServed: "BO",
    sameAs: [empresa.facebook, empresa.tiktok].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: datos estructurados para Google
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizacion).replace(/</g, "\\u003c"),
        }}
      />
      <section className="bg-hielo">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-12 px-4 pt-14 pb-12 sm:px-6 lg:pt-18">
          <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-5">
            <Antetitulo>
              Importadores desde {empresa.desde} · {ciudades}
            </Antetitulo>
            <h1 className="m-0 font-titulo text-[34px] leading-[1.08] font-bold tracking-tight text-noche sm:text-[48px] lg:text-[54px]">
              {empresa.titular}
            </h1>
            <p className="m-0 max-w-[560px] text-lg leading-relaxed text-niebla">
              {empresa.subtitulo}
            </p>
            <div className="mt-1 flex flex-wrap gap-3">
              <Link href="/productos" className={claseBoton("primario")}>
                Ver catálogo
              </Link>
              <Link href="/#contacto" className={claseBoton("acento")}>
                Solicitar cotización
              </Link>
            </div>
          </div>
          {principal && (
            <div className="flex min-w-0 flex-[1_1_380px] justify-center">
              <Link
                href={`/productos/${principal.slug}`}
                className="block w-full max-w-[480px] rounded-[32px] bg-white p-7 no-underline shadow-[0_20px_50px_rgba(2,30,94,0.10)]"
              >
                <Foto
                  ruta={principal.fotos[0]}
                  alt={principal.titulo}
                  sizes="(max-width: 640px) 85vw, 420px"
                  className="block h-72 w-full object-contain sm:h-[380px]"
                  prioridad
                />
                <span className="mt-3 block font-titulo text-lg font-semibold text-noche">
                  {principal.titulo}
                </span>
              </Link>
            </div>
          )}
        </div>
        <div className="mx-auto max-w-[1240px] px-4 pb-14 sm:px-6">
          <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 lg:grid-cols-4">
            {[
              [`Desde ${empresa.desde}`, "importando equipos médicos"],
              [
                empresa.oficinas.length === 1
                  ? "1 oficina"
                  : `${empresa.oficinas.length} oficinas`,
                empresa.oficinas.join(", ").replace(/, ([^,]*)$/, " y $1"),
              ],
              ["Todo Bolivia", empresa.cobertura.toLowerCase()],
              ["Servicio propio", "técnicos de electromedicina"],
            ].map(([dato, texto]) => (
              <li key={dato} className="rounded-2xl bg-white px-5 py-4">
                <p className="m-0 font-titulo text-xl font-bold text-azul sm:text-2xl">
                  {dato}
                </p>
                <p className="mt-1 mb-0 text-sm text-niebla">{texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {areas.length > 0 && (
        <section className="mx-auto max-w-[1240px] px-4 pt-16 pb-8 sm:px-6 lg:pt-20">
          <Antetitulo>Productos por área</Antetitulo>
          <h2 className="mt-2.5 mb-8 font-titulo text-[28px] font-semibold text-noche sm:text-4xl">
            ¿Para qué área del hospital busca?
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a) => {
              const foto = fotoDeArea(c.productos, a.slug);
              return (
                <Link
                  key={a.slug}
                  href={`/productos?area=${a.slug}`}
                  className="flex items-center gap-4 rounded-[20px] border border-linea bg-white p-4 text-tinta no-underline hover:border-azul"
                >
                  {foto ? (
                    <Foto
                      ruta={foto}
                      alt=""
                      sizes="92px"
                      className="size-[92px] shrink-0 rounded-2xl bg-hielo object-contain p-1"
                    />
                  ) : (
                    <span className="size-[92px] shrink-0 rounded-2xl bg-hielo" />
                  )}
                  <span className="flex flex-col gap-1">
                    <span className="font-titulo text-lg font-semibold text-noche">
                      {a.nombre}
                    </span>
                    <span className="text-sm leading-snug text-niebla">
                      {detalleArea(a)}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {lista.length > 0 && (
        <section className="mx-auto max-w-[1240px] px-4 pt-10 pb-20 sm:px-6">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Antetitulo>Destacados</Antetitulo>
              <h2 className="mt-2.5 mb-0 font-titulo text-[28px] font-semibold text-noche sm:text-4xl">
                Equipos más solicitados
              </h2>
            </div>
            <Link href="/productos" className="font-semibold">
              Ver todo el catálogo →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {lista.map((p) => (
              <TarjetaProducto
                key={p.slug}
                p={p}
                area={nombreArea.get(p.area ?? "")}
              />
            ))}
          </div>
        </section>
      )}

      {c.marcas.length > 0 && (
        <section aria-labelledby="marcas" className="bg-hielo">
          <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6">
            <h2
              id="marcas"
              className="mt-0 mb-6 text-center text-[13px] font-bold tracking-[3px] text-niebla uppercase"
            >
              Marcas que representamos
            </h2>
            <ul className="m-0 grid list-none grid-cols-2 gap-3.5 p-0 sm:grid-cols-3 lg:grid-cols-6">
              {c.marcas.map((m) => (
                <li
                  key={m.nombre}
                  className="flex h-20 items-center justify-center rounded-2xl bg-white px-4"
                >
                  {m.imagen ? (
                    <Foto
                      ruta={m.imagen}
                      alt={m.nombre}
                      sizes="160px"
                      className="max-h-12 max-w-full object-contain"
                    />
                  ) : (
                    <span className="font-titulo text-lg font-bold tracking-wide">
                      {m.nombre}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section id="servicios" className="bg-petroleo text-white">
        <div className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6 lg:py-20">
          <Antetitulo claro>Servicios</Antetitulo>
          <h2 className="mt-2.5 mb-3 font-titulo text-[28px] font-semibold sm:text-4xl">
            Acompañamos el equipo durante toda su vida útil
          </h2>
          <p className="mt-0 mb-9 max-w-[640px] text-[17px] leading-normal text-niebla-clara">
            Prevención es sinónimo de calidad. Nuestro equipo técnico atiende
            también equipos de otras marcas.
          </p>
          <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-5">
            {SERVICIOS.map(([nombre, detalle]) => (
              <li
                key={nombre}
                className="flex flex-col gap-2.5 rounded-[20px] border border-white/15 p-5"
              >
                <span className="font-titulo text-lg font-semibold">
                  {nombre}
                </span>
                <span className="text-sm leading-snug text-niebla-clara">
                  {detalle}
                </span>
                <Link
                  href="/#contacto"
                  className="mt-auto text-sm font-semibold text-turquesa hover:text-white"
                >
                  Solicitar →<span className="sr-only"> {nombre}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="nosotros"
        className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-10 px-4 py-16 sm:px-6 lg:py-20"
      >
        {c.fotos.length > 0 && (
          <div className="grid min-w-0 flex-[1_1_480px] grid-cols-2 gap-3.5">
            {c.fotos.slice(0, 4).map((f) =>
              f.imagen ? (
                <figure key={f.nombre} className="m-0">
                  <Foto
                    ruta={f.imagen}
                    alt={f.nombre}
                    sizes="(max-width: 640px) 45vw, 300px"
                    className="block h-40 w-full rounded-[20px] object-cover sm:h-52"
                  />
                  {f.detalle && (
                    <figcaption className="mt-1.5 text-xs text-niebla">
                      {f.detalle}
                    </figcaption>
                  )}
                </figure>
              ) : (
                <SinFoto
                  key={f.nombre}
                  className="h-40 rounded-[20px] bg-hielo sm:h-52"
                />
              ),
            )}
          </div>
        )}
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
          <Antetitulo>Nosotros</Antetitulo>
          <h2 className="m-0 font-titulo text-[28px] font-semibold text-noche sm:text-4xl">
            Trabajamos por la salud de su paciente
          </h2>
          {empresa.nosotros
            .split(/\n\s*\n/)
            .filter((t) => t.trim())
            .map((t) => (
              <p
                key={t.slice(0, 40)}
                className="m-0 text-[17px] leading-relaxed text-niebla"
              >
                {t.trim()}
              </p>
            ))}
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
            {[
              "Registro sanitario de AGEMED en los equipos que comercializamos",
              "Garantía y repuestos respaldados por el fabricante",
              "Técnicos propios para instalación, capacitación y mantenimiento",
            ].map((t) => (
              <li key={t} className="flex gap-2.5">
                <Check
                  className="mt-0.5 size-5 shrink-0 text-turquesa-profundo"
                  aria-hidden="true"
                />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {c.clientes.length > 0 && (
        <section id="clientes" className="bg-hielo">
          <div className="mx-auto max-w-[1240px] px-4 py-16 sm:px-6">
            <h2 className="mt-0 mb-6 text-center font-titulo text-[26px] font-semibold text-noche sm:text-3xl">
              Confían en nosotros
            </h2>
            <ul className="m-0 grid list-none grid-cols-2 gap-3.5 p-0 sm:grid-cols-3 lg:grid-cols-6">
              {c.clientes.map((cl) => (
                <li
                  key={cl.nombre}
                  className="flex h-24 flex-col items-center justify-center gap-1 rounded-2xl bg-white px-3 text-center"
                >
                  {cl.imagen ? (
                    <Foto
                      ruta={cl.imagen}
                      alt={cl.nombre}
                      sizes="160px"
                      className="max-h-14 max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-sm font-semibold">{cl.nombre}</span>
                  )}
                  {cl.detalle && (
                    <span className="text-xs text-niebla">{cl.detalle}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section id="contacto" className="bg-noche text-white">
        <div className="mx-auto flex max-w-[1240px] flex-wrap gap-12 px-4 py-16 sm:px-6 lg:py-20">
          <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-4">
            <h2 className="m-0 font-titulo text-[30px] leading-tight font-semibold sm:text-[38px]">
              ¿Necesita una cotización?
            </h2>
            <p className="m-0 text-[17px] leading-relaxed text-niebla-clara">
              Déjenos sus datos y un asesor le responde con la propuesta. Si
              prefiere, escríbanos por WhatsApp.
            </p>
            <a
              href={enlaceWhatsapp(
                empresa.whatsapp,
                "Hola LaraMed, quisiera una cotización.",
              )}
              target="_blank"
              rel="noopener"
              className={`${claseBoton("acento")} self-start`}
            >
              <IconoWhatsapp color="#021E5E" />
              WhatsApp {empresa.whatsapp}
            </a>
          </div>
          <div className="min-w-0 flex-[1_1_520px]">
            <FormularioSolicitud tipoInicial="cotizacion" pagina="/#contacto" />
          </div>
        </div>
      </section>
      <BarraMovil whatsapp={empresa.whatsapp} />
    </>
  );
}
