import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import CategoryPage from "@/components/CategoryPage";
import Footer from "@/components/Footer";

export default function CeramicsPage() {
  return (
    <>
      <Banner />
      <Navbar />
      <CategoryPage 
        category="ceramics"
        title="Ceramics"
        description="Explore our handcrafted ceramic collection. Each piece is uniquely designed and carefully made to bring artistry to your home."
      />
      <Footer />
    </>
  );
}
