import React from 'react'
import { IoLogoInstagram } from "react-icons/io";
import { FaWhatsapp, FaFacebook } from "react-icons/fa";

const Topbar = () => {
  return (
    <div className="bg-Dhapa-red text-white">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="hover:text-gray-300">
            <FaFacebook className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <FaWhatsapp className="h-4 w-4" />
          </a>
        </div>
        <div className="text-sm text-center flex-grow">
          <span>Pengiriman dalam negeri - cepat dan aman!</span>
        </div>
        <div className='text-sm hidden md:block'>
            <a href="Tel: +6281234" className='hover:text-gray-300'>
                +62 81234
            </a>
        </div>
      </div>
    </div>
  );
}

export default Topbar
