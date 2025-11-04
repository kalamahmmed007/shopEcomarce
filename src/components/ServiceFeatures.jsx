import React from "react";

import deliveryIcon from "../assets/icons/delivery.png";
import moneyIcon from "../assets/icons/money.png";
import boxIcon from "../assets/icons/box.png";
import loyaltyIcon from "../assets/icons/customer-experience.png";

const services = [
  {
    id: 1,
    icon: deliveryIcon,
    title: "Free Delivery",
    description: "On orders above BDT 999৳",
  },
  {
    id: 2,
    icon: moneyIcon,
    title: "Cash on Delivery",
    description: "Pay when you receive",
  },
  {
    id: 3,
    icon: boxIcon,
    title: "Free Gift Box",
    description: "& personalized note",
  },
  {
    id: 4,
    icon: loyaltyIcon,
    title: "Loyalty",
    description: "Earn rewards every time",
  },
];

const ServiceFeatures = () => {
  return (
    <>
      <style>{`
        .service-features {
          background: #fff;
        }

        .feature-card {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 1rem;
          background: #fff;
          border-radius: 16px;
          padding: 12px 16px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          transition: all 0.2s ease-in-out;
        }

        .feature-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .feature-icon {
          width: 45px;
          height: 45px;
          object-fit: contain;
        }

        .feature-text h6 {
          font-size: 0.95rem;
          font-weight: 600;
          color: #111;
          margin-bottom: 3px;
        }

        .feature-text p {
          font-size: 0.8rem;
          color: #6c758d;
          margin-bottom: 0;
        }

        /* ===== MOBILE VIEW ===== */
        @media (max-width: 767px) {
          .service-features {
            padding: 15px 0 !important;
          }

          .feature-card {
            flex-direction: column;
            text-align: center;
            gap: 6px;
            padding: 14px;
            border-radius: 14px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.06);
          }

          .feature-icon {
            width: 40px;
            height: 40px;
          }

          .feature-text h6 {
            font-size: 0.9rem;
          }

          .feature-text p {
            font-size: 0.75rem;
          }
        }
      `}</style>

      <section className="service-features py-5">
        <div className="container">
          <div className="row gy-3 gx-3">
            {services.map(({ id, icon, title, description }) => (
              <div className="col-6 col-md-3" key={id}>
                <div className="feature-card h-100">
                  <img src={icon} alt={title} className="feature-icon" />
                  <div className="feature-text">
                    <h6>{title}</h6>
                    <p>{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceFeatures;
