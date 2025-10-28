"use client"
import {useState, useEffect} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import {getCarrusel} from '@/lib/getQueries'

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Autoplay, Pagination, Navigation  } from 'swiper/modules';


export default function Hero(){
  const [sliders, setSliders] = useState([])
  useEffect(() => {
    async function fechData() {
      const data = await getCarrusel();
      setSliders(Array.isArray(data.carrusel) ? data.carrusel : []);
    }
    fechData();
  }, []);
  return(
    <section className="relative h-[100dvh] bg-[url('/banner.jpg')] max-h-[900px] bg-cover bg-fixed">
      <div className="absolute bg-black h-full w-full opacity-40 z-0"/>
        {sliders && sliders.length > 0 ? (
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="!relative !h-[100dvh] !max-h-[800px] !w-full !px-7"
            >
              {sliders.map((slider, index) => (
                <SwiperSlide
                  key={index}
                  className="!w-[100%] !flex flex-col-reverse md:flex-row justify-center md:!justify-around !items-center gap-7"
                >
                  <span className="text-4xl md:text-5xl text-white font-bold text-center md:text-center bg-[#64b9c0]/90 rounded-full p-3 w-[94%] md:w-auto">
                    {slider.slideDescription}
                  </span>
                  <div className="flex flex-col gap-1">
                    {slider?.logo && (
                        <img src={slider.logo} className='max-w-[200px] max-h-[100px] object-contain mx-auto' />
                      )
                    }
                    <img
                      src={slider.imagen}
                      alt="imagen prueba"
                      className="max-w-full md:max-h-[500px]"
                    />
                  </div>
                  </SwiperSlide>
                ))}
              </Swiper>
          ) : (
              <div className="flex justify-center items-center h-[100dvh] w-full z-10">
                <span className="text-5xl font-bold text-white text-center text-shadow-lg">
                  Bienvenido a Laramed S.R.L ...
                </span>
              </div>
          )}
      </section>
  )
}
