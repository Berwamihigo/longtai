"use client";

import React from "react";

export default function Banner() {
  return (
    <section className="longtai flex flex-col gap-5">
      <h1 className="header">
        <span>
          What's <span> special</span>
        </span>
      </h1>

      {/* <div className="navlinks">
        <ul>
          <li className="active" id="featured">
            Featured Stories
          </li>
          <li id="vehicle">Vehicles</li>
          <li id="room">Show Room</li>
        </ul>
      </div> */}

      <div className="banner" id="featured-stories">
        <div className="banner-top">
          <div className="left">
            <img src="/assets/txl.jpg" alt="" />
          </div>
          <div className="right">
            <span>Offers & Services</span>
            <h1>Let's talk finances</h1>
            <p>
              We have options for flexible financing and leasing, rebates,
              protection plans, insurance offerings and so much more.
            </p>
            <button>Learn More</button>
          </div>
        </div>

        <div className="other-banner flex flex-wrap justify-around items-center">
          <div className="banners-small">
            <div className="image">
              <img src="/assets/evpolestar.jpg" alt="" />
            </div>
            <div className="texts">
              <span>Offers & Services</span>
              <h1>Longtai rewards visa signature &rangle;</h1>
              <p>
                Earn more with Longtai Rewards Visa Signature® Credit Card
              </p>
              <button>
                <span>Learn More</span>
              </button>
            </div>
          </div>

          <div className="banners-small">
            <div className="image">
              <img src="/assets/evvolvo.jpg" alt="" />
            </div>
            <div className="texts">
              <span>Offers & Services</span>
              <h1>Cars with Low Mileage</h1>
              <p>
                Getting a degree is hard work. We’re here to help you with a
                break, with our College Rebate and Finance Program.
              </p>
              <button>
                <span>Learn More</span>
              </button>
            </div>
          </div>

          <div className="banners-small">
            <div className="image">
              <img src="/assets/txl.jpg" alt="" />
            </div>
            <div className="texts">
              <span>Offers & Services</span>
              <h1>Enjoy Long Range</h1>
              <p>
                We truly appreciate all that you do in your life of service, and
                we’d like to share a small token of our gratitude.
              </p>
              <button>
                <span>Learn More</span>
              </button>
            </div>
          </div>
        </div>
      </div>

        {/* <div className="banner" id="vehicle-stories">
          <div className="banner-top">
            <div className="left">
              <img src="/assets/txl.jpg" alt="" />
            </div>
            <div className="right">
              <span>Offers & Services</span>
              <h1>Let's talk finances</h1>
              <p>
                We have options for flexible financing and leasing, rebates,
                protection plans, insurance offerings and so much more.
              </p>
              <button>Learn More</button>
            </div>
          </div>

          <div className="other-banner">
            <div className="banners-small">
              <div className="image">
                <img src="/assets/evpolestar.jpg" alt="" />
              </div>
              <div className="texts">
                <span>Offers & Services</span>
                <h1>Toyota rewards visa signature &rangle;</h1>
                <p>
                  Earn more with Toyota Rewards Visa Signature® Credit Card
                </p>
                <button>
                  <span>Learn More</span>
                  <i className="fa fa-caret-right"></i>
                </button>
              </div>
            </div>

            <div className="banners-small">
              <div className="image">
                <img src="/assets/evvolvo.jpg" alt="" />
              </div>
              <div className="texts">
                <span>Offers & Services</span>
                <h1>Cars with Low Mileage</h1>
                <p>
                  Getting a degree is hard work. We’re here to help you with a
                  break, with our College Rebate and Finance Program.
                </p>
                <button>
                  <span>Learn More</span>
                  <i className="fa fa-caret-right"></i>
                </button>
              </div>
            </div>

            <div className="banners-small">
              <div className="image">
                <img src="https://i.pinimg.com/736x/12/b0/88/12b0883d3d11ef60ed6b19035a81ab86.jpg" alt="" />
              </div>
              <div className="texts">
                <span>Offers & Services</span>
                <h1>Enjoy Long Range</h1>
                <p>
                  We truly appreciate all that you do in your life of service, and
                  we’d like to share a small token of our gratitude.
                </p>
                <button>
                  <span>Learn More</span>
                  <i className="fa fa-caret-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="banner" id="room-stories">
          <div className="banner-top">
            <div className="left">
              <img src="https://i.pinimg.com/736x/12/b0/88/12b0883d3d11ef60ed6b19035a81ab86.jpg" alt="" />
            </div>
            <div className="right">
              <span>Offers & Services</span>
              <h1>Let's talk finances</h1>
              <p>
                We have options for flexible financing and leasing, rebates,
                protection plans, insurance offerings and so much more.
              </p>
              <button>Learn More</button>
            </div>
          </div>

          <div className="other-banner">
            <div className="banners-small">
              <div className="image">
                <img src="https://i.pinimg.com/736x/12/b0/88/12b0883d3d11ef60ed6b19035a81ab86.jpg" alt="" />
              </div>
              <div className="texts">
                <span>Offers & Services</span>
                <h1>Toyota rewards visa signature &rangle;</h1>
                <p>
                  Earn more with Toyota Rewards Visa Signature® Credit Card
                </p>
                <button>
                  <span>Learn More</span>
                  <i className="fa fa-caret-right"></i>
                </button>
              </div>
            </div>

            <div className="banners-small">
              <div className="image">
                <img src="https://i.pinimg.com/736x/12/b0/88/12b0883d3d11ef60ed6b19035a81ab86.jpg" alt="" />
              </div>
              <div className="texts">
                <span>Offers & Services</span>
                <h1>Cars with Low Mileage</h1>
                <p>
                  Getting a degree is hard work. We’re here to help you with a
                  break, with our College Rebate and Finance Program.
                </p>
                <button>
                  <span>Learn More</span>
                  <i className="fa fa-caret-right"></i>
                </button>
              </div>
            </div>

            <div className="banners-small">
              <div className="image">
                <img src="https://i.pinimg.com/736x/12/b0/88/12b0883d3d11ef60ed6b19035a81ab86.jpg" alt="" />
              </div>
              <div className="texts">
                <span>Offers & Services</span>
                <h1>Enjoy Long Range</h1>
                <p>
                  We truly appreciate all that you do in your life of service, and
                  we’d like to share a small token of our gratitude.
                </p>
                <button>
                  <span>Learn More</span>
                  <i className="fa fa-caret-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div> */}
    </section>
  );
}
