import { Search } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { BarraMovil } from "@/components/pie";
import { claseBoton, TarjetaProducto } from "@/components/ui";
import { obtenerCatalogo } from "@/lib/catalogo";
import {
  areasConProductos,
  deFamilia,
  FAMILIAS,
  type Familia,
  filtrarProductos,
  marcasDeProductos,
  ORDEN_FAMILIAS,
} from "@/lib/catalogo-base";

// Catálogo de una familia (equipos en /productos, insumos en /insumos, repuestos en /repuestos):
// filtros por área (solo las que tienen productos de la familia), marca y búsqueda.

export type ParamsFamilia = Promise<
  Record<string, string | string[] | undefined>
>;

const uno = (v: string | string[] | undefined) =>
  (Array.isArray(v) ? v[0] : v)?.slice(0, 100) ?? "";

export async function metadataFamilia(
  familia: Familia,
  searchParams: ParamsFamilia,
): Promise<Metadata> {
  const sp = await searchParams;
  const f = FAMILIAS[familia];
  const c = await obtenerCatalogo();
  const area = c.areas.find((a) => a.slug === uno(sp.area));
  const titulo = area
    ? `${area.nombre}: ${f.tituloGoogle}`
    : `${f.nombre} en Bolivia`;
  return {
    title: titulo,
    description: `${area ? `${area.nombre}: ` : ""}${f.detalle.toLowerCase()}. Cotización y entrega en todo el país, con servicio técnico propio de LaraMed.`,
    alternates: {
      canonical: area ? `${f.ruta}?area=${area.slug}` : f.ruta,
    },
    // Búsquedas y combinaciones de filtros no se indexan (solo la familia y cada área).
    robots:
      uno(sp.q) || uno(sp.marca) ? { index: false, follow: true } : undefined,
  };
}

export async function PaginaFamilia({
  familia,
  searchParams,
}: {
  familia: Familia;
  searchParams: ParamsFamilia;
}) {
  const sp = await searchParams;
  const f = FAMILIAS[familia];
  const c = await obtenerCatalogo();
  const productos = deFamilia(c.productos, familia);
  const areas = areasConProductos(c.areas, productos);
  const area = c.areas.find((a) => a.slug === uno(sp.area))?.slug ?? "";
  // Un área elegida sin productos de esta familia (enlace viejo) se sigue mostrando como filtro.
  const areasFiltro =
    area && !areas.some((a) => a.slug === area)
      ? [...areas, ...c.areas.filter((a) => a.slug === area)]
      : areas;
  const marcas = marcasDeProductos(productos);
  const marca =
    marcas.find((m) => m.toLowerCase() === uno(sp.marca).toLowerCase()) ?? "";
  const q = uno(sp.q).trim();
  const lista = filtrarProductos(productos, { area, marca, q });
  const nombreArea = new Map(c.areas.map((a) => [a.slug, a.nombre]));
  const enlace = (cambios: { area?: string; marca?: string }) => {
    const u = new URLSearchParams();
    const a = cambios.area ?? area;
    const m = cambios.marca ?? marca;
    if (a) u.set("area", a);
    if (m) u.set("marca", m);
    if (q) u.set("q", q);
    const t = u.toString();
    return t ? `${f.ruta}?${t}` : f.ruta;
  };
  const cuenta = (a: string) =>
    filtrarProductos(productos, { area: a, marca, q }).length;
  const cuantos = (x: Familia) => deFamilia(c.productos, x).length;

  return (
    <>
      <section className="bg-hielo">
        <div className="mx-auto max-w-[1240px] px-4 pt-8 pb-8 sm:px-6 sm:pt-10">
          <nav aria-label="Ruta" className="text-sm text-niebla">
            <Link href="/">Inicio</Link> / Productos /{" "}
            {area ? <Link href={f.ruta}>{f.nombre}</Link> : f.nombre}
            {area && <> / {nombreArea.get(area)}</>}
          </nav>
          <h1 className="mt-2.5 mb-2 font-titulo text-[30px] font-bold text-noche sm:text-[40px]">
            {area ? `${f.nombre}: ${nombreArea.get(area)}` : f.nombre}
          </h1>
          <p className="mt-0 mb-5 text-[17px] text-niebla">
            Elija el área o la marca. Cada producto tiene su botón para pedir
            cotización.
          </p>
          <nav
            aria-label="Familias de productos"
            className="-mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0"
          >
            {ORDEN_FAMILIAS.map((x) => {
              const activa = x === familia;
              return (
                <Link
                  key={x}
                  href={FAMILIAS[x].ruta}
                  aria-current={activa ? "page" : undefined}
                  className={`shrink-0 rounded-full border px-4 py-2.5 text-[15px] font-semibold whitespace-nowrap no-underline ${
                    activa
                      ? "border-azul bg-azul text-white hover:text-white"
                      : "border-linea bg-white text-tinta hover:border-azul"
                  }`}
                >
                  {FAMILIAS[x].nombre}{" "}
                  <span
                    className={
                      activa ? "font-normal" : "font-normal text-niebla"
                    }
                  >
                    ({cuantos(x)})
                  </span>
                </Link>
              );
            })}
          </nav>
          <form action={f.ruta} className="flex max-w-[560px] gap-2">
            {area && <input type="hidden" name="area" value={area} />}
            {marca && <input type="hidden" name="marca" value={marca} />}
            <label className="relative flex-1">
              <span className="sr-only">
                Buscar en {f.nombre.toLowerCase()}
              </span>
              <Search
                className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-niebla"
                aria-hidden="true"
              />
              <input
                type="search"
                name="q"
                defaultValue={q}
                maxLength={100}
                placeholder={f.buscar}
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
          {areasFiltro.length > 0 && (
            <div>
              <h2 className="mt-0 mb-2.5 text-xs font-bold tracking-[2px] text-niebla uppercase">
                Área
              </h2>
              <ul className="m-0 flex list-none flex-wrap gap-1 p-0 md:flex-col md:flex-nowrap">
                {[{ slug: "", nombre: "Todas" }, ...areasFiltro].map((a) => {
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
          )}
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
              {f.vacio}
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
              <p className="mt-0 mb-1 text-lg text-tinta">
                {productos.length
                  ? "No encontramos productos con esos filtros."
                  : `Pronto publicaremos aquí nuestros ${f.nombre.toLowerCase()}.`}
              </p>
              <p className="mt-0 mb-4 text-niebla">{f.vacio}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {productos.length > 0 && (
                  <Link href={f.ruta} className={claseBoton("borde", true)}>
                    Ver todos
                  </Link>
                )}
                <Link
                  href="/#contacto"
                  className={claseBoton("primario", true)}
                >
                  Consultar
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
