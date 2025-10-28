
import { getProduct, getProducts } from '@/lib/getQueries';
import Destacados from '@/components/Destacados';
import ProductoCarousel from '@/components/Productos/ProductoCarousel';
import ContentPage from '@/components/Productos/ContentPage'
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const productsData = await getProducts();
  const productos = productsData.products || [];
  
  return productos.map((producto) => ({
    slug: producto.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  
  if (!product) {
    return {
      title: 'Producto No Encontrado - Laramed',
    };
  }
  
  return {
    title: `Productos - Laramed`,
    description:'Producto médico de calidad' 
  };
}

function WhatsAppButton({ nombre }: { nombre: string }) {
  const generarEnlaceWhatsApp = () => {
    const numero = '59169722332';
    const mensaje = `Hola, estoy interesado en el producto: ${nombre}. ¿Podrían darme más información?`;
    return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  };

  return (
    <a 
      href={generarEnlaceWhatsApp()}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-green-600 p-4 rounded-2xl text-white text-2xl hover:scale-105 duration-100 font-semibold cursor-pointer text-center transition-transform block"
    >
      Comprar Ahora
    </a>
  );
}

export default async function ProductoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  
  if (!product) {
    notFound();
  }

  const todasLasImagenes = [
    product.imagenPrincipal,
    ...(product.imagenes || [])
  ].filter(Boolean);

  return (
    <>
      <section className="container mx-auto grid md:grid-cols-2 gap-10 pt-5 md:pt-22 px-5">
        
        <ProductoCarousel 
          imagenes={todasLasImagenes} 
          nombre={product.nombre} 
        />
        <ContentPage slug={slug} />
        
      </section>
      <Destacados />
    </>  
  );
}
