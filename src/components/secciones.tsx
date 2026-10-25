import { ChevronDown, Siren } from "lucide-react";
import Link from "next/link";
import { Antetitulo, claseBoton, IconoWhatsapp } from "@/components/ui";
import { enlaceWhatsapp } from "@/lib/catalogo-base";

// Bloques de las páginas de servicios y de «Nosotros».

/** Cabecera de página: ruta, antetítulo, título y bajada sobre fondo hielo. */
export function Cabecera({
  ruta,
  antetitulo,
  titulo,
  bajada,
  children,
}: {
  ruta: string;
  antetitulo: string;
  titulo: string;
  bajada: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-hielo">
      <div className="mx-auto max-w-[1240px] px-4 pt-8 pb-12 sm:px-6 lg:pb-16">
        <nav aria-label="Ruta" className="mb-6 text-sm text-niebla">
          <Link href="/">Inicio</Link> / {ruta}
        </nav>
        <div className="flex max-w-[820px] flex-col gap-4">
          <Antetitulo>{antetitulo}</Antetitulo>
          <h1 className="m-0 font-titulo text-[32px] leading-[1.1] font-bold text-noche sm:text-[46px]">
            {titulo}
          </h1>
          <p className="m-0 text-lg leading-relaxed text-niebla">{bajada}</p>
          {children && (
            <div className="mt-2 flex flex-wrap gap-3">{children}</div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Franja de emergencias 24 horas con el botón que abre WhatsApp con el mensaje listo. */
export function AvisoEmergencia({ whatsapp }: { whatsapp: string }) {
  return (
    <section aria-labelledby="emergencias" className="bg-[#fdecea]">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-5 px-4 py-6 sm:px-6">
        <Siren className="size-9 shrink-0 text-[#b42318]" aria-hidden="true" />
        <div className="min-w-0 flex-[1_1_420px]">
          <h2
            id="emergencias"
            className="m-0 font-titulo text-xl font-bold text-[#8a1c12]"
          >
            Emergencias: atención las 24 horas, los 365 días
          </h2>
          <p className="mt-1 mb-0 text-[#5c1710]">
            Si un equipo se detuvo, escríbanos por WhatsApp con el equipo, la
            marca y el lugar. Coordinamos la atención de inmediato.
          </p>
        </div>
        <a
          href={enlaceWhatsapp(
            whatsapp,
            "EMERGENCIA – Equipo detenido. Equipo y marca: … Lugar: … ",
          )}
          target="_blank"
          rel="noopener"
          className={claseBoton("emergencia")}
        >
          <IconoWhatsapp color="#FFFFFF" />
          Reportar una emergencia
        </a>
      </div>
    </section>
  );
}

/** «Cómo trabajamos» en pasos numerados. */
export function Pasos({
  titulo,
  pasos,
}: {
  titulo: string;
  pasos: readonly (readonly [string, string])[];
}) {
  return (
    <section className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6 lg:py-16">
      <Antetitulo>Cómo trabajamos</Antetitulo>
      <h2 className="mt-2.5 mb-8 font-titulo text-[28px] font-semibold text-noche sm:text-4xl">
        {titulo}
      </h2>
      <ol className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
        {pasos.map(([t, d], i) => (
          <li
            key={t}
            className="flex flex-col gap-2 rounded-[20px] border border-linea p-5"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-azul font-titulo font-bold text-white">
              {i + 1}
            </span>
            <span className="font-titulo text-lg font-semibold text-noche">
              {t}
            </span>
            <span className="text-[15px] leading-snug text-niebla">{d}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Preguntas frecuentes plegables (funcionan sin JavaScript). */
export function Preguntas({
  preguntas,
}: {
  preguntas: readonly (readonly [string, string])[];
}) {
  return (
    <section className="mx-auto max-w-[900px] px-4 py-14 sm:px-6">
      <h2 className="mt-0 mb-6 font-titulo text-[28px] font-semibold text-noche sm:text-[32px]">
        Preguntas frecuentes
      </h2>
      <div className="flex flex-col gap-3">
        {preguntas.map(([p, r]) => (
          <details
            key={p}
            className="group rounded-2xl border border-linea bg-white"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 font-titulo text-[17px] font-semibold text-noche">
              {p}
              <ChevronDown
                className="size-5 shrink-0 text-niebla transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p className="m-0 px-5 pb-5 leading-relaxed text-niebla">{r}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/** Bloque final con el formulario sobre fondo azul noche. */
export function BloqueSolicitud({
  titulo,
  texto,
  whatsapp,
  mensajeWhatsapp,
  children,
}: {
  titulo: string;
  texto: string;
  whatsapp: string;
  mensajeWhatsapp: string;
  children: React.ReactNode;
}) {
  return (
    <section id="solicitud" className="bg-noche text-white">
      <div className="mx-auto flex max-w-[1240px] flex-wrap gap-12 px-4 py-16 sm:px-6 lg:py-20">
        <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-4">
          <h2 className="m-0 font-titulo text-[30px] leading-tight font-semibold sm:text-[36px]">
            {titulo}
          </h2>
          <p className="m-0 text-[17px] leading-relaxed text-niebla-clara">
            {texto}
          </p>
          <a
            href={enlaceWhatsapp(whatsapp, mensajeWhatsapp)}
            target="_blank"
            rel="noopener"
            className={`${claseBoton("acento")} self-start`}
          >
            <IconoWhatsapp color="#021E5E" />
            WhatsApp {whatsapp}
          </a>
        </div>
        <div className="min-w-0 flex-[1_1_520px]">{children}</div>
      </div>
    </section>
  );
}
