'use client';
import Image from 'next/image';
import logo from '../Images/max.png';

export default function Navbar() {
  return (
    <nav className="p-4 border-0 shadow-xl">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Image 
            src={logo} 
            alt="Logo" 
            width={200} 
            height={100}
            className="w-32 h-auto md:w-40 lg:w-48"
            priority
          />
        </div>
        <div className="text-lg sm:text-xl md:text-2xl font-semibold whitespace-nowrap text-[#2F3779]"
         style={{ fontFamily: "'Zen Antique', serif" }}>
          Project  <span className='text-red-500'>Dashboard</span>

        </div>
      </div>
    </nav>
  )
}