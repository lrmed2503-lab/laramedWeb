"use client"
import {useState, useEffect} from 'react'
import { getPublicaciones } from '@/lib/getQueries';

export default  function Novedades() {
  const [noticias, setNoticias] = useState([])
  useEffect(()=>{
    async function fetchData(){
      const data = await getPublicaciones();
      setNoticias(data.publicaciones || []);
    }
    fetchData()
  },[])
 

  return (
    <section className="relative max-w-5xl mx-auto my-22 px-5">
      <h2 className="text-4xl font-semibold text-blue-900 border-b-2 border-blue-300 pb-2 text-right">
        Novedades
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-50 max-h-[390px] rounded-bl-3xl rounded-br-3xl">
        <img
          src="/novedades.jpg"
          alt="novedades"
          className="h-[390px] w-full object-cover rounded-bl-3xl md:rounded-bl-3xl md:rounded-br-none"
        />
        <div className="p-7 overflow-y-auto max-h-[390px]">
          {noticias && noticias.length > 0 ? (
            noticias.map((noticia) => (
              <article key={noticia._id} className="border-b-2 border-blue-200 py-5 last:border-b-0">
                <h2 className="font-bold text-lg text-blue-950 underline">{noticia.titulo}</h2>
                <p className="mt-2 text-gray-700">{noticia.fecha}</p>
              </article>
            ))
          ) : (
            <p className="text-gray-500">Aún no tenemos novedades</p>
          )}
        </div>
      </div>
    </section>
  );
}
