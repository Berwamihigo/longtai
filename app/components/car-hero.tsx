export default function CarHero({ name }: { name: string }) {
  return (
    <section className="car-about">
        <i className="ri-car-line"></i>
        <span className="car-name" id="name">{name}</span>
    </section>
  );
}
