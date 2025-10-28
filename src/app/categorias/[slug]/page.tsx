import type { Metadata } from "next";
import { getCategories } from '@/lib/getQueries';
import CategoriaClient from './CategoriaClient';

export async function generateStaticParams() {
  const categoriesData = await getCategories();
  const categorias = categoriesData.categories || [];
  
  return categorias.map((categoria) => ({
    slug: categoria.slug,
  }));
}

// Nueva forma recomendada para metadata dinámica
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const categoriesData = await getCategories();
  const categorias = categoriesData.categories || [];
  const categoriaActual = categorias.find(cat => cat.slug === slug);

  return {
    title: `${categoriaActual?.name || 'Categoría'} - Laramed S.R.L: Líder en Importación de Equipos Médicos en Bolivia`,
    description: "Nuestra mision es ser un referente nacional, en suministro de equipo e insumo medico de alta tecnología, garantizando la calidad y soporte técnico oportuno, trabajando siempre el cuidado de la salud de los pacientes de nuestros clientes.",
  };
}

export default async function CategoriaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const categoriesData = await getCategories();
  const categorias = categoriesData.categories || [];
  const categoriaActual = categorias.find(cat => cat.slug === slug) || null;

  return <CategoriaClient slug={slug} categoriaInitial={categoriaActual} />;
}
