"use client";
import Link from 'next/link';
import { Search, ShoppingCart, CircleUserRound, Menu, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { useCart } from '@/context/CartContext';  
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { client, urlFor } from "@/sanity/lib/client";
import { Product } from "types/products";
import Image from 'next/image';

interface SearchSuggestion {
  _id: string;
  name: string;
  category?: string;
  image?: {
    _ref?: string;
    _type: 'image';
  };
}

const Navbar = () => {
  const { getTotalItems } = useCart();  // Get total items from cart
  const cartCount = getTotalItems(); // Calculate total items
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);   
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<SearchSuggestion[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const router = useRouter();
  // const { isSignedIn } = useUser();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    // Focus on search input when opened
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  const fetchSearchSuggestions = async (query: string) => {
    if (!query) {
      setSearchSuggestions([]);
      return;
    }

    try {
      setIsSearchLoading(true);
      const searchQuery = `*[_type == "product" && (
        lower(name) match "*${query.toLowerCase()}*" || 
        lower(category) match "*${query.toLowerCase()}*"
      )][0...5] {
        _id,
        name,
        price,
        image,
        category
      }`;
      
      const results = await client.fetch(searchQuery);
      setSearchSuggestions(results);
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    } finally {
      setIsSearchLoading(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Debounce search suggestions
    const timerId = setTimeout(() => {
      fetchSearchSuggestions(query);
    }, 300);

    return () => clearTimeout(timerId);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
      setSearchSuggestions([]);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Close search on Escape key
    if (e.key === 'Escape') {
      setIsSearchOpen(false);
      setSearchQuery("");
      setSearchSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    router.push(`/search?q=${encodeURIComponent(suggestion.name)}`);
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchSuggestions([]);
  };

  const toggleCategoriesDropdown = () => {
    setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen);
  };

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSearchOpen && 
        searchInputRef.current && 
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
        setSearchQuery("");
        setSearchSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <nav className="bg-white w-full relative">
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
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <CircleUserRound
                className="w-5 h-5 text-[#2A254B] cursor-pointer"
              />
            </SignInButton>
          </SignedOut>
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
            About
          </Link>
          <Link href="/ProductListing" className="text-[#726E8D] hover:text-[#2A254B] text-base">
            Product Listing
          </Link>
          <Link href="/ContactUs" className="text-[#726E8D] hover:text-[#2A254B] text-base">
            Contact Us
          </Link>
          <Link href="/Shopping" className="text-[#726E8D] hover:text-[#2A254B] text-base">
            Shopping
          </Link>
          <Link href="/FAQ" className="text-[#726E8D] hover:text-[#2A254B] text-base">
            FAQ
          </Link>
          {/* Mobile Categories */}
          <div className="relative w-full text-center">
            <div 
              onClick={toggleCategoriesDropdown}
              className="text-[#726E8D] hover:text-[#2A254B] text-base flex items-center justify-center cursor-pointer"
            >
              Categories 
              <ChevronDown 
                className={`ml-2 transition-transform duration-200 ${
                  isCategoriesDropdownOpen ? 'rotate-180' : ''
                }`} 
                size={20} 
              />
            </div>
            
            {isCategoriesDropdownOpen && (
              <div className="mt-2 space-y-2">
                <Link href="/categories/ceramics" className="block text-[#726E8D] hover:text-[#2A254B] text-sm">
                  Ceramics
                </Link>
                <Link href="/categories/plant-pots" className="block text-[#726E8D] hover:text-[#2A254B] text-sm">
                  Plant Pots
                </Link>
                <Link href="/categories/tables" className="block text-[#726E8D] hover:text-[#2A254B] text-sm">
                  Tables
                </Link>
                <Link href="/categories/chairs" className="block text-[#726E8D] hover:text-[#2A254B] text-sm">
                  Chairs
                </Link>
                <Link href="/categories/crockery" className="block text-[#726E8D] hover:text-[#2A254B] text-sm">
                  Crockery
                </Link>
                <Link href="/categories/tableware" className="block text-[#726E8D] hover:text-[#2A254B] text-sm">
                  Tableware
                </Link>
                <Link href="/categories/cutlery" className="block text-[#726E8D] hover:text-[#2A254B] text-sm">
                  Cutlery
                </Link>
              </div>
            )}
          </div>
          {/* Mobile Authentication */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <span className="text-[#726E8D] hover:text-[#2A254B] text-base">
                Login
              </span>
            </SignInButton>
          </SignedOut>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block w-full border-t">
        <div className="flex justify-center space-x-4 md:space-x-6 lg:space-x-8 py-4 px-8 lg:px-16">
          <Link href="/About" className="text-[#726E8D] hover:text-[#2A254B] text-base">
            About
          </Link>
          <Link href="/ProductListing" className="text-[#726E8D] hover:text-[#2A254B] text-base">
            Product Listing
          </Link>
          <Link href="/ContactUs" className="text-[#726E8D] hover:text-[#2A254B] text-base">
            Contact Us
          </Link>
          <Link href="/FAQ" className="text-[#726E8D] hover:text-[#2A254B] text-base">
            FAQ
          </Link>
          <div className="relative">
            <div 
              onClick={toggleCategoriesDropdown}
              className="text-[#726E8D] hover:text-[#2A254B] text-base flex items-center cursor-pointer"
            >
              Categories 
              <ChevronDown 
                className={`ml-2 transition-transform duration-200 ${
                  isCategoriesDropdownOpen ? 'rotate-180' : ''
                }`} 
                size={20} 
              />
            </div>
            
            {isCategoriesDropdownOpen && (
              <div className="absolute z-20 mt-2 bg-white shadow-lg rounded-lg border p-4 space-y-2 w-48">
                <Link href="/categories/ceramics" className="block text-[#726E8D] hover:text-[#2A254B] text-sm">
                  Ceramics
                </Link>
                <Link href="/categories/plant-pots" className="block text-[#726E8D] hover:text-[#2A254B] text-sm">
                  Plant Pots
                </Link>
                <Link href="/categories/tables" className="block text-[#726E8D] hover:text-[#2A254B] text-sm">
                  Tables
                </Link>
                <Link href="/categories/chairs" className="block text-[#726E8D] hover:text-[#2A254B] text-sm">
                  Chairs
                </Link>
                <Link href="/categories/crockery" className="block text-[#726E8D] hover:text-[#2A254B] text-sm">
                  Crockery
                </Link>
                <Link href="/categories/tableware" className="block text-[#726E8D] hover:text-[#2A254B] text-sm">
                  Tableware
                </Link>
                <Link href="/categories/cutlery" className="block text-[#726E8D] hover:text-[#2A254B] text-sm">
                  Cutlery
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Dropdown */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-white z-50 border-b p-4 shadow-md">
          <form onSubmit={handleSearch} className="max-w-md mx-auto relative">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search products..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2A254B] pr-10"
            />
            {isSearchLoading ? (
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#2A254B]">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : searchQuery && (
              <button 
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSearchSuggestions([]);
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#2A254B] hover:text-opacity-70"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>

          {/* Search Suggestions */}
          {searchSuggestions.length > 0 && (
            <div className="max-w-md mx-auto mt-2 bg-white border rounded-md shadow-lg">
              {searchSuggestions.map((suggestion) => (
                <div 
                  key={suggestion._id} 
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                >
                  <Image 
                    src={suggestion.image?._ref 
                      ? urlFor({ asset: { _ref: suggestion.image._ref, _type: 'image' } }).width(100).height(100).url() 
                      : '/placeholder-image.png'} 
                    alt={suggestion.name} 
                    className="w-10 h-10 mr-3 object-cover rounded"
                  />
                  <div>
                    <p className="text-sm font-medium">{suggestion.name}</p>
                    <p className="text-xs text-gray-500">{suggestion.category}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;