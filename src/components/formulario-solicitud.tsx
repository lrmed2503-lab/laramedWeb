"use client";

import { CircleCheck } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { enviarSolicitud } from "@/app/acciones";
import type { EstadoSolicitud, TipoSolicitud } from "@/lib/solicitud";

const CAMPO =
  "w-full rounded-xl border border-linea bg-white px-3.5 py-3 font-normal text-tinta placeholder:text-[#6b7b88] aria-[invalid=true]:border-[#b42318]";

function Campo({
  etiqueta,
  ancho = false,
  children,
}: {
  etiqueta: string;
  ancho?: boolean;
  children: React.ReactNode;
}) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: el campo llega como children
    <label
      className={`flex flex-col gap-1.5 text-sm font-semibold ${ancho ? "sm:col-span-2" : ""}`}
    >
      {etiqueta}
      {children}
    </label>
  );
}

/**
 * Formulario que llega al ERP como «Solicitud web». Con `producto` se liga al producto; con
 * `pestanas` se elige entre cotización y ficha técnica; con `opciones`, el tipo de servicio.
 */
export function FormularioSolicitud({
  tipoInicial = "cotizacion",
  producto,
  pestanas = false,
  pagina,
  boton,
  mensajeEtiqueta = "¿Qué necesita?",
  mensajeEjemplo = "Ej.: 2 monitores multiparamétricos para UTI",
  opciones,
}: {
  tipoInicial?: TipoSolicitud;
  producto?: { slug: string; titulo: string };
  pestanas?: boolean;
  pagina: string;
  boton?: string;
  mensajeEtiqueta?: string;
  mensajeEjemplo?: string;
  /** Lista para elegir el tipo (p. ej. reparación, contrato, instalación, capacitación). */
  opciones?: readonly (readonly [TipoSolicitud, string])[];
}) {
  const [estado, enviar, enviando] = useActionState<EstadoSolicitud, FormData>(
    enviarSolicitud,
    null,
  );
  const [tipo, setTipo] = useState<TipoSolicitud>(tipoInicial);
  // Los botones «Solicitar cotización» / «Solicitar ficha técnica» de la página eligen la pestaña.
  useEffect(() => {
    if (!pestanas) return;
    const elegir = () => {
      if (location.hash === "#ficha-tecnica") setTipo("ficha");
      else if (location.hash === "#solicitud") setTipo("cotizacion");
    };
    elegir();
    addEventListener("hashchange", elegir);
    return () => removeEventListener("hashchange", elegir);
  }, [pestanas]);
  const v = estado && !estado.ok ? estado.valores : undefined;
  const error = estado && !estado.ok ? estado : null;
  const invalido = (c: string) => (error?.campo === c ? true : undefined);
  const ficha = tipo === "ficha";

  if (estado?.ok) {
    return (
      <div
        aria-live="polite"
        className="flex flex-col items-start gap-3 rounded-3xl bg-white p-7 text-tinta"
      >
        <CircleCheck
          className="size-10 text-turquesa-profundo"
          aria-hidden="true"
        />
        <p className="m-0 font-titulo text-xl font-semibold text-noche">
          {ficha
            ? "Gracias. Le enviaremos la ficha técnica."
            : "Gracias. Recibimos su solicitud."}
        </p>
        <p className="m-0 text-niebla">
          Un asesor de LaraMed le escribirá a la brevedad
          {estado.codigo ? ` (su número de solicitud es ${estado.codigo})` : ""}
          .
        </p>
      </div>
    );
  }

  return (
    <form
      action={enviar}
      className="relative grid grid-cols-1 gap-3.5 rounded-3xl bg-white p-5 text-tinta sm:grid-cols-2 sm:p-7"
    >
      {pestanas && (
        // biome-ignore lint/a11y/useSemanticElements: dos botones que eligen el tipo, no un formulario aparte
        <div
          role="group"
          aria-label="Qué necesita"
          className="flex gap-1.5 justify-self-start rounded-full bg-hielo p-1.5 sm:col-span-2"
        >
          {(
            [
              ["cotizacion", "Cotización"],
              ["ficha", "Ficha técnica"],
            ] as const
          ).map(([t, texto]) => (
            <button
              key={t}
              type="button"
              aria-pressed={tipo === t}
              onClick={() => setTipo(t)}
              className={`cursor-pointer rounded-full border-0 px-4 py-2 text-sm font-bold ${
                tipo === t ? "bg-azul text-white" : "bg-transparent text-tinta"
              }`}
            >
              {texto}
            </button>
          ))}
        </div>
      )}
      <input type="hidden" name="tipo" value={tipo} />
      {opciones && (
        <Campo etiqueta="¿Qué necesita?" ancho>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value as TipoSolicitud)}
            className={CAMPO}
          >
            {opciones.map(([t, texto]) => (
              <option key={t} value={t}>
                {texto}
              </option>
            ))}
          </select>
        </Campo>
      )}
      <input type="hidden" name="pagina" value={pagina} />
      {producto && (
        <>
          <input type="hidden" name="producto" value={producto.slug} />
          <Campo etiqueta="Producto" ancho>
            <input
              value={producto.titulo}
              readOnly
              className={`${CAMPO} bg-hielo`}
            />
          </Campo>
        </>
      )}
      <Campo etiqueta="Nombre">
        <input
          name="nombre"
          required
          minLength={2}
          maxLength={120}
          autoComplete="name"
          defaultValue={v?.nombre}
          aria-invalid={invalido("nombre")}
          placeholder="Dra. Ana Rojas"
          className={CAMPO}
        />
      </Campo>
      <Campo etiqueta="Institución">
        <input
          name="institucion"
          maxLength={160}
          autoComplete="organization"
          defaultValue={v?.institucion}
          placeholder="Hospital / clínica"
          className={CAMPO}
        />
      </Campo>
      <Campo etiqueta="Celular">
        <input
          name="celular"
          type="tel"
          inputMode="tel"
          maxLength={30}
          autoComplete="tel"
          defaultValue={v?.celular}
          aria-invalid={invalido("celular")}
          placeholder="7xxxxxxx"
          className={CAMPO}
        />
      </Campo>
      <Campo etiqueta="Correo">
        <input
          name="correo"
          type="email"
          maxLength={160}
          autoComplete="email"
          defaultValue={v?.correo}
          aria-invalid={invalido("correo")}
          placeholder="correo@hospital.bo"
          className={CAMPO}
        />
      </Campo>
      <Campo etiqueta="Ciudad" ancho={!!producto}>
        <input
          name="ciudad"
          maxLength={80}
          autoComplete="address-level2"
          defaultValue={v?.ciudad}
          placeholder="La Paz"
          className={CAMPO}
        />
      </Campo>
      {!producto && <div className="hidden sm:block" />}
      {!ficha && (
        <Campo etiqueta={mensajeEtiqueta} ancho>
          <textarea
            name="mensaje"
            rows={3}
            maxLength={2000}
            defaultValue={v?.mensaje}
            placeholder={mensajeEjemplo}
            className={`${CAMPO} resize-y`}
          />
        </Campo>
      )}
      {/* Trampa para robots: oculto a las personas. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          No llenar
          <input name="sitio" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className="m-0 text-xs text-niebla sm:col-span-2">
        Deje un celular o un correo para responderle.
      </p>
      {error && (
        <p
          role="alert"
          className="m-0 rounded-xl bg-[#fdecea] px-3.5 py-3 text-sm font-semibold text-[#8a1c12] sm:col-span-2"
        >
          {error.error}
        </p>
      )}
      <button
        type="submit"
        disabled={enviando}
        className="min-h-12 cursor-pointer rounded-full border-0 bg-azul px-6 font-bold text-white hover:bg-noche disabled:cursor-wait disabled:opacity-70 sm:col-span-2"
      >
        {enviando
          ? "Enviando…"
          : (boton ?? (ficha ? "Pedir la ficha técnica" : "Enviar solicitud"))}
      </button>
    </form>
  );
}
