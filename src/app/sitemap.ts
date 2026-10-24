import type { MetadataRoute } from "next";
import { obtenerCatalogo } from "@/lib/catalogo";
import { sitioUrl } from "@/lib/sitio";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const c = await obtenerCatalogo();
  const s = sitioUrl();
  return [
    { url: `${s}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${s}/productos`, changeFrequency: "weekly", priority: 0.9 },
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
