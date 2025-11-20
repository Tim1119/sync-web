
import HeroClientsSection from "./components/public/HeroClientsSection";
import FeaturesSection from "./components/public/FeaturesSection";
import UniquenessSection from "./components/public/Uniqueness";
import TargetAndFaqSection from "./components/public/TargetAndFaqSection";



export default function Home() {
  return (
    <div className="w-full overflow-hidden">
      <HeroClientsSection />
      <FeaturesSection />
      <UniquenessSection />
      <TargetAndFaqSection />
    </div>
  );
}
