import {
  Check,
  ClipboardCheck,
  GraduationCap,
  PackageCheck,
  Wrench,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { FormularioSolicitud } from "@/components/formulario-solicitud";
import { BarraMovil } from "@/components/pie";
import {
  AvisoEmergencia,
  BloqueSolicitud,
  Cabecera,
  Pasos,
  Preguntas,
} from "@/components/secciones";
import { Antetitulo, claseBoton, TarjetaProducto } from "@/components/ui";
import { obtenerCatalogo } from "@/lib/catalogo";
import { CATALOGO_VACIO, deFamilia, FAMILIAS } from "@/lib/catalogo-base";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Servicio técnico de equipos médicos en Bolivia",
  description:
    "Mantenimiento preventivo y correctivo, contratos, instalación y capacitación para equipos de quirófano, terapia intensiva, emergencia, hemodiálisis, rayos X y ecografía. Emergencias las 24 horas.",
  alternates: { canonical: "/servicios/servicio-tecnico" },
};

const AREAS = [
  "Quirófano",
  "Terapia intensiva",
  "Emergencia",
  "Hemodiálisis",
  "Rayos X",
  "Ecografía",
  "Internación",
];

const SERVICIOS = [
  {
    icono: Wrench,
    titulo: "Mantenimiento preventivo y correctivo",
    texto:
      "Planificamos el mantenimiento según las indicaciones del fabricante y el uso real de cada equipo. Cuando algo falla, buscamos la causa, reparamos y verificamos el funcionamiento antes de devolver el equipo al servicio.",
    puntos: [
      "Revisión, limpieza y calibración",
      "Diagnóstico y reparación de fallas",
      "Cambio de repuestos",
    ],
  },
  {
    icono: ClipboardCheck,
    titulo: "Contratos de mantenimiento",
    texto:
      "Un contrato ordena el año de su servicio: visitas programadas, inspecciones periódicas y repuestos menores dentro del monto acordado. Usted sabe de antemano cuándo vamos y cuánto invierte.",
    puntos: [
      "Cronograma de visitas por equipo",
      "Inspecciones periódicas",
      "Informe mensual del contrato",
    ],
  },
  {
    icono: PackageCheck,
    titulo: "Instalación y puesta en marcha",
    texto:
      "Instalamos el equipo en su servicio, verificamos que funcione según las especificaciones del fabricante y lo dejamos listo para atender pacientes.",
    puntos: [
      "Instalación en el lugar de uso",
      "Pruebas de funcionamiento",
      "Entrega con informe técnico",
    ],
  },
  {
    icono: GraduationCap,
    titulo: "Capacitación al personal",
    texto:
      "Enseñamos al personal médico y de enfermería a usar el equipo con seguridad: configuración, cuidados del día a día y qué hacer ante una alarma. Un equipo bien usado falla menos y dura más.",
    puntos: [
      "Uso correcto y seguro",
      "Cuidados diarios",
      "Respuesta ante alarmas",
    ],
  },
];

const PASOS = [
  [
    "Nos cuenta qué pasa",
    "Por WhatsApp o con el formulario: equipo, marca, modelo y lo que observa.",
  ],
  [
    "Evaluamos el equipo",
    "Hacemos el diagnóstico en su servicio o en nuestro taller, según el caso.",
  ],
  [
    "Le enviamos la propuesta",
    "Con el trabajo a realizar, los repuestos necesarios y los plazos.",
  ],
  [
    "Reparamos y le entregamos el informe",
    "El equipo vuelve a funcionar y usted recibe el informe técnico del trabajo.",
  ],
] as const;

const PREGUNTAS = [
  [
    "¿Atienden equipos que no compré con ustedes?",
    "Sí. Trabajamos con equipos de la mayoría de las marcas del mercado. Cuéntenos la marca y el modelo, y le confirmamos cómo podemos ayudarle.",
  ],
  [
    "¿Atienden fuera de La Paz?",
    "Sí. Tenemos técnicos en La Paz, El Alto y Cochabamba, y atendemos en cualquier departamento según su requerimiento.",
  ],
  [
    "¿Qué hago si un equipo se detiene de noche o en fin de semana?",
    "Escríbanos por WhatsApp a cualquier hora. Atendemos emergencias las 24 horas, todos los días, y coordinamos la atención de inmediato.",
  ],
  [
    "¿Qué recibo al terminar el trabajo?",
    "Un informe técnico con el trabajo realizado, el estado en que queda el equipo y nuestras recomendaciones. Le sirve como respaldo ante auditorías y para planificar el próximo mantenimiento.",
  ],
  [
    "¿Conviene un contrato de mantenimiento?",
    "Si su servicio tiene varios equipos o equipos críticos, normalmente sí: el mantenimiento se cumple a tiempo, las fallas se detectan antes y el costo queda previsto. Le ayudamos a armar el plan según sus equipos.",
  ],
] as const;

