"use client"
import {useState, useEffect} from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Link from 'next/link';
import { getCategories, getProducts } from '@/lib/getQueries';


export default function Productos() {
  const [categorias, setCategorias] = useState([])
  const [productos, setProductos] = useState([])
  useEffect(()=>{
    async function fetchData(){
      const categoriesData = await getCategories()
      setCategorias(categoriesData.categories || [])
      
      const productsData = await getProducts()
      setProductos(productsData.products || [])
    } 
    fetchData()   
  },[])
  return(
    <>
      <section className="relative bg-[url('/banner.jpg')] h-[70dvh] md:h-[80dvh] max-h-[900px] bg-cover bg-fixed flex justify-center items-center text-white">
        <div className="absolute bg-black h-full w-full opacity-40 z-0"/>
        <h1 className="z-20 font-bold text-center text-4xl md:text-6xl container mx-auto text-shadow-lg">
          Laramed S.R.L: Productos y Equipos Médicos para Profesionales de la Salud
        </h1>
      </section>  
      
      <section className='container mx-auto px-5 mb-6'>
        <div className='grid md:grid-cols-[3fr_1fr] mt-18 gap-8'>
          <div>
            <h2 className="text-center md:text-left text-3xl font-bold text-blue-950 mb-8">
              Todos Nuestros Productos
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productos.map((producto) => (
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
          </div>
          
          <div className="md:sticky md:top-24 md:h-fit">
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<span className="text-blue-900 text-2xl">+</span>}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <h3 className="text-blue-900 text-xl md:text-2xl font-semibold">
                  Nuestras Categorías
                </h3>
              </AccordionSummary>
              <AccordionDetails>
                <nav>
                  <ul className="flex flex-col gap-4 text-lg">
                    <li>
                      <Link href="/productos" className="text-blue-600 hover:text-blue-800 font-medium">
                        Todos los Productos
                      </Link>
                    </li>
                    {categorias.map((categoria) => (
                      <li key={categoria._id}>
                        <Link 
                          href={`/categorias/${categoria.slug}`}
                          className="text-gray-700 hover:text-blue-600 transition-colors duration-200 block py-1"
                        >
                          {categoria.nombre}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </section>
    </>
  )
}
