import HeroIntro from "@/components/HeroIntro";
import Manifeste from "@/components/Manifeste";
import Cartographie from "@/components/Cartographie";
import Cercle from "@/components/Cercle";
import Signature from "@/components/Signature";

export default function Home() {
  return (
    <main id="contenu" role="main">
      <HeroIntro />
      <Manifeste />
      <Cartographie />
      <Cercle />
      <Signature />
    </main>
  );
}
