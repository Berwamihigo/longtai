"use client";

import Typewriter from "typewriter-effect";

export default function InventoryHero() {
  return (
    <section className="home">
      <h1>Longtai Virtual Showroom</h1>
      <Typewriter
        options={{
          strings: [
            "Visit us in person at any moment.",
            "Book yourself a test drive.",
            "Face to face deal with us."
          ],
          autoStart: true,
          loop: true,
          delay: 75,
          deleteSpeed: 50,
          cursor: "|"
        }}
      />
    </section>
  );
}
