import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import CategoryPage from "@/components/CategoryPage";
import Footer from "@/components/Footer";

export default function ChairsPage() {
  return (
    <>
      <Banner />
      <Navbar />
      <CategoryPage 
        categoryName="chairs"
        title="Chairs"
        description="Discover our range of comfortable and stylish chairs. From dining chairs to armchairs, find the perfect seating for your space."
      />
      <Footer />
    </>
  );
}
