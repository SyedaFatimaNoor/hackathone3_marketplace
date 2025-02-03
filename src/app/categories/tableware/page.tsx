import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import CategoryPage from "@/components/CategoryPage";
import Footer from "@/components/Footer";

export default function TablewarePage() {
  return (
    <>
      <Banner />
      <Navbar />
      <CategoryPage 
        category="tableware"
        title="Tableware"
        description="Discover our sophisticated tableware collection. From serving dishes to placemats, find everything you need for a well-dressed table."
      />
      <Footer />
    </>
  );
}
