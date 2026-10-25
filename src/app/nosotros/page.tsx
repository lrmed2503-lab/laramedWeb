import { Check, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { BarraMovil } from "@/components/pie";
import { Cabecera } from "@/components/secciones";
import { Antetitulo, claseBoton, Foto, IconoWhatsapp } from "@/components/ui";
import { obtenerCatalogo } from "@/lib/catalogo";
import {
  CATALOGO_VACIO,
  enlaceMapa,
  enlaceWhatsapp,
  oficinasDeEmpresa,
} from "@/lib/catalogo-base";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Nosotros: importadores de equipos médicos desde 2021",
  description:
    "LaraMed importa y distribuye equipos e insumos médicos desde 2021, con servicio técnico propio. Oficinas en La Paz, El Alto y Cochabamba, y atención en todo el país.",
  alternates: { canonical: "/nosotros" },
};

const QUE_HACEMOS = [
  [
    "Equipos e insumos médicos",
    "Importamos y distribuimos equipos para quirófano, terapia intensiva, emergencia, monitoreo, infusión y diagnóstico, además de insumos para el día a día del hospital.",
    "/productos",
    "Ver catálogo",
  ],
  [
    "Servicio técnico",
    "Mantenimiento, reparación, instalación y capacitación, con atención de emergencias las 24 horas.",
    "/servicios/servicio-tecnico",
    "Conocer el servicio",
  ],
  [
    "Alquiler de equipos",
    "Ventiladores, monitores, bombas de infusión y más, para instituciones y pacientes en casa.",
    "/servicios/alquiler-de-equipos",
    "Ver alquiler",
  ],
] as const;

const POR_QUE = [
  "Registro sanitario de AGEMED en los equipos que comercializamos",
  "Garantía y repuestos respaldados por el fabricante",
  "Técnicos propios para instalación, capacitación y mantenimiento",
  "Atención de emergencias las 24 horas, todos los días",
];

export default async function Nosotros() {
  const c = await obtenerCatalogo().catch(() => CATALOGO_VACIO);
  const { empresa } = c;
  const oficinas = oficinasDeEmpresa(empresa);
  const parrafos = empresa.nosotros.split(/\n\s*\n/).filter((t) => t.trim());

  return (
    <>
      <Cabecera
        ruta="Nosotros"
        antetitulo={`Desde ${empresa.desde}`}
        titulo="Trabajamos por la salud de su paciente"
        bajada={parrafos[0] ?? ""}
      />

      <section className="mx-auto flex max-w-[1240px] flex-wrap items-start gap-10 px-4 py-14 sm:px-6 lg:py-16">
        <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-4">
          <Antetitulo>Quiénes somos</Antetitulo>
          <h2 className="m-0 font-titulo text-[28px] font-semibold text-noche sm:text-4xl">
            Un proveedor que se queda después de la venta
          </h2>
          {parrafos.slice(1).map((t) => (
            <p
              key={t.slice(0, 40)}
              className="m-0 text-[17px] leading-relaxed text-niebla"
            >
              {t.trim()}
            </p>
          ))}
          <p className="m-0 text-[17px] leading-relaxed text-niebla">
            Acompañamos a hospitales, clínicas y centros de salud públicos y
            privados desde la elección del equipo hasta su instalación, la
            capacitación del personal y el mantenimiento durante toda su vida
            útil.
          </p>
          <ul className="m-0 mt-2 flex list-none flex-col gap-2.5 p-0">
            {POR_QUE.map((t) => (
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
        {c.fotos.length > 0 && (
          <div className="grid min-w-0 flex-[1_1_420px] grid-cols-2 gap-3.5">
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
              ) : null,
            )}
          </div>
        )}
      </section>

      <section className="bg-hielo">
        <div className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6">
          <Antetitulo>Qué hacemos</Antetitulo>
          <h2 className="mt-2.5 mb-8 font-titulo text-[28px] font-semibold text-noche sm:text-4xl">
            Todo lo que su servicio necesita, en un solo proveedor
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {QUE_HACEMOS.map(([t, d, href, boton]) => (
              <article
                key={t}
                className="flex flex-col gap-3 rounded-3xl bg-white p-6"
              >
                <h3 className="m-0 font-titulo text-xl font-semibold text-noche">
                  {t}
                </h3>
                <p className="m-0 leading-relaxed text-niebla">{d}</p>
                <Link href={href} className="mt-auto font-semibold">
                  {boton} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6 lg:py-16">
        <Antetitulo>Dónde estamos</Antetitulo>
        <h2 className="mt-2.5 mb-3 font-titulo text-[28px] font-semibold text-noche sm:text-4xl">
          Cerca de su servicio, en todo el país
        </h2>
        <p className="mt-0 mb-8 max-w-[680px] text-[17px] leading-relaxed text-niebla">
          {empresa.cobertura}. Coordinamos entregas, instalaciones y visitas
          técnicas en cualquier departamento.
        </p>
        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {oficinas.map((o) => (
            <li
              key={o.ciudad}
              className="flex flex-col gap-2 rounded-[20px] border border-linea p-5"
            >
              <span className="flex items-center gap-2 font-titulo text-lg font-semibold text-noche">
                <MapPin
                  className="size-5 text-turquesa-profundo"
                  aria-hidden="true"
                />
                {o.ciudad}
              </span>
              {o.direccion && (
                <span className="text-[15px] leading-snug text-tinta">
                  {o.direccion}
                </span>
              )}
              {o.nota && (
                <span className="text-[15px] text-niebla">{o.nota}</span>
              )}
              {o.direccion && (
                <a
                  href={enlaceMapa(o)}
                  target="_blank"
                  rel="noopener"
                  className="mt-auto pt-1 text-sm font-semibold"
                >
                  Cómo llegar →
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>

      {c.clientes.length > 0 && (
        <section className="bg-hielo">
          <div className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6">
            <h2 className="mt-0 mb-6 text-center font-titulo text-[26px] font-semibold text-noche sm:text-3xl">
              Instituciones que confían en nosotros
            </h2>
            <ul className="m-0 grid list-none grid-cols-2 gap-3.5 p-0 sm:grid-cols-3 lg:grid-cols-6">
              {c.clientes.map((cl) => (
                <li
                  key={cl.nombre}
                  className="flex h-24 items-center justify-center rounded-2xl bg-white px-3 text-center"
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
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-noche text-white">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-6 px-4 py-14 sm:px-6">
          <div className="flex max-w-[640px] flex-col gap-2">
            <h2 className="m-0 font-titulo text-[28px] font-semibold sm:text-[32px]">
              Conversemos sobre su próximo equipo
            </h2>
            <p className="m-0 text-niebla-clara">
              Un asesor le ayuda a elegir, cotizar y planificar la instalación y
              el mantenimiento.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/#contacto" className={claseBoton("acento")}>
              Solicitar cotización
            </Link>
            <a
              href={enlaceWhatsapp(
                empresa.whatsapp,
                "Hola LaraMed, quisiera información.",
              )}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold text-white no-underline hover:text-white"
            >
              <IconoWhatsapp />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
      <BarraMovil whatsapp={empresa.whatsapp} />
    </>
  );
}
