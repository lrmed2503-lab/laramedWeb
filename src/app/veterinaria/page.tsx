import type { Metadata } from "next";
import Link from "next/link";
import { BarraMovil } from "@/components/pie";
import { claseBoton, TarjetaProducto } from "@/components/ui";
import { obtenerCatalogo, obtenerVeterinarios } from "@/lib/catalogo";

// Equipos de uso veterinario (área «Veterinaria» en el ERP): sección aparte del catálogo médico.

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Equipos veterinarios en Bolivia",
  description:
    "Equipos para clínicas y hospitales veterinarios, con cotización, capacitación y servicio técnico en Bolivia.",
  alternates: { canonical: "/veterinaria" },
};

export default async function Veterinaria() {
  const [c, lista] = await Promise.all([
    obtenerCatalogo(),
    obtenerVeterinarios(),
  ]);

  return (
    <>
      <section className="bg-hielo">
        <div className="mx-auto max-w-[1240px] px-4 pt-8 pb-8 sm:px-6 sm:pt-10">
          <nav aria-label="Ruta" className="text-sm text-niebla">
            <Link href="/">Inicio</Link> / Veterinaria
          </nav>
          <h1 className="mt-2.5 mb-2 font-titulo text-[30px] font-bold text-noche sm:text-[40px]">
            Equipos veterinarios
          </h1>
          <p className="m-0 max-w-[720px] text-[17px] text-niebla">
            Equipos para clínicas y hospitales veterinarios. Cada producto tiene
            su botón para pedir cotización o ficha técnica.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-4 pt-7 pb-24 sm:px-6">
        <p className="mt-0 mb-4 text-[15px] text-niebla">
          {lista.length === 1 ? "1 producto" : `${lista.length} productos`}
        </p>
        {lista.length === 0 ? (
          <div className="rounded-3xl border border-linea p-8 text-center">
            <p className="mt-0 mb-4 text-lg text-tinta">
              Pronto publicaremos aquí nuestros equipos veterinarios.
            </p>
            <Link href="/#contacto" className={claseBoton("primario", true)}>
              Consultar por un equipo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {lista.map((p, i) => (
              <TarjetaProducto key={p.slug} p={p} prioridad={i < 3} />
            ))}
          </div>
        )}
      </section>
      <BarraMovil whatsapp={c.empresa.whatsapp} />
    </>
  );
}
