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
        categoryName="crockery"
        title="Crockery"
        description="Discover our elegant crockery collection. From everyday dining to special occasions, find the perfect pieces to complement your style."
      />
      <Footer />
    </>
  );
}
