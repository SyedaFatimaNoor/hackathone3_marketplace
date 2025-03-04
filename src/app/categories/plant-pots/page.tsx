import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import CategoryPage from "@/components/CategoryPage";
import Footer from "@/components/Footer";

export default function PlantPotsPage() {
  return (
    <>
      <Banner />
      <Navbar />
      <CategoryPage 
        categoryName="plant-pots"
        title="Plant Pots"
        description="Bring life to your space with our curated collection of plant pots. From minimalist designs to vibrant statement pieces."
      />
      <Footer />
    </>
  );
}
