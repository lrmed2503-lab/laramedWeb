import { getPublicaciones } from '@/lib/getQueries';
import { PortableText } from 'next-sanity';
export default async function Noticias() {
  const data = await getPublicaciones();
  const publicaciones = data.publicaciones || [];

  const formatearFecha = (fechaString: string) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-gray-50">
      <section className="relative bg-[url('/banner.jpg')] h-[70dvh] md:h-[80dvh] max-h-[900px] bg-cover bg-fixed flex justify-center items-center text-white">
        <div className="absolute bg-black h-full w-full opacity-40 z-0"/>
        <h1 className="z-20 font-bold text-center text-4xl md:text-6xl container mx-auto text-shadow-lg">
          Noticias y Casos de Éxito de Laramed S.R.L en el Área Médica
        </h1>
      </section>  
      
      <section className="grid md:grid-cols-2 gap-14 px-5 container mx-auto my-22">
        {publicaciones.length > 0 ? (
          publicaciones.map((publicacion, index) => (
            <div key={publicacion._id} className="shadow-xl p-5 bg-white rounded-lg">
              <img 
                src={publicacion.imagen || '/logo.png'} 
                alt={publicacion.titulo} 
                className="max-w-[90%] h-[300px] md:h-[400px] mx-auto object-contain rounded-lg"
              />
              <h2 className="text-2xl font-bold mt-4 text-blue-950">
                {publicacion.titulo}
              </h2>
              
              {publicacion.fecha && (
                <span className="text-gray-500 text-sm block my-2">
                  {formatearFecha(publicacion.fecha)}
                </span>
              )}
              
              <div className="text-gray-700 mt-3">
                <PortableText 
                  value={publicacion.descripcion}
                />
              </div>
            </div>
          ))
        ) : (
          [1,2,3,4,5,6].map(index => (
            <div key={index} className="shadow-xl p-5 bg-white rounded-lg">
              <img 
                src="/logo.png" 
                alt="imagen" 
                className="max-w-[90%] max-h-[300px] mx-auto object-cover rounded-lg opacity-50"
              />
              <h2 className="text-2xl font-bold mt-4 text-gray-400">
                Próximamente noticia {index}
              </h2>
              <span className="text-gray-400">--/--/----</span>
              <p className="text-gray-400 mt-2">
                Estamos preparando contenido interesante para ti.
              </p>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
