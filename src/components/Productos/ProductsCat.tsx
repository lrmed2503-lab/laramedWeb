"use client"
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getProductsByCategory } from '@/lib/getQueries';

export default function ProductsCat({slug, categoria}: { slug: string; categoria:string }){
  const [ productosCategoria, setProductosCategoria ] = useState([])
  useEffect(()=>{
    async function fetchData(){
      const data = await getProductsByCategory(slug);
      setProductosCategoria(data)
      console.log(data)
    }
    fetchData()
  },[])
  
  return(
    <>
            <h2 className="text-2xl font-bold text-blue-950 mb-6">
              Productos de {categoria}
              <span className="text-gray-500 text-lg ml-2">
                ({productosCategoria.length} productos)
              </span>
            </h2>
            
            {/* Grid de productos de la categoría */}
            {productosCategoria.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productosCategoria.map((producto) => (
                  <Link 
                    key={producto._id} 
                    href={`/productos/${producto.slug}`} 
                    className='flex flex-col items-center gap-3 shadow-lg hover:scale-105 duration-100 rounded-lg bg-gray-50 overflow-hidden'
                  >
                    <img 
                      src={producto.imagenPrincipal || '/logo.png'} 
                      alt={producto.nombre} 
                      className="w-full h-48 object-contain" 
                    />
                    <div className="p-4 text-center w-full">
                      <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                        {producto.nombre}
                      </h2>
                    </div>
                    {producto.modelo && (
                        <span>{producto.modelo}</span>
                    )}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-2xl text-gray-500 mb-4">
                  No hay productos en esta categoría
                </h3>
                <Link 
                  href="/productos" 
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ver todos los productos
                </Link>
              </div>
            )}
    </>
  )
}
