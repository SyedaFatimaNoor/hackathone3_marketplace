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
        categoryName="cutlery"
        title="Cutlery"
        description="Elevate your dining experience with our premium cutlery sets. Crafted with precision and style."
      />
      <Footer />
    </>
  );
}
