"use client";

export default function Services() {
  return (
    <section className="combination">
      <section className="shopping-modes md:mt-[6rem]">
        <div className="header mt-[5rem]">
          <span>
            Shopping <span>Tools</span>
          </span>
        </div>

        <div className="wrapper flex flex-wrap gap-5">
          <div className="first-one">
            <img src="assets/tool1.png" alt="Build & Price" />
            <span>Build & Price</span>
          </div>
          <div className="first-one">
            <img src="assets/tool2.png" alt="Trade-in Value" />
            <span>Trade-in Value</span>
          </div>
          <div className="first-one">
            <img src="assets/tool3.png" alt="Your Currency" />
            <span>Your currency</span>
          </div>
          <div className="first-one">
            <img src="assets/tool4.png" alt="Find Inventory" />
            <span>Find Inventory</span>
          </div>
        </div>
      </section>

      
    </section>
  );
}
