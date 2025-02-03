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
        category="tables"
        title="Tables"
        description="Browse our collection of elegant tables. From dining to coffee tables, find furniture that combines style with functionality."
      />
      <Footer />
    </>
  );
}
