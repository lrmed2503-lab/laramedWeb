"use client"
import Link from 'next/link'
import { PortableText } from 'next-sanity';
import ProductoCarousel from '@/components/Productos/ProductoCarousel';
import {useState, useEffect} from 'react'
import { getProduct } from '@/lib/getQueries';
import { FaWhatsapp } from 'react-icons/fa';

function WhatsAppButton({ name }: { name: string }) {
  const generarEnlaceWhatsApp = () => {
    const numero = '59169722332';
    const mensaje = `Hola, estoy interesado en el producto: ${name}. ¿Podrían darme más información?`;
    return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  };

  return (
    <a 
      href={generarEnlaceWhatsApp()}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-green-600 px-4 rounded-2xl text-white text-2xl hover:scale-105 duration-100 font-semibold cursor-pointer text-center transition-transform block flex items-center justify-center gap-4"
    >
      <FaWhatsapp className="h-20 object-cover"/> Pedir más Información
    </a>
  );
}

// Define el tipo del producto para mejor tipado
interface Product {
  nombre: string;
  categoria?: {
    slug: string;
    nombre: string;
  };
  descripcion?: string | any;
  tabla?:string;
}

export default function ContentPage({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const data = await getProduct(slug);
        setProduct(data || null);
      } catch (err) {
        setError('Error al cargar el producto');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [slug]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <section className="container mx-auto flex flex-col gap-6 md:w-full">
      <h1 className="text-blue-950 font-bold text-4xl md:text-5xl">
        {product.nombre}
      </h1>
      
      {product.categoria && (
        <Link 
          href={`/categorias/${product.categoria.slug}`}
          className="text-blue-600 hover:text-blue-800 font-medium text-lg"
        >
          Categoría: {product.categoria.nombre}
        </Link>
      )}

      <div className="text-gray-700 leading-relaxed prose prose-xl">
        {product.descripcion ? (
          typeof product.descripcion === 'string' ? (
            <p>{product.descripcion}</p>
          ) : (
            <PortableText 
              value={product.descripcion}
            />
          )
        ) : (
          <p>No hay descripción disponible para este producto.</p>
        )}
        {product.tabla?(
           <img src={product.tabla} alt={product.nombre} className="max-w-[90%] h-auto object-contain"/>
        ):(<div/>)}
      </div>

      <WhatsAppButton name={product.nombre} />

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">¿Necesitas asesoría técnica?</h3>
        <p className="text-blue-800 text-sm">
          Nuestros especialistas están disponibles para resolver tus dudas sobre este producto.
        </p>
      </div>
    </section>
  );
}
