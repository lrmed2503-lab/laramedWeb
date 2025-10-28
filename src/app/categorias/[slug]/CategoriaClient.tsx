"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AccordionCategorias from '@/components/Productos/AccordionCategorias';
import ProductsCat from '@/components/Productos/ProductsCat';
import { getCategories } from '@/lib/getQueries';

type Categoria = {
  slug: string;
  nombre?: string;
  [key: string]: unknown;
};

export default function CategoriaClient({ slug, categoriaInitial }: { slug: string; categoriaInitial: Categoria | null }) {
  const [_categorias, setCategorias] = useState<Categoria[] | null>(categoriaInitial ? [categoriaInitial] : null);
  const [categoriaActual, setCategoriaActual] = useState<Categoria | null>(categoriaInitial);
  const [loading, setLoading] = useState<boolean>(!categoriaInitial);

  useEffect(() => {
    let mounted = true;
    async function fetchCategories() {
      try {
        setLoading(true);
        const data = await getCategories();
        const cats = data?.categories || [];
        if (!mounted) return;
        setCategorias(cats);
  const found = cats.find((c: Categoria) => c.slug === slug) || null;
        setCategoriaActual(found || categoriaInitial);
      } catch (err) {
        // Keep initial data if fetch fails
        console.error('Error fetching categories', err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    // Only fetch if we don't have initial data
    if (!categoriaInitial) fetchCategories();

    return () => {
      mounted = false;
    };
  }, [slug, categoriaInitial]);

  return (
    <>
      <section className="relative bg-[url('/banner.jpg')] h-[50dvh] md:h-[60dvh] max-h-[600px] bg-cover bg-fixed flex justify-center items-center text-white">
        <div className="absolute bg-black h-full w-full opacity-40 z-0" />
        <div className="z-20 text-center container mx-auto px-5">
          <h1 className="font-bold text-4xl md:text-6xl text-shadow-lg mb-4">
            {categoriaActual?.nombre || (loading ? 'Cargando...' : 'Categoría')}
          </h1>
          <p className="text-xl md:text-2xl opacity-90">Productos y equipos médicos especializados</p>
        </div>
      </section>

      <section className="container mx-auto px-5 mb-6 mt-8">
        <div className="grid md:grid-cols-[3fr_1fr] gap-8">
          <div>
            {/* Breadcrumb */}
            <nav className="flex mb-6 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600">Inicio</Link>
              <span className="mx-2">/</span>
              <Link href="/productos" className="hover:text-blue-600">Productos</Link>
              <span className="mx-2">/</span>
              <span className="text-blue-600 font-medium">{categoriaActual?.nombre}</span>
            </nav>

            <ProductsCat slug={slug} categoria={categoriaActual?.nombre} />
          </div>

          <AccordionCategorias slug={slug} />
        </div>
      </section>
    </>
  );
}
