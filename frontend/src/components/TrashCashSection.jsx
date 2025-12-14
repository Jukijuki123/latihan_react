import React from 'react'
import superHero from '../assets/img/superHero.png';
import { Link } from 'react-router-dom'


const TrashCashSection = () => {
  return (
    <section id='trashcash' className='bg-primary-light px-6 py-10'>
        <div className='flex flex-col max-w-6xl md:flex-row items-center justify-beetween px-4 mt-6'>
            <div className='md:w-1/2'>
                <img src={superHero} alt="Penyelamat Bumi" className='w-[50%] md:w-[60%] mx-auto' />
            </div>
            <div className='md:w-1/2'>
                <h2 className='text-3xl md:text-4xl font-semibold text-primary-dark mb-3 md:mb-6'>Dari Sampah <span className='text-white'>Jadi Cuan</span></h2>
                <p className="text-primary-dark mb-6 text-sm md:text-base">Fitur Cara Kerja membantu kamu memahami langkah mudah untuk menjual sampah melalui website ini. Cukup kumpulkan sampah dari rumah, pilih lokasi pengepul terdekat, lalu antar langsung ke tempat tersebut. Setelah ditimbang, kamu akan mendapatkan uang dan poin hijau sebagai bentuk apresiasi atas kontribusimu menjaga lingkungan.</p>
                <Link to="/trashcash">
                    <button className="px-8 py-2 bg-linear-to-r from-primary-dark to-secondary rounded-full text-base lg:text-lg font-semibold text-white hover:scale-105 transition duration-300 cursor-pointer">Ayo Jual</button>
                </Link>
            </div>
        </div>
    </section>
  )
}

export default TrashCashSection
