"use client";

import Link from "next/link";
import React from "react";

export default function BannerWani() {
  return (
    <section className="banners-wani">
      <div className="content">
        <h1>Drive change your way</h1>
        <div className="newone">
          <Link href="/inventory">
            <button>
                Explore Beyond the Limits
                <i className="ri-arrow-right-s-line"></i>
              </button>
          </Link>
            
        </div>
      </div>
    </section>
  );
}