export default async function ServicioTecnico() {
  const c = await obtenerCatalogo().catch(() => CATALOGO_VACIO);
  const { empresa } = c;
  const repuestos = deFamilia(c.productos, "repuestos");
  const muestra = [
    ...repuestos.filter((p) => p.fotos.length),
    ...repuestos.filter((p) => !p.fotos.length),
  ].slice(0, 3);
  return (
    <>
      <Cabecera
        ruta="Servicio técnico"
        antetitulo="Servicio técnico"
        titulo="Servicio técnico de equipos médicos en todo el país"
        bajada="Mantenimiento, reparación, instalación y capacitación para quirófano, terapia intensiva, emergencia, hemodiálisis, rayos X y ecografía. Técnicos propios en La Paz, El Alto y Cochabamba, y atención en cualquier departamento según su requerimiento."
      >
        <a href="#solicitud" className={claseBoton("primario")}>
          Solicitar servicio técnico
        </a>
      </Cabecera>
      <AvisoEmergencia whatsapp={empresa.whatsapp} />

      <section className="mx-auto max-w-[1240px] px-4 pt-14 pb-6 sm:px-6 lg:pt-16">
        <div className="flex flex-wrap items-start gap-8">
          <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-3">
            <Antetitulo>Todas las áreas del hospital</Antetitulo>
            <h2 className="m-0 font-titulo text-[28px] font-semibold text-noche sm:text-4xl">
              Atendemos equipos de la mayoría de las marcas
            </h2>
            <p className="m-0 text-[17px] leading-relaxed text-niebla">
              Trabajamos con los equipos que usted ya tiene, los haya comprado
              con nosotros o con otro proveedor. Nuestro equipo técnico conoce
              las marcas más usadas en los hospitales y clínicas del país.
            </p>
          </div>
          <ul className="m-0 flex min-w-0 flex-[1_1_420px] list-none flex-wrap gap-2 p-0">
            {AREAS.map((a) => (
              <li
                key={a}
                className="rounded-full bg-hielo px-4 py-2 font-semibold text-azul"
              >
                {a}
              </li>
            ))}
            <li className="rounded-full border border-linea px-4 py-2 text-niebla">
              y otros servicios del hospital
            </li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {SERVICIOS.map((s) => (
            <article
              key={s.titulo}
              className="flex flex-col gap-3 rounded-3xl border border-linea p-6 sm:p-7"
            >
              <s.icono
                className="size-9 text-turquesa-profundo"
                aria-hidden="true"
              />
              <h3 className="m-0 font-titulo text-xl font-semibold text-noche">
                {s.titulo}
              </h3>
              <p className="m-0 leading-relaxed text-niebla">{s.texto}</p>
              <ul className="m-0 mt-1 flex list-none flex-col gap-1.5 p-0 text-[15px]">
                {s.puntos.map((p) => (
                  <li key={p} className="flex gap-2">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-turquesa-profundo"
                      aria-hidden="true"
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {repuestos.length > 0 && (
        <section className="mx-auto max-w-[1240px] px-4 pt-6 pb-14 sm:px-6">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div className="flex max-w-[720px] flex-col gap-2.5">
              <Antetitulo>Repuestos y accesorios</Antetitulo>
              <h2 className="m-0 font-titulo text-[28px] font-semibold text-noche sm:text-4xl">
                ¿Necesita un repuesto o accesorio?
              </h2>
              <p className="m-0 text-[17px] leading-relaxed text-niebla">
                Cables, sensores, brazaletes y repuestos para sus equipos. Los
                vendemos por separado o los instalamos en el mantenimiento.
              </p>
            </div>
            <Link
              href={FAMILIAS.repuestos.ruta}
              className={claseBoton("bordeAzul")}
            >
              Ver repuestos y accesorios
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {muestra.map((p) => (
              <TarjetaProducto key={p.slug} p={p} />
            ))}
          </div>
        </section>
      )}

      <Pasos titulo="Del aviso al equipo funcionando" pasos={PASOS} />

      <section className="bg-petroleo text-white">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-8 px-4 py-14 sm:px-6">
          <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-3">
            <Antetitulo claro>Cobertura</Antetitulo>
            <h2 className="m-0 font-titulo text-[28px] font-semibold sm:text-[34px]">
              Técnicos en La Paz, El Alto y Cochabamba
            </h2>
            <p className="m-0 text-[17px] leading-relaxed text-niebla-clara">
              Desde nuestras tres oficinas llegamos a cualquier departamento del
              país cuando su servicio lo necesita. Cuéntenos dónde está el
              equipo y coordinamos la visita.
            </p>
          </div>
          <a href="#solicitud" className={claseBoton("acento")}>
            Coordinar una visita
          </a>
        </div>
      </section>

      <Preguntas preguntas={PREGUNTAS} />

      <BloqueSolicitud
        titulo="Solicite servicio técnico"
        texto="Cuéntenos qué equipo necesita atender y un técnico le responde con la propuesta. Para emergencias, escríbanos directo por WhatsApp."
        whatsapp={empresa.whatsapp}
        mensajeWhatsapp="Hola LaraMed, necesito servicio técnico para un equipo."
      >
        <FormularioSolicitud
          tipoInicial="servicio_tecnico"
          opciones={[
            ["servicio_tecnico", "Reparación o mantenimiento"],
            ["contrato", "Contrato de mantenimiento"],
            ["instalacion", "Instalación"],
            ["capacitacion", "Capacitación"],
          ]}
          pagina="/servicios/servicio-tecnico"
          mensajeEtiqueta="Equipo, marca y qué necesita"
          mensajeEjemplo="Ej.: ventilador de UTI con alarma de presión, marca y modelo…"
          boton="Enviar solicitud"
        />
      </BloqueSolicitud>
      <BarraMovil whatsapp={empresa.whatsapp} cotizar="#solicitud" />
    </>
  );
}
