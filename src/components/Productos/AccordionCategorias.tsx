"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { getCategories } from '@/lib/getQueries';
export default function AccordionCategorias({slug}){
  const [categorias, setCategorias] = useState([])
  useEffect(()=>{
    async function fetchData(){
      const categoriesData = await getCategories();
      setCategorias(categoriesData.categories || [])       
    }
    fetchData()
  },[])
  return(
    <div className="md:sticky md:top-24 md:h-fit">
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<span className="text-blue-900 text-2xl">+</span>}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <h3 className="text-blue-900 text-xl md:text-2xl font-semibold">
                  Todas las Categorías
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
                          className={`block py-1 transition-colors duration-200 ${
                            categoria.slug === slug 
                              ? 'text-blue-600 font-semibold' 
                              : 'text-gray-700 hover:text-blue-600'
                          }`}
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
  )
}
