import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import CategoryPage from "@/components/CategoryPage";
import Footer from "@/components/Footer";

export default function TablesPage() {
  return (
    <>
      <Banner />
      <Navbar />
      <CategoryPage 
        categoryName="tables"
        title="Tables"
        description="Discover our range of stylish and functional tables. From dining tables to coffee tables, find the perfect centerpiece for your space."
      />
      <Footer />
    </>
  );
}
