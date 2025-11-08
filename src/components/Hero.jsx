import React, { useState } from "react";
import { Carousel, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Hero = () => {
  const [slides] = useState([
    {
      id: 1,
      image: "/assets/banner/banner1.webp",
      title: "Get Special Offer",
      subtitle: "Up to 40% Off",
      smallText: "All Services Available | T&C Applied",
      buttonText: "Shop Now",
      link: "/category/sale",
    },
    {
      id: 2,
      image: "/assets/banner/banner2.webp",
      title: "Exclusive Deal",
      subtitle: "Up to 50% Off",
      smallText: "Winter Sale | Limited Time",
      buttonText: "Shop Now",
      link: "/category/winter",
    },
    {
      id: 3,
      image: "/src/assets/images/shoe.jpg",
      title: "Hot Combo Offer",
      subtitle: "Buy 1 Get 1 Free",
      smallText: "T&C Applied",
      buttonText: "Shop Now",
      link: "/category/combo",
    },
    {
      id: 4,
      image: "/src/assets/images/walet.jpg",
      title: "New Arrivals",
      subtitle: "Explore the Latest Trends",
      smallText: "Just Arrived | Shop Now",
      buttonText: "Shop Now",
      link: "/category/new-arrivals",
    },
    {
      id: 5,
      image: "/src/assets/images/shoe.jpg",
      title: "Limited Time Offer",
      subtitle: "Don't Miss Out",
      smallText: "Shop Now | Limited Stock",
      buttonText: "Shop Now",
      link: "/category/limited-time",
    }
  ]);

  return (
    <>
      <style>{`
        .hero-section { position: relative; margin-top: 10px; }
        .hero-slide { position: relative; height: 60vh; overflow: hidden; }
        .hero-img { width: 100%; height: 100%; object-fit: cover; }
        .overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.4); }
        .carousel-caption { position: absolute; bottom: 20%; left: 5%; text-align: left; color: white; z-index: 10; }
        .carousel-caption h1 { font-size: 2.5rem; font-weight: 700; }

        @media (max-width: 767px) {
          .hero-slide { border-radius: 18px; height: 220px; width: 90%; margin: 0 auto; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
          .hero-img { filter: brightness(0.7); }
          .carousel-caption { bottom: 12%; left: 8%; right: 8%; }
          .carousel-caption h1 { font-size: 1.2rem; font-weight: 700; margin-bottom: 5px; }
          .carousel-caption h5 { font-size: 1rem; font-weight: 600; margin-bottom: 5px; }
          .carousel-caption p { font-size: 0.75rem; }
          .hero-badge { position: absolute; top: 10px; left: 10px; background: white; color: #000; border-radius: 12px; font-size: 0.7rem; font-weight: 600; padding: 2px 8px; }
          .carousel-caption a.btn { background: #ff4757; border: none; font-weight: 600; font-size: 0.8rem; padding: 6px 20px; border-radius: 20px; }
        }
      `}</style>

      <div className="hero-section">
        <Carousel controls indicators interval={4000} pause="hover" fade>
          {slides.map((slide) => (
            <Carousel.Item key={slide.id}>
              <div className="hero-slide">
                <img
                  className="d-block hero-img"
                  src={slide.image}
                  alt={slide.title}
                />
                <div className="overlay" />
                <Carousel.Caption>
                  <h1>{slide.title}</h1>
                  <h5>{slide.subtitle}</h5>
                  <p>{slide.smallText}</p>
                  {slide.link && (
                    <Link to={slide.link}>
                      <Button>{slide.buttonText}</Button>
                    </Link>
                  )}
                </Carousel.Caption>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default Hero;
