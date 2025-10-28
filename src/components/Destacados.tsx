"use client"
import Link from 'next/link'
import {useState, useEffect} from 'react'
import {getProducts} from '@/lib/getQueries'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Autoplay, Pagination, Navigation  } from 'swiper/modules';
export default function Destacados(){
const [destacados, setDestacados] = useState([])

useEffect(() => {
  async function fetchData() {
    const data = await getProducts()
    const destacadosFiltrados = data.products.filter(
      product => product.destacado === true
    )
    setDestacados(destacadosFiltrados)

    console.log("data:", data.products)
    console.log("destacados:", destacadosFiltrados)
  }

  fetchData()
}, [])

  return(
    <section className="container mx-auto flex items-center flex-col my-22 px-5">
        <h2 className="text-4xl font-semibold text-blue-900 border-b-2 border-blue-300 pb-2 text-center">Productos Destacados</h2>
        {destacados && destacados.length > 0 ? (
            <Swiper
                slidesPerView={'auto'}
                centeredSlides={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                spaceBetween={60}
                pagination={{ clickable: true }}
                modules={[Pagination, Autoplay]}
                className="container mx-auto text-xl font-semibold text-center !p-18"
            >
                {destacados.map((destacado, index) => (
                <SwiperSlide className="!w-[280px] md:!w-[400px] lg:!w-[600px] shadow-lg p-3 rounded-2xl">
                    <Link href={`/productos/${destacado.slug}`}>
                        <img  src={destacado.imagenPrincipal} alt={destacado.nombre} className="w-full h-auto  max-h-[260px] object-contain" />
                        <h2 className="mt-4">{destacado.nombre}</h2>
                    </Link>
                </SwiperSlide>
               ))} 
            </Swiper>
          ) : (
              <h2 className="text-3xl font-bold my-22 text-center text-gray-700">
                Descubre mas Productos de nuestro Catalogo
              </h2>
          )}
        
        <Link href="/productos" className="p-3 mx-auto bg-blue-950 rounded-2xl text-white cursor-pointer font-semibold hover:scale-110 hover:bg-blue-500 duration-100">Ver Catalogo Completo</Link>
      </section>
  )
}
