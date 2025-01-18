"use client"; // Ensure this runs on client-side  

import Link from 'next/link';  
import { Search, ShoppingCart, CircleUserRound } from 'lucide-react';  
import { useState } from 'react';  

const Header = () => {  
  const [isSearchOpen, setIsSearchOpen] = useState(false);  
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);   

  const handleSearchToggle = () => {  
    setIsSearchOpen(!isSearchOpen);  
  };  

  const handleUserMenuToggle = () => {  
    setIsUserMenuOpen(!isUserMenuOpen);  
  };  

  return (  
    <nav className="bg-white border-b">  
      <div className="container mx-auto flex justify-between items-center px-4 py-4">  
        {/* Logo */}  
        <Link href="/" className="font-normal text-2xl text-[#2A254B]">
          Avion
        </Link> 

        {/* Right Icons */}  
        <div className="flex items-center space-x-4">  
        <Link href="/Aboutv2" className="text-[#726E8D] hover:text-[#2A254B]">About Us</Link>  
        <Link href="/ContactUs" className="text-[#726E8D] hover:text-[#2A254B]">Contact</Link>  
        <Link href="/Blog" className="text-[#726E8D] hover:text-[#2A254B]">Blog</Link>  
          <Search  
            className="w-5 h-5 text-[#2A254B] cursor-pointer"  
            onClick={handleSearchToggle}  // Toggle search bar on click  
          />  
          <ShoppingCart className="w-5 h-5 text-[#2A254B] cursor-pointer" />  
          <CircleUserRound  
            className="w-5 h-5 text-[#2A254B] cursor-pointer"  
            onClick={handleUserMenuToggle}  // Toggle user menu on click  
          />  
        </div>  
      </div>  

      {/* Search Bar */}  
      {isSearchOpen && (  
        <div className="w-full bg-white p-4 border-t">  
          <input  
            type="text"  
            placeholder="Search..."  
            className="w-full p-2 border rounded-md"  
          />  
        </div>  
      )}  

      {/* Center Links */}  
      <div className="flex-1 bg-gray-100 h-20 flex justify-center space-x-6">  
        <div className='mt-6 space-x-6'>
        <Link href="/" className="text-[#726E8D] hover:text-[#2A254B]">All Products</Link>  
          <Link href="/About" className="text-[#726E8D] hover:text-[#2A254B]">Plant pots</Link>  
          <Link href="/ceramics" className="text-[#726E8D] hover:text-[#2A254B]">Ceramics</Link>  
          <Link href="/tables" className="text-[#726E8D] hover:text-[#2A254B]">Tables</Link>  
          <Link href="/chairs" className="text-[#726E8D] hover:text-[#2A254B]">Chairs</Link>  
          <Link href="/crockery" className="text-[#726E8D] hover:text-[#2A254B]">Crockery</Link>  
          <Link href="/tableware" className="text-[#726E8D] hover:text-[#2A254B]">Tableware</Link>  
          <Link href="/cutlery" className="text-[#726E8D] hover:text-[#2A254B]">Cutlery</Link>
        </div>  
    </div>  

      {/* User Menu */}  
      {isUserMenuOpen && (  
        <div className="absolute top-16 right-8 bg-white shadow-lg rounded-lg w-48 p-4 border">  
          <ul className="space-y-2 text-sm text-[#726E8D]">  
            <li>  
              <Link href="/profile" className="hover:text-[#2A254B]">  
                Profile  
              </Link>  
            </li>  
            <li>  
              <Link href="/Shopping" className="hover:text-[#2A254B]">  
                My Orders  
              </Link>  
            </li>  
            <li>  
              <Link href="/settings" className="hover:text-[#2A254B]">  
                Settings  
              </Link>  
            </li>  
            <li>  
              <Link href="/logout" className="hover:text-[#2A254B]">  
                Logout  
              </Link>  
            </li>  
          </ul>  
        </div>  
      )}  
    </nav>  
  );  
};  

export default Header;