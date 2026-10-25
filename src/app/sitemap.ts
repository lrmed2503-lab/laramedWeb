import type { MetadataRoute } from "next";
import { obtenerCatalogo } from "@/lib/catalogo";
import { sitioUrl } from "@/lib/sitio";

// Se arma en cada visita (al construir no hay conexión al ERP); los datos del ERP se guardan 5 min.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const c = await obtenerCatalogo();
  const s = sitioUrl();
  return [
    { url: `${s}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${s}/productos`, changeFrequency: "weekly", priority: 0.9 },
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
    ...c.areas
      .filter((a) => a.productos > 0)
      .map((a) => ({
        url: `${s}/productos?area=${a.slug}`,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
    ...c.productos.map((p) => ({
      url: `${s}/productos/${p.slug}`,
      lastModified: p.actualizado,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
