import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import NewCeramics from "@/components/NewCeramics";
import PopularProducts from "@/components/PopularProducts";
import JoinClubSection from "@/components/JoinClubSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
    <Navbar />
    <HeroSection />
    <FeaturesSection />
    <NewCeramics />
    <PopularProducts />
    <JoinClubSection />
    <AboutSection />
    <Footer />
    </>
  );
}
