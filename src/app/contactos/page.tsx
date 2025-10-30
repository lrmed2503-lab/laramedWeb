import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contactanos - Laramed S.R.L: Líder en Importación de Equipos Médicos en Bolivia",
  description: "Nuestra mision es ser un referente nacional, en suministro de equipo e insumo medico de alta tecnología, garantizando la calidad y soporte técnico oportuno, trabajando siempre el cuidado de la salud de los pacientes de nuestros clientes.",
};

export default function Contactos(){
  return(
    <>
        <section className="relative bg-[url('/banner.jpg')] h-[70dvh] md:h-[80dvh] max-h-[900px] bg-cover bg-fixed flex justify-center items-center text-white px-5">
            <div className="absolute bg-black h-full w-full opacity-40 z-0"/>
            <h1 className="z-20 font-bold text-center  text-4xl md:text-6xl container mx-auto text-shadow-lg">Comunícate ahora </h1>
        </section>
        
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Información de Contacto</h2>
                        
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <div className="bg-blue-50 p-3 rounded-full mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#15599a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">Dirección</h3>
                                    <p className="text-gray-600">Miraflores, Av. Villalobos, Edif. Villalobos, Bloque A of. 1 La Paz - Bolivia</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-blue-50 p-3 rounded-full mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#15599a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">Teléfono</h3>
                                    <p className="text-gray-600"><a href="tel:2263451">2263451</a></p>
                                    <p className="text-gray-600"><a href="tel:69722332">+591 69722332</a></p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-blue-50 p-3 rounded-full mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#15599a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">Correo Electrónico</h3>
                                    <p className="text-gray-600"><a href="mailto:info@laramed.com">info@laramed.com</a></p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="bg-blue-50 p-3 rounded-full mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#15599a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-700">Horario de Atención</h3>
                                    <p className="text-gray-600">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                                    <p className="text-gray-600">Sábados: 9:00 AM - 1:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Formulario de contacto */}
                    <div className="md:col-span-2 bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Envíanos un Mensaje</h2>
                        
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo *</label>
                                    <input 
                                        type="text" 
                                        id="nombre" 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico *</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-1">Asunto *</label>
                                <input 
                                    type="text" 
                                    id="asunto" 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">Mensaje *</label>
                                <textarea 
                                    id="mensaje" 
                                    rows={5} 
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                ></textarea>
                            </div>
                            
                            <button 
                                type="submit" 
                                className="w-full bg-[#15599a] text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 font-medium"
                            >
                                Enviar Mensaje
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        
        <section className="py-16">
            <div className="container mx-auto px-5">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Nuestra Ubicación</h2>
                
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.461079321604!2d-68.11856879999999!3d-16.5028042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f21458357b6c1%3A0x1800c607bdbb826a!2sEdificio%20Villalobos!5e0!3m2!1ses-419!2sbo!4v1761837810013!5m2!1ses-419!2sbo" width={930} height={600} className="mx-auto" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </section>
        
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-5">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Preguntas Frecuentes</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">¿Qué tipos de equipos médicos ofrecen?</h3>
                        <p className="text-gray-600">Ofrecemos una amplia gama de equipos médicos que incluyen equipos de diagnóstico, monitores de signos vitales, equipos de terapia y más.</p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">¿Ofrecen servicio técnico y mantenimiento?</h3>
                        <p className="text-gray-600">Sí, contamos con un equipo de técnicos especializados para el mantenimiento y reparación de todos nuestros equipos médicos.</p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">¿Realizan envíos a todo el país?</h3>
                        <p className="text-gray-600">Sí, realizamos envíos a nivel nacional con opciones de entrega express según las necesidades del cliente.</p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">¿Tienen opciones de financiamiento?</h3>
                        <p className="text-gray-600">Sí, ofrecemos diferentes planes de financiamiento y leasing para adaptarnos a las necesidades de cada cliente.</p>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
