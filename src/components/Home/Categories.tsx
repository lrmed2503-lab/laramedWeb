"use client"
import Link from 'next/link'
import {getCategories} from '@/lib/getQueries'
import {useState, useEffect} from 'react'
export default function Categories(){
  const [categories, setCategories] = useState([])
  useEffect(()=>{
    async function fetchData(){
      const data = await getCategories();
      setCategories(data.categories || []);
    }
    fetchData()
  },[])
  
  return(
    <section className="bg-gray-50 my-22 px-5">
          <div className="container mx-auto py-5">
            <h2 className="text-4xl font-semibold text-blue-900 border-b-2 border-blue-300 pb-2">Productos y Soluciones</h2>
            <section className="grid md:grid-cols-2 lg:grid-cols-3 mt-4  text-shadow-lg">
            {
              categories && categories.length > 0 ?
              (
                 categories.map((category,index)=>(
                  <Link key={index} href={`/categorias/${category.slug}`} className='border-1 border-gray-400 md:w-[370px] md:h-[370px] flex flex-col justify-center items-center rounded-full shadow-lg m-4 hover:scale-105 hover:shadow-2xl transition-all duration-300'>
                   <img src={category.imagen} className="max-h-[200px] w-auto max-w-[80%]" />
                   <h3 className="max-w-[72%] text-center font-semibol text-3xl">{category.nombre}</h3>
                 </Link> 
                 ))
              )
              :
              (
                <>
                <div/>
                <h2 className="text-center text-2xl text-gray-800"> Aun no tenemos categorias disponibles </h2>
                </>
              )
            }
            </section>
          </div>
      </section>
  )
}
