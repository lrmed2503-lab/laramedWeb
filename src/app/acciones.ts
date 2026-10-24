"use server";

import { headers } from "next/headers";
import { erpUrl, webConectada } from "@/lib/catalogo";
import {
  type EstadoSolicitud,
  esquemaSolicitud,
  ipCliente,
  primerError,
} from "@/lib/solicitud";

const CAMPOS = [
  "tipo",
  "producto",
  "nombre",
  "institucion",
  "ciudad",
  "celular",
  "correo",
  "mensaje",
  "pagina",
] as const;

/** Envía la solicitud al ERP (llega a Ventas → Solicitudes web con aviso a los vendedores). */
export async function enviarSolicitud(
  _previo: EstadoSolicitud,
  datos: FormData,
): Promise<EstadoSolicitud> {
  const valores = Object.fromEntries(
    CAMPOS.map((c) => [c, String(datos.get(c) ?? "")]),
  ) as Record<(typeof CAMPOS)[number], string>;
  // Campo trampa: las personas no lo ven; los robots lo llenan.
  if (String(datos.get("sitio") ?? "") !== "") return { ok: true, codigo: "" };

  const r = esquemaSolicitud.safeParse(valores);
  if (!r.success) return { ok: false, ...primerError(r.error), valores };
  if (!webConectada()) {
    return {
      ok: false,
      error: "El formulario aún no está conectado. Escríbanos por WhatsApp.",
      valores,
    };
  }
  try {
    const respuesta = await fetch(`${erpUrl()}/api/web/solicitud`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.WEB_API_CLAVE}`,
        "Content-Type": "application/json",
        "x-origen-cliente": ipCliente(await headers()),
      },
      body: JSON.stringify(r.data),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    const cuerpo = (await respuesta.json().catch(() => ({}))) as {
      codigo?: string;
      error?: string;
      campo?: string;
    };
    if (!respuesta.ok) {
      return {
        ok: false,
        error:
          respuesta.status === 429 || respuesta.status === 400
            ? (cuerpo.error ?? "Revise los datos.")
            : "No pudimos enviar su solicitud. Intente de nuevo o escríbanos por WhatsApp.",
        campo: cuerpo.campo,
        valores,
      };
    }
    return { ok: true, codigo: cuerpo.codigo ?? "" };
  } catch {
    return {
      ok: false,
      error:
        "No pudimos enviar su solicitud. Intente de nuevo o escríbanos por WhatsApp.",
      valores,
    };
  }
}
