import dynamic from 'next/dynamic';
import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Brand from "@/components/Brand";
import StorySection from "@/components/StorySection";
import Service from "@/components/Service";
import FeaturesSection2 from "@/components/FeaturesSection2";
import JoinClubSection from "@/components/JoinClubSection";
import Footer from "@/components/Footer";

// Lazy load NewCeramics component
const NewCeramics = dynamic(() => import('@/components/NewCeramics'), {
  ssr: false,
});
export default function AboutPage() {
  return (
    <>
      <Banner />
      <Header />
      <Brand />
      <StorySection />
      <Service />
      <FeaturesSection2 />
      <NewCeramics />
      <JoinClubSection />
      <Footer />
    </>
  );
}
