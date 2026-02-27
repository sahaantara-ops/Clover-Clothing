"use client";
import React from 'react';
import {Swiper,SwiperSlide} from 'swiper/react';
import 'swiper/css';

import { Autoplay } from 'swiper/modules';


const brandLogos = [
  '/brand1.jpg',
  '/brand2.jpg',
  '/brand3.jpg',
  '/brand4.jpg',
  '/brand5.jpg'
];

const Brands = () => {
    return (
      <Swiper
        slidesPerView={2}
        centeredSlides={true}
        spaceBetween={2}
        grabCursor={true}
        loop={false}
        modules={[Autoplay]}
        autoplay={{
            delay:500,
            disableOnInteraction:false,
        }}
      >
         
        {
  brandLogos.map((logo, index) => (
    <SwiperSlide key={index}>
      <img src={logo} alt={`Brand ${index + 1}`} className='w-20 h-20' />
    </SwiperSlide>
  ))
}
         
        
       
      </Swiper>
    );
};

export default Brands;