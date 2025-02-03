import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import CategoryPage from "@/components/CategoryPage";
import Footer from "@/components/Footer";

export default function CrockeryPage() {
  return (
    <>
      <Banner />
      <Navbar />
      <CategoryPage 
        category="crockery"
        title="Crockery"
        description="Explore our fine collection of crockery. From elegant dinner sets to everyday essentials, find pieces that elevate your dining experience."
      />
      <Footer />
    </>
  );
}
