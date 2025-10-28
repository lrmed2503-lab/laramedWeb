// components/ProductoCarousel.tsx
"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProductoCarouselProps {
  imagenes: string[];
  nombre: string;
}

export default function ProductoCarousel({ imagenes, nombre }: ProductoCarouselProps) {
  return (
    <div className="w-[80%] md:w-full md:max-w-3lx">
      {imagenes.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={imagenes.length > 1}
          className="!rounded-lg !shadow-lg !w-[350px] md:!w-full"
        >
          {imagenes.map((imagen, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center h-[600px] bg-gray-100 rounded-lg">
                <img 
                  src={imagen} 
                  alt={`${nombre} - Imagen ${index + 1}`}
                  className="max-h-[600px] w-auto object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg shadow-lg">
          <img 
            src="/logo.png" 
            alt="Imagen no disponible"
            className="max-h-96 w-auto object-contain opacity-50"
          />
        </div>
      )}
    </div>
  );
}
