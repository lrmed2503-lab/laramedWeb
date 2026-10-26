import "server-only";
import { cache } from "react";
import {
  CATALOGO_VACIO,
  type Catalogo,
  separarVeterinaria,
} from "./catalogo-base";

// Lectura del catálogo desde el ERP (erp.laramedventas.com), con la clave de la web.
// Se guarda 5 minutos: un cambio en el ERP aparece en la web en ese tiempo.

export const REVALIDAR_SEGUNDOS = 300;

export function erpUrl() {
  return (process.env.ERP_URL ?? "").replace(/\/+$/, "");
}

export const webConectada = () =>
  Boolean(erpUrl() && process.env.WEB_API_CLAVE);

const construyendo = () => process.env.NEXT_PHASE === "phase-production-build";

/**
 * Catálogo completo del ERP (incluye los equipos veterinarios). Sin conexión configurada (o si el ERP no responde mientras se construye la web)
 * devuelve el catálogo vacío. Si el ERP falla al actualizar, se lanza el error: la web sigue
 * mostrando la última versión buena hasta el siguiente intento.
 */
export const obtenerCatalogoCompleto = cache(async (): Promise<Catalogo> => {
  if (!webConectada()) return CATALOGO_VACIO;
  try {
    const r = await fetch(`${erpUrl()}/api/web/catalogo`, {
      headers: { Authorization: `Bearer ${process.env.WEB_API_CLAVE}` },
      next: { revalidate: REVALIDAR_SEGUNDOS, tags: ["catalogo"] },
      signal: AbortSignal.timeout(15_000),
    });
    if (!r.ok)
      throw new Error(`El ERP respondió ${r.status} al pedir el catálogo.`);
    return (await r.json()) as Catalogo;
  } catch (e) {
    if (construyendo()) {
      console.warn("Catálogo no disponible al construir; se usa vacío.", e);
      return CATALOGO_VACIO;
    }
    throw e;
  }
});

/** Catálogo médico: lo que muestran el inicio, /productos y las áreas (sin los veterinarios). */
export const obtenerCatalogo = cache(
  async (): Promise<Catalogo> =>
    separarVeterinaria(await obtenerCatalogoCompleto()).medico,
);

/** Equipos de uso veterinario, para /veterinaria. */
export const obtenerVeterinarios = cache(
  async () => separarVeterinaria(await obtenerCatalogoCompleto()).veterinarios,
);
