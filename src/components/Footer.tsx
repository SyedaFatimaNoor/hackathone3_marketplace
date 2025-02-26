import { FaTwitter, FaLinkedin, FaInstagram, FaPinterest } from "react-icons/fa";
import { AiFillFacebook } from "react-icons/ai";
import { TiSocialSkype } from "react-icons/ti";
import Link from 'next/link';

const Footer = () => {  
  return (  
    <footer className="footer bg-[#2A254B] text-white py-12 md:py-16">
      <div className="footer-content container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 style={{ fontFamily: 'ClashDisplay' }} className="font-light text-base mb-4">Menu</h3>
            <ul className="space-y-2 font-light text-[14px]">
              <li><Link href="/new-arrivals" className="text-sm hover:underline hover:text-[#4E4D93] transition-all duration-300">New arrivals</Link></li>
              <li><Link href="/best-sellers" className="text-sm hover:underline hover:text-[#4E4D93] transition-all duration-300">Best sellers</Link></li>
              <li><Link href="/recently-viewed" className="text-sm hover:underline hover:text-[#4E4D93] transition-all duration-300">Recently viewed</Link></li>
              <li><Link href="/popular-this-week" className="text-sm hover:underline hover:text-[#4E4D93] transition-all duration-300">Popular this week</Link></li>
              <li><Link href="/ProductListing" className="text-sm hover:underline hover:text-[#4E4D93] transition-all duration-300">All products</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 style={{ fontFamily: 'ClashDisplay' }} className="font-light text-base mb-4">Categories</h3>
            <ul className="space-y-2 font-light text-[14px]">
              <li><Link href="/crockery" className="text-sm hover:underline hover:text-[#4E4D93] transition-all duration-300">Crockery</Link></li>
              <li><Link href="/furniture" className="text-sm hover:underline hover:text-[#4E4D93] transition-all duration-300">Furniture</Link></li>
              <li><Link href="/homeware" className="text-sm hover:underline hover:text-[#4E4D93] transition-all duration-300">Homeware</Link></li>
              <li><Link href="/plant-pots" className="text-sm hover:underline hover:text-[#4E4D93] transition-all duration-300">Plant pots</Link></li>
              <li><Link href="/chairs" className="text-sm hover:underline hover:text-[#4E4D93] transition-all duration-300">Chairs</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 style={{ fontFamily: 'ClashDisplay' }} className="font-light text-base mb-4">Our company</h3>
            <ul className="space-y-2 font-light text-[14px]">
              <li><Link href="/About" className="text-sm hover:underline hover:text-[#4E4D93] transition-all duration-300">About us</Link></li>
              <li><Link href="/vacancies" className="text-sm hover:underline hover:text-[#4E4D93] transition-all duration-300">Vacancies</Link></li>
              <li><Link href="/ContactUs" className="text-sm hover:underline hover:text-[#4E4D93] transition-all duration-300">Contact us</Link></li>
              <li><Link href="/privacy" className="text-sm hover:underline hover:text-[#4E4D93] transition-all duration-300">Privacy</Link></li>
              <li><Link href="/returns-policy" className="text-sm hover:underline hover:text-[#4E4D93] transition-all duration-300">Returns policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 style={{ fontFamily: 'ClashDisplay' }} className="font-light text-base mb-4">Join our mailing list</h3>
            <div className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full py-3 px-4 bg-[#FFFFFF26] text-white outline-none rounded-md"
                required
              />
              <button
                type="submit"
                className="w-full bg-[#fff] text-[#252354] py-3 px-6 font-medium hover:bg-[#4E4D93] hover:text-white transition-all duration-300 rounded-md"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-[#4E4D93] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-center md:text-left">Copyright 2025 Artisan Haven. All rights reserved.</p>
            <div className="flex gap-6 justify-center md:justify-end">
              <Link href="#" className="hover:text-[#4E4D93] transition-colors duration-300">
                <FaLinkedin className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" />
              </Link>
              <Link href="#" className="hover:text-[#4E4D93] transition-colors duration-300">
                <AiFillFacebook className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" />
              </Link>
              <Link href="#" className="hover:text-[#4E4D93] transition-colors duration-300">
                <FaInstagram className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" />
              </Link>
              <Link href="#" className="hover:text-[#4E4D93] transition-colors duration-300">
                <TiSocialSkype className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform"/>
              </Link>
              <Link href="#" className="hover:text-[#4E4D93] transition-colors duration-300">
                <FaTwitter className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" />
              </Link>
              <Link href="#" className="hover:text-[#4E4D93] transition-colors duration-300">
                <FaPinterest className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;