"use client";
import Link from 'next/link';
import { Search, ShoppingCart, CircleUserRound, Menu } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { useCart } from '@/context/CartContext';  
import LanguageSwitcher from '@/components/LanguageSwitcher';

const Navbar = () => {
  const { getTotalItems } = useCart();  // Get total items from cart
  const cartCount = getTotalItems(); // Calculate total items
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);   
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);   
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <nav className="bg-white w-full">
      {/* Top Navigation */}
      <div className="w-full flex justify-between items-center px-4 md:px-8 lg:px-16 py-4 border-b">
        {/* Left Icon */}
        <Search
          className="w-5 h-5 text-[#2A254B] cursor-pointer"
          onClick={handleSearchToggle}   
        />

        {/* Logo */}
        <Link href="/" className="font-normal text-2xl text-[#2A254B]">
          Avion
        </Link>

        {/* Right Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSwitcher /> {/* Language Switcher */}
          <Link href="/Shopping" className="relative">
            <ShoppingCart className="w-5 h-5 text-[#2A254B] cursor-pointer" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1">
                {cartCount} {/* Display total items */}
              </span>
            )}
          </Link>
          <CircleUserRound
            className="w-5 h-5 text-[#2A254B] cursor-pointer"
            onClick={handleUserMenuToggle}  
          />
        </div>

        {/* Mobile Menu Icon */}
        <Menu
          className="w-6 h-6 text-[#2A254B] cursor-pointer md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`${isMenuOpen ? "block" : "hidden"} md:hidden bg-white w-full border-t`}
      >
        <div className="flex flex-col items-center py-4 space-y-4">
          <Link href="/About" className="text-[#726E8D] hover:text-[#2A254B] text-base">
            Plant pots
          </Link>
          <Link href="/ceramics" className="text-[#726E8D] hover:text-[#2A254B] text-base">
            Ceramics
          </Link>
          <Link href="/tables" className="text-[#726E8D] hover:text-[#2A254B] text-base">
            Tables
          </Link>
          <Link href="/chairs" className="text-[#726E8D] hover:text-[#2A254B] text-base">
            Chairs
          </Link>
          <Link href="/crockery" className="text-[#726E8D] hover:text-[#2A254B] text-base">
            Crockery
          </Link>
          <Link href="/tableware" className="text-[#726E8D] hover:text-[#2A254B] text-base">
            Tableware
          </Link>
          <Link href="/cutlery" className="text-[#726E8D] hover:text-[#2A254B] text-base">
            Cutlery
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="w-full bg-white p-4 border-t">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full p-2 pr-10 border rounded-md focus:outline-none focus:border-[#2A254B]"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Search className="w-5 h-5 text-[#2A254B]" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* User Menu */}
      {isUserMenuOpen && (
        <div className="absolute z-20 top-16 right-8 bg-white shadow-lg rounded-lg w-48 p-4 border">
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
              <Link href="/Aboutv2" className="hover:text-[#2A254B]">
                Aboutv2
              </Link>
            </li>
            <li>
              <Link href="/HomePageV2" className="hover:text-[#2A254B]">
                HomePageV2
              </Link>
            </li>
            <li>
              <Link href="/ContactUs" className="hover:text-[#2A254B]">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/SingleProduct" className="hover:text-[#2A254B]">
                Single Product 
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

      {/* Category Navigation for Larger Screens */}
      <div className="hidden md:block w-full border-t">
        <div className="flex justify-center space-x-4 md:space-x-6 lg:space-x-8 py-4 px-8 lg:px-16">
          <Link href="/About" className="text-[#726E8D] hover:text-[#2A254B] text-base">
            Plant pots
          </Link>
          <Link href="/" className="text-[#726E8D] hover:text-[#2A254B] text-base">
            Ceramics
          </Link>
          <Link href="/tables" className="text-[#726E8D] hover:text-[#2A254B] text-base">
            Tables
          </Link>
          <Link href="/chairs" className="text-[#726E8D] hover:text-[#2A254B] text-base">
            Chairs
          </Link>
          <Link href="/crockery" className="text-[#726E8D] hover:text-[#2A254B] text-base">
            Crockery
          </Link>
          <Link href="/tableware" className="text-[#726E8D] hover:text-[#2A254B] text-base">
            Tableware
          </Link>
          <Link href="/cutlery" className="text-[#726E8D] hover:text-[#2A254B] text-base">
            Cutlery
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;