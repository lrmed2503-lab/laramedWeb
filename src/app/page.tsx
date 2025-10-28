import Link from 'next/link'
import Hero from '@/components/Home/Hero'
import Categories from '@/components/Home/Categories'
import Destacados from '@/components/Destacados'
import Novedades from '@/components/Home/Novedades'

import {Award, Wrench , Clock, CheckCircle} from 'lucide-react'

const features = [
    {
      title: "Calidad Garantizada",
      description: "Productos certificados con estándares internacionales de calidad",
      icon: Award
    },
    {
      title: "Soporte Técnico",
      description: "Equipo especializado para instalación y mantenimiento",
      icon: Wrench 
    },
    {
      title: "Entrega Rápida",
      description: "Tiempos de entrega optimizados para tu laboratorio",
      icon: Clock
    }
  ];


export default function Home() {
  return (
    <>
      <Hero />
      <section className="bg-white w-[80%] max-w-[1000px] mx-auto p-5 my-22">
        <div className="grid place-items-center items-center justify-center gap-6 text-center">
          <div>
            <h1 className="font-bold text-4xl text-blue-900">
              Laramed S.R.L: Líder en Importación de Equipos Médicos en Bolivia
            </h1>
            <h2 className="text-2xl my-3">
              ¿Por qué elegir Laramed S.R.L?
            </h2>
                          
              <div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-7"
              >
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div 
                      key={index} 
                      className="text-center group hover:transform hover:scale-105 transition-transform duration-300"
                    >
                      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                        <IconComponent className="w-10 h-10 text-[#64b9c0]" />
                       </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
          </div>
        </div>
      </section>
      <Categories />
      <Destacados />
      <Novedades />
    </>
  );
}
