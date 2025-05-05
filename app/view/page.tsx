import CarHero from "../components/car-hero";
import CarCustomizer from "../components/car-view";
import Footer from "../components/footer";
import DesktopNav from "../components/navbar";

type Props = {
  params: { name: string };
};

export default function View({ params }: Props) {
  const carName = decodeURIComponent(params.name);

  return (
    <section>
      <DesktopNav />
      <CarHero name={carName} />
      <CarCustomizer />
      <Footer />
    </section>
  );
}
