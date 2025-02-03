import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import CategoryPage from "@/components/CategoryPage";
import Footer from "@/components/Footer";

export default function CutleryPage() {
  return (
    <>
      <Banner />
      <Navbar />
      <CategoryPage 
        category="cutlery"
        title="Cutlery"
        description="Browse our premium cutlery collection. From everyday essentials to special occasion sets, find cutlery that adds elegance to your dining."
      />
      <Footer />
    </>
  );
}
