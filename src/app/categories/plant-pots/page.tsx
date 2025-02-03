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
        category="plant-pots"
        title="Plant Pots"
        description="Discover our collection of beautifully crafted plant pots. From minimalist designs to ornate patterns, find the perfect home for your plants."
      />
      <Footer />
    </>
  );
}
