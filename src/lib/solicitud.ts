import { z } from "zod";

// Formulario de solicitud de la web. El ERP vuelve a validar todo (esquemaSolicitudWeb);
// aquí se revisa lo básico para responder rápido y en el mismo formulario.

export const TIPOS_SOLICITUD = [
  "cotizacion",
  "ficha",
  "servicio_tecnico",
  "alquiler",
  "contrato",
  "capacitacion",
  "instalacion",
  "contacto",
] as const;
export type TipoSolicitud = (typeof TIPOS_SOLICITUD)[number];

const texto = (max: number) =>
  z.string().trim().max(max, `Máximo ${max} caracteres.`).catch("");

export const esquemaSolicitud = z
  .object({
    tipo: z.enum(TIPOS_SOLICITUD).catch("contacto"),
    producto: z.string().trim().max(120).catch(""),
    nombre: z
      .string()
      .trim()
      .min(2, "Escriba su nombre.")
      .max(120, "Máximo 120 caracteres."),
    institucion: texto(160),
    ciudad: texto(80),
    celular: z
      .string()
      .trim()
      .max(30)
      .refine(
        (v) => v === "" || /^\+?[\d\s-]{7,20}$/.test(v),
        "Celular no válido.",
      ),
    correo: z
      .string()
      .trim()
      .max(160)
      .refine(
        (v) => v === "" || z.email().safeParse(v).success,
        "Correo no válido.",
      ),
    mensaje: texto(2000),
    pagina: texto(300),
  })
  .refine((d) => d.celular || d.correo, {
    path: ["celular"],
    message: "Deje un celular o un correo para responderle.",
  });
export type DatosSolicitud = z.output<typeof esquemaSolicitud>;

export type EstadoSolicitud =
  | { ok: true; codigo: string }
  | {
      ok: false;
      error: string;
      campo?: string;
      valores?: Record<string, string>;
    }
  | null;

/** Primer error del formulario, con el campo para marcarlo. */
export function primerError(e: z.ZodError) {
  const i = e.issues[0];
  return {
    error: i?.message ?? "Revise los datos.",
    campo: i?.path[0]?.toString(),
  };
}

/** IP de quien envía (Caddy, en el servidor, la pone en x-forwarded-for). */
export function ipCliente(h: { get(n: string): string | null }) {
  return (h.get("x-forwarded-for")?.split(",")[0] ?? h.get("x-real-ip") ?? "")
    .trim()
    .slice(0, 100);
}
