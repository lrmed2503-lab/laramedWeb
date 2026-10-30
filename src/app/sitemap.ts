import type { MetadataRoute } from "next";
import { obtenerCatalogo, obtenerVeterinarios } from "@/lib/catalogo";
import {
  areasConProductos,
  deFamilia,
  FAMILIAS,
  ORDEN_FAMILIAS,
} from "@/lib/catalogo-base";
import { sitioUrl } from "@/lib/sitio";

// Se arma en cada visita (al construir no hay conexión al ERP); los datos del ERP se guardan 5 min.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [c, vet] = await Promise.all([
    obtenerCatalogo(),
    obtenerVeterinarios(),
  ]);
  const s = sitioUrl();
  return [
    { url: `${s}/`, changeFrequency: "weekly", priority: 1 },
    ...ORDEN_FAMILIAS.filter(
      (f) => f === "equipos" || deFamilia(c.productos, f).length > 0,
    ).map((f) => ({
      url: `${s}${FAMILIAS[f].ruta}`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    {
      url: `${s}/servicios/servicio-tecnico`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${s}/servicios/alquiler-de-equipos`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${s}/nosotros`, changeFrequency: "monthly", priority: 0.6 },
    ...(vet.length
      ? [
          {
            url: `${s}/veterinaria`,
            changeFrequency: "weekly" as const,
            priority: 0.7,
          },
        ]
      : []),
    // Cada área dentro de cada familia que tenga productos en ella.
    ...ORDEN_FAMILIAS.flatMap((f) =>
      areasConProductos(c.areas, deFamilia(c.productos, f)).map((a) => ({
        url: `${s}${FAMILIAS[f].ruta}?area=${a.slug}`,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
    ),
    ...[...c.productos, ...vet].map((p) => ({
      url: `${s}/productos/${p.slug}`,
      lastModified: p.actualizado,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
