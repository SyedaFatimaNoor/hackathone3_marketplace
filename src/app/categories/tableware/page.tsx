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
        categoryName="tableware"
        title="Tableware"
        description="Elevate your dining experience with our exquisite tableware collection. From elegant plates to sophisticated serving sets."
      />
      <Footer />
    </>
  );
}
