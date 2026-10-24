import Link from "next/link";
import { claseBoton } from "@/components/ui";

export default function NoEncontrado() {
  return (
    <section className="mx-auto flex max-w-[720px] flex-col items-center gap-4 px-4 py-24 text-center">
      <p className="m-0 text-[13px] font-bold tracking-[3px] text-turquesa-profundo uppercase">
        Página no encontrada
      </p>
      <h1 className="m-0 font-titulo text-[32px] font-bold text-noche">
        Esta página ya no está disponible
      </h1>
      <p className="m-0 text-lg text-niebla">
        Puede que el producto haya cambiado de dirección. Búsquelo en el
        catálogo o escríbanos.
      </p>
      <div className="flex flex-wrap justify-center gap-2.5">
        <Link href="/productos" className={claseBoton("primario")}>
          Ver catálogo
        </Link>
        <Link href="/#contacto" className={claseBoton("borde")}>
          Contactarnos
        </Link>
      </div>
    </section>
  );
}
