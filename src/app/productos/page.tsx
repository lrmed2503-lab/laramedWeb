import { Search } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { BarraMovil } from "@/components/pie";
import { claseBoton, TarjetaProducto } from "@/components/ui";
import { obtenerCatalogo } from "@/lib/catalogo";
import { filtrarProductos, marcasDeProductos } from "@/lib/catalogo-base";

type Params = Promise<Record<string, string | string[] | undefined>>;

const uno = (v: string | string[] | undefined) =>
  (Array.isArray(v) ? v[0] : v)?.slice(0, 100) ?? "";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Params;
}): Promise<Metadata> {
  const sp = await searchParams;
  const c = await obtenerCatalogo();
  const area = c.areas.find((a) => a.slug === uno(sp.area));
  const titulo = area
    ? `${area.nombre}: equipos médicos en Bolivia`
    : "Catálogo de equipos e insumos médicos";
  return {
    title: titulo,
    description: area
      ? `${area.nombre}: equipos e insumos médicos con cotización, instalación y servicio técnico en Bolivia.`
      : "Ventiladores, máquinas de anestesia, monitores, bombas de infusión, diagnóstico e insumos médicos en Bolivia.",
    alternates: {
      canonical: area ? `/productos?area=${area.slug}` : "/productos",
    },
    // Búsquedas y combinaciones de filtros no se indexan (solo el catálogo y cada área).
    robots:
      uno(sp.q) || uno(sp.marca) ? { index: false, follow: true } : undefined,
  };
}

export default async function Catalogo({
  searchParams,
}: {
  searchParams: Params;
}) {
  const sp = await searchParams;
  const c = await obtenerCatalogo();
  const area = c.areas.find((a) => a.slug === uno(sp.area))?.slug ?? "";
  const marcas = marcasDeProductos(c.productos);
  const marca =
    marcas.find((m) => m.toLowerCase() === uno(sp.marca).toLowerCase()) ?? "";
  const q = uno(sp.q).trim();
  const lista = filtrarProductos(c.productos, { area, marca, q });
  const nombreArea = new Map(c.areas.map((a) => [a.slug, a.nombre]));
  const enlace = (cambios: { area?: string; marca?: string }) => {
    const u = new URLSearchParams();
    const a = cambios.area ?? area;
    const m = cambios.marca ?? marca;
    if (a) u.set("area", a);
    if (m) u.set("marca", m);
    if (q) u.set("q", q);
    const t = u.toString();
    return t ? `/productos?${t}` : "/productos";
  };
  const cuenta = (a: string) =>
    filtrarProductos(c.productos, { area: a, marca, q }).length;
  const titulo = area ? nombreArea.get(area) : "Catálogo de equipos e insumos";

  return (
    <>
      <section className="bg-hielo">
        <div className="mx-auto max-w-[1240px] px-4 pt-8 pb-8 sm:px-6 sm:pt-10">
          <nav aria-label="Ruta" className="text-sm text-niebla">
            <Link href="/">Inicio</Link> /{" "}
            {area ? <Link href="/productos">Productos</Link> : "Productos"}
            {area && <> / {nombreArea.get(area)}</>}
          </nav>
          <h1 className="mt-2.5 mb-2 font-titulo text-[30px] font-bold text-noche sm:text-[40px]">
            {titulo}
          </h1>
          <p className="mt-0 mb-5 text-[17px] text-niebla">
            Elija el área o la marca. Cada producto tiene su botón para pedir
            cotización o ficha técnica.
          </p>
          <form action="/productos" className="flex max-w-[560px] gap-2">
            {area && <input type="hidden" name="area" value={area} />}
            {marca && <input type="hidden" name="marca" value={marca} />}
            <label className="relative flex-1">
              <span className="sr-only">Buscar en el catálogo</span>
              <Search
                className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-niebla"
                aria-hidden="true"
              />
              <input
                type="search"
                name="q"
                defaultValue={q}
                maxLength={100}
                placeholder="Buscar equipo o insumo…"
                className="w-full rounded-full border border-linea bg-white py-3.5 pr-4 pl-11 text-base"
              />
            </label>
            <button type="submit" className={claseBoton("primario")}>
              Buscar
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto flex max-w-[1240px] flex-wrap items-start gap-8 px-4 pt-7 pb-24 sm:px-6">
        <aside
          aria-label="Filtros"
          className="flex w-full flex-col gap-6 md:w-64 md:shrink-0"
        >
          <div>
            <h2 className="mt-0 mb-2.5 text-xs font-bold tracking-[2px] text-niebla uppercase">
              Área
            </h2>
            <ul className="m-0 flex list-none flex-wrap gap-1 p-0 md:flex-col md:flex-nowrap">
              {[{ slug: "", nombre: "Todas" }, ...c.areas].map((a) => {
                const activo = area === a.slug;
                return (
                  <li key={a.slug || "todas"} className="shrink-0">
                    <Link
                      href={enlace({ area: a.slug })}
                      aria-current={activo ? "page" : undefined}
                      className={`block rounded-xl px-3 py-2.5 font-semibold no-underline ${
                        activo
                          ? "bg-hielo text-azul"
                          : "text-tinta hover:bg-hielo"
                      }`}
                    >
                      {a.nombre}{" "}
                      <span className="font-normal text-niebla">
                        ({cuenta(a.slug)})
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          {marcas.length > 0 && (
            <div>
              <h2 className="mt-0 mb-2.5 text-xs font-bold tracking-[2px] text-niebla uppercase">
                Marca
              </h2>
              <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
                {["", ...marcas].map((m) => {
                  const activo = marca === m;
                  return (
                    <li key={m || "todas"}>
                      <Link
                        href={enlace({ marca: m })}
                        aria-current={activo ? "page" : undefined}
                        className={`inline-block rounded-full border px-3 py-2 text-[13px] font-semibold no-underline ${
                          activo
                            ? "border-azul bg-azul text-white hover:text-white"
                            : "border-linea bg-white text-tinta hover:border-azul"
                        }`}
                      >
                        {m || "Todas"}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <div className="hidden flex-col gap-2.5 rounded-[20px] bg-noche p-5 text-white md:flex">
            <p className="m-0 font-titulo text-[17px] font-semibold">
              ¿No encuentra lo que busca?
            </p>
            <p className="m-0 text-sm leading-snug text-niebla-clara">
              Importamos bajo pedido. Cuéntenos qué equipo necesita.
            </p>
            <Link
              href="/#contacto"
              className={`${claseBoton("acento", true)} self-start`}
            >
              Consultar
            </Link>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <p className="mt-0 mb-4 text-[15px] text-niebla" aria-live="polite">
            {lista.length === 1 ? "1 producto" : `${lista.length} productos`}
            {q && ` para «${q}»`}
          </p>
          {lista.length === 0 ? (
            <div className="rounded-3xl border border-linea p-8 text-center">
              <p className="mt-0 mb-4 text-lg text-tinta">
                No encontramos productos con esos filtros.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Link href="/productos" className={claseBoton("borde", true)}>
                  Ver todo el catálogo
                </Link>
                <Link
                  href="/#contacto"
                  className={claseBoton("primario", true)}
                >
                  Consultar por el equipo
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {lista.map((p, i) => (
                <TarjetaProducto
                  key={p.slug}
                  p={p}
                  area={nombreArea.get(p.area ?? "")}
                  prioridad={i < 3}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      <BarraMovil whatsapp={c.empresa.whatsapp} />
    </>
  );
}
