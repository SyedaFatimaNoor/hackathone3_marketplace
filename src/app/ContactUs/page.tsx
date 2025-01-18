import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import FeaturesSection from "@/components/FeaturesSection";
import JoinClubSection from "@/components/JoinClubSection";
import Footer from "@/components/Footer";

export default function Home() {
    return (
      <>
      <Banner />
        <Navbar />
        {/* Hero Section */}
        <div
          style={{
            backgroundImage: `url('/images/header.jpeg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className="relative h-[209px] flex items-center px-8 md:px-16"
        >
          <h1 style={{ fontFamily: 'ClashDisplay' }} className="text-white text-4xl font-normal font-clash">
            Contact Us
          </h1>
        </div>
        <Contact />
        <JoinClubSection />
        <FeaturesSection />
        <Footer />
      </>
    );
  }