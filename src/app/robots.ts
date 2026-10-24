import type { MetadataRoute } from "next";
import { sitioUrl } from "@/lib/sitio";

export default function robots(): MetadataRoute.Robots {
  // Las vistas previas de Vercel no se indexan; solo la dirección oficial.
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${sitioUrl()}/sitemap.xml`,
  };
}
