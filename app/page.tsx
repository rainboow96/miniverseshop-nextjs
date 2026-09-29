import CategorySection from "@/components/sections/categorySection";
import FaqSection from "@/components/sections/faq-section";
import FeatureItem from "@/components/sections/featureItem";
import Hero from "@/components/sections/hero";
import InstagramBanner from "@/components/sections/instagram-banner";
import NewestProductsSection from "@/components/sections/newestProductsSection";
import WhyMiniverseSection from "@/components/sections/whyMiniverseSection";

export default function Home() {
  return (
    <>
    <Hero/>
    <FeatureItem/>
    <CategorySection/>
    <WhyMiniverseSection/>
    <NewestProductsSection/>
    <InstagramBanner/>
    <FaqSection/>
    </>

  );
}
