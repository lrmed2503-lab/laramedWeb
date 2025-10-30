"use client"
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getPublicaciones } from '@/lib/getQueries';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Novedades() {
  const [noticias, setNoticias] = useState<any[]>([])
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const data = await getPublicaciones();
      setNoticias(data.publicaciones || []);
    }
    fetchData()
  }, [])

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-BO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Dividir las noticias en grupos de 3
  const noticiasEnGrupos = noticias.reduce((grupos: any[][], noticia, index) => {
    const grupoIndex = Math.floor(index / 3);
    if (!grupos[grupoIndex]) {
      grupos[grupoIndex] = [];
    }
    grupos[grupoIndex].push(noticia);
    return grupos;
  }, []);

  return (
    <section className="relative max-w-5xl mx-auto my-22 px-5">
      <h2 className="text-4xl font-semibold text-blue-900 border-b-2 border-blue-300 pb-2 text-right mb-6">
        Novedades
      </h2>
      {noticias && noticias.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-50 rounded-bl-3xl rounded-br-3xl">
          <div className="h-[390px] relative">
            <img
              src={noticiasEnGrupos[activeSlideIndex]?.[0]?.imagen || "/novedades.jpg"}
              alt={noticiasEnGrupos[activeSlideIndex]?.[0]?.titulo || "novedades"}
              className="h-full w-full object-cover rounded-bl-3xl md:rounded-bl-3xl md:rounded-br-none"
            />
          </div>
          <div className="relative h-[390px]">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={30}
              navigation
              pagination={{ clickable: true }}
              onSlideChange={(swiper) => setActiveSlideIndex(swiper.activeIndex)}
              className="h-full"
            >
              {noticiasEnGrupos.map((grupo, index) => (
                <SwiperSlide key={index} className="p-7 overflow-y-auto">
                  <div className="space-y-6">
                    {grupo.map((noticia) => (
                      <article key={noticia._id} className="border-b-2 border-blue-200 pb-4 last:border-b-0">
                        <h3 className="font-bold text-lg text-blue-950 hover:text-blue-600 transition-colors">
                          <Link href='/noticias'>{noticia.titulo}</Link>
                        </h3>
                        <p className="mt-2 text-gray-700 text-sm">
                          {formatearFecha(noticia.fecha)}
                        </p>
                      </article>
                    ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center py-10">Aún no tenemos novedades</p>
      )}
    </section>
  );
}
