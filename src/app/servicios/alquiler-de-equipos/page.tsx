import { Building2, Check, House } from "lucide-react";
import type { Metadata } from "next";
import { FormularioSolicitud } from "@/components/formulario-solicitud";
import { BarraMovil } from "@/components/pie";
import {
  BloqueSolicitud,
  Cabecera,
  Pasos,
  Preguntas,
} from "@/components/secciones";
import { Antetitulo, claseBoton } from "@/components/ui";
import { obtenerCatalogo } from "@/lib/catalogo";
import { CATALOGO_VACIO } from "@/lib/catalogo-base";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Alquiler de equipos médicos en Bolivia",
  description:
    "Alquiler de ventiladores mecánicos, monitores, bombas de infusión, máquinas de hemodiálisis y otros equipos para hospitales, clínicas y pacientes en casa. Cotizamos según cada caso.",
  alternates: { canonical: "/servicios/alquiler-de-equipos" },
};

const EQUIPOS = [
  [
    "Ventiladores mecánicos",
    "Para terapia intensiva, emergencia o ventilación en el domicilio.",
  ],
  [
    "Monitores multiparamétricos",
    "Control de signos vitales en internación, quirófano o en casa.",
  ],
  [
    "Bombas de infusión",
    "Administración precisa de medicamentos y soluciones.",
  ],
  [
    "Máquinas de hemodiálisis",
    "Para unidades que necesitan ampliar su capacidad por un tiempo.",
  ],
] as const;

const INCLUYE = [
  "Equipo revisado y funcionando antes de cada entrega",
  "Entrega e instalación con acta firmada",
  "Explicación de uso al personal o a la familia",
  "Respaldo de nuestro servicio técnico, también en emergencias",
];

const PASOS = [
  [
    "Nos cuenta qué necesita",
    "Qué equipo, por cuánto tiempo y dónde se va a usar.",
  ],
  [
    "Le enviamos la cotización",
    "Preparamos una propuesta a la medida de su caso.",
  ],
  [
    "Entregamos el equipo",
    "Lo llevamos, lo instalamos y explicamos su uso, con acta de entrega.",
  ],
  [
    "Lo retiramos al terminar",
    "Cuando ya no lo necesita, coordinamos el retiro y la devolución.",
  ],
] as const;

const PREGUNTAS = [
  [
    "¿Cuánto cuesta alquilar un equipo?",
    "Depende del equipo, del tiempo y del lugar donde se va a usar. Por eso cotizamos cada caso: cuéntenos lo que necesita y le enviamos la propuesta.",
  ],
  [
    "¿Alquilan equipos para pacientes en casa?",
    "Sí. Además de hospitales y clínicas, alquilamos equipos para continuar el tratamiento en el domicilio. Le explicamos a la familia cómo usarlo.",
  ],
  [
    "¿Qué pasa si el equipo falla durante el alquiler?",
    "Nuestro servicio técnico lo atiende. Para emergencias estamos disponibles las 24 horas, todos los días, por WhatsApp.",
  ],
  [
    "¿Puedo alquilar un equipo que no está en la lista?",
    "Escríbanos. Además de los equipos que mostramos aquí, trabajamos con otros según disponibilidad.",
  ],
] as const;

export default async function Alquiler() {
  const { empresa } = await obtenerCatalogo().catch(() => CATALOGO_VACIO);
  return (
    <>
      <Cabecera
        ruta="Alquiler de equipos"
        antetitulo="Alquiler de equipos"
        titulo="Alquiler de equipos médicos para hospitales, clínicas y pacientes en casa"
        bajada="Ventiladores mecánicos, monitores, bombas de infusión, máquinas de hemodiálisis y otros equipos, listos para usar. Cotizamos cada caso según el equipo, el tiempo y el lugar."
      >
        <a href="#solicitud" className={claseBoton("primario")}>
          Cotizar un alquiler
        </a>
      </Cabecera>

      <section className="mx-auto max-w-[1240px] px-4 pt-14 pb-8 sm:px-6 lg:pt-16">
        <Antetitulo>Equipos disponibles</Antetitulo>
        <h2 className="mt-2.5 mb-8 font-titulo text-[28px] font-semibold text-noche sm:text-4xl">
          Los equipos que más se necesitan, cuando se necesitan
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {EQUIPOS.map(([t, d]) => (
            <article
              key={t}
              className="flex flex-col gap-2 rounded-[20px] border border-linea p-5"
            >
              <h3 className="m-0 font-titulo text-lg font-semibold text-noche">
                {t}
              </h3>
              <p className="m-0 text-[15px] leading-snug text-niebla">{d}</p>
            </article>
          ))}
        </div>
        <p className="mt-4 mb-0 text-niebla">
          ¿Busca otro equipo? Consúltenos: trabajamos con otros equipos según
          disponibilidad.
        </p>
      </section>

      <section className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <article className="flex flex-col gap-3 rounded-3xl bg-hielo p-6 sm:p-7">
            <Building2 className="size-9 text-azul" aria-hidden="true" />
            <h3 className="m-0 font-titulo text-xl font-semibold text-noche">
              Hospitales y clínicas
            </h3>
            <p className="m-0 leading-relaxed text-niebla">
              Cubra un aumento de pacientes, el tiempo en que un equipo propio
              está en mantenimiento o la apertura de un servicio nuevo, sin
              esperar una compra.
            </p>
          </article>
          <article className="flex flex-col gap-3 rounded-3xl bg-hielo p-6 sm:p-7">
            <House className="size-9 text-azul" aria-hidden="true" />
            <h3 className="m-0 font-titulo text-xl font-semibold text-noche">
              Pacientes en casa
            </h3>
            <p className="m-0 leading-relaxed text-niebla">
              Para continuar el tratamiento en el domicilio. Llevamos el equipo,
              lo instalamos y explicamos a la familia cómo usarlo y cuidarlo.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-petroleo text-white">
        <div className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6">
          <Antetitulo claro>Qué incluye</Antetitulo>
          <h2 className="mt-2.5 mb-6 font-titulo text-[28px] font-semibold sm:text-[34px]">
            Un equipo listo para usar y un equipo técnico detrás
          </h2>
          <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
            {INCLUYE.map((t) => (
              <li
                key={t}
                className="flex gap-3 rounded-2xl border border-white/15 px-5 py-4"
              >
                <Check
                  className="mt-0.5 size-5 shrink-0 text-turquesa"
                  aria-hidden="true"
                />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Pasos titulo="Alquilar un equipo, paso a paso" pasos={PASOS} />
      <Preguntas preguntas={PREGUNTAS} />

      <BloqueSolicitud
        titulo="Cotice el alquiler de un equipo"
        texto="Cuéntenos qué equipo necesita, por cuánto tiempo y dónde se va a usar. Le respondemos con una propuesta para su caso."
        whatsapp={empresa.whatsapp}
        mensajeWhatsapp="Hola LaraMed, quisiera cotizar el alquiler de un equipo."
      >
        <FormularioSolicitud
          tipoInicial="alquiler"
          pagina="/servicios/alquiler-de-equipos"
          mensajeEtiqueta="Equipo, tiempo y lugar"
          mensajeEjemplo="Ej.: 1 ventilador por 15 días, para uso en domicilio en Sopocachi"
          boton="Pedir cotización de alquiler"
        />
      </BloqueSolicitud>
      <BarraMovil whatsapp={empresa.whatsapp} cotizar="#solicitud" />
    </>
  );
}
