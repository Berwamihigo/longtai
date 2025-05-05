"use client";

import Image from "next/image";
import React from "react";

const AboutLongtai = () => {
  return (
    <section className="owners flex flex-col items-center px-4 md:px-12 lg:px-24">
      <span className="title text-center mb-8 text-2xl md:text-3xl">
        About <span>Longtai</span>
      </span>
      <div className="row flex flex-col md:flex-row gap-8 max-w-7xl w-full">
        <div className="image w-full md:w-1/2 flex justify-center">
          <Image
            src="/assets/longtai.png"
            alt="Longtai Company Overview"
            width={600}
            height={400}
            priority
            className="w-full h-auto rounded-lg max-w-full"
          />
        </div>
        <div className="news w-full md:w-1/2 space-y-4">
          <p>
            Longtai is a rapidly growing e-commerce platform specializing in
            shipping cars from China to Rwanda. With its base roots in China,
            Longtai has built a reputation for offering a seamless and
            transparent vehicle importation process, catering to a diverse range
            of customers—from individual buyers looking for budget-friendly
            options to businesses seeking fleet solutions. Unlike conventional
            car dealerships, Longtai leverages technology and logistics networks
            to simplify the purchasing experience, making high-quality Chinese
            vehicles more accessible to Rwandan buyers.
          </p>
          <p>
            China has become a global powerhouse in the automotive industry,
            producing a wide range of vehicles, from fuel-efficient sedans to
            luxury SUVs and electric cars. Longtai emerged as a response to the
            growing demand for affordable and reliable vehicles in Rwanda. By
            partnering directly with Chinese manufacturers, the platform
            eliminates unnecessary middlemen, allowing customers to access
            factory prices and reduce costs. Longtai’s presence in Rwanda is not
            just about business—it’s about fostering a deeper connection between
            two cultures. The name “Longtai” itself reflects a blend of Chinese
            heritage and global ambition, embodying the strength of the dragon
            (Long) and the resilience of progress (Tai). Rwanda, a rapidly
            developing economy, has embraced modern infrastructure projects, and
            Longtai plays a vital role in equipping individuals and businesses
            with the vehicles they need to move forward.
          </p>
        </div>
      </div>
      <div className="more mt-8 space-y-4 text-justify max-w-7xl w-full">
        <p>
          Longtai’s catalog includes a vast selection of vehicles, catering to
          different needs and budgets. Whether it’s a compact city car for urban
          commuters, a rugged SUV for Rwanda’s adventurous terrains, or an
          electric vehicle for the environmentally conscious, Longtai ensures
          that buyers have access to the latest models. The platform also
          specializes in commercial vehicles such as trucks, buses, and vans,
          helping businesses expand their logistics operations. What sets
          Longtai apart is its customized vehicle selection. Customers can
          choose specific features, request modifications, or even order
          completely new models based on their needs. With a strong network of
          manufacturers, Longtai provides options that aren’t readily available
          in traditional dealerships.
        </p>
        <p>
          Longtai is more than just an e-commerce business—it is part of
          Rwanda’s transformation. As the country embraces digital innovation
          and economic growth, access to affordable and high-quality vehicles
          plays a crucial role in mobility, trade, and daily life. Longtai is
          committed to not only selling cars but also building trust,
          convenience, and long-term relationships with its customers. With
          every shipment, Longtai delivers more than just a car; it delivers
          dreams, possibilities, and progress. 🚗
        </p>
      </div>
    </section>
  );
};

export default AboutLongtai;