import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import Service from "@/components/Service";
import FeaturesSection from "@/components/FeaturesSection";
import NewCeramics from "@/components/NewCeramics";
import JoinClubSection from "@/components/JoinClubSection";
import Footer from "@/components/Footer";

export default function Home() {
    return (
      <>
      <Banner />
        <Navbar />
        <AboutSection />
        <Service />
        <FeaturesSection />
        <NewCeramics />
        
        <JoinClubSection />
        <Footer />
      </>
    );
  }
  