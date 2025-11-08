import React, { useEffect, useState } from "react";
import { Card, Button, Badge, Container } from "react-bootstrap";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { motion } from "framer-motion";

const dummyProducts = [
  {
    id: 1,
    name: "Casual Checked Shirt",
    price: 1290,
    originalPrice: 1490,
    category: "Men",
    rating: 4.5,
    image: "/src/assets/images/7.jpg",
  },
  {
    id: 2,
    name: "Checked Shirt",
    price: 990,
    originalPrice: 1490,
    category: "Men",
    rating: 4,
    image: "/src/assets/images/6.jpg",
  },
  {
    id: 3,
    name: "Striped Shirt",
    price: 1290,
    originalPrice: 1480,
    category: "Men",
    rating: 5,
    image: "/src/assets/images/5.jpg",
  },
  {
    id: 4,
    name: "Printed Shirt",
    price: 1480,
    originalPrice: 1580,
    category: "Men",
    rating: 3.5,
    image: "/src/assets/images/4.jpg",
  },
];

const BestSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // simulate loading
    const timer = setTimeout(() => {
      setProducts(dummyProducts);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-center flex-grow-1">
          BEST SELLING <span className="text-danger">PRODUCTS</span>
        </h3>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => navigate("/best-sellers")}
        >
          View All
        </Button>
      </div>

      <Slider {...sliderSettings}>
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Card
              className="shadow-sm border-0 mx-2"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="position-relative">
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.name}
                  style={{ height: "260px", objectFit: "cover" }}
                />
                <Badge bg="primary" className="position-absolute top-0 start-0 m-2">
                  {product.category}
                </Badge>
              </div>
              <Card.Body className="text-center">
                <Card.Title className="fs-6">{product.name}</Card.Title>
                <div className="text-warning mb-2">
                  {"★".repeat(Math.floor(product.rating))}{"☆".repeat(5 - Math.floor(product.rating))}
                </div>
                <p>
                  <span className="fw-bold text-primary">Tk. {product.price}</span>{" "}
                  <del className="text-muted">{product.originalPrice}</del>
                </p>
                <div className="d-flex justify-content-center gap-2 mt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(addToCart(product));
                      navigate("/checkout");
                    }}
                  >
                    Buy Now
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(addToCart(product));
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        ))}
      </Slider>
    </Container>
  );
};

export default BestSellingProducts;
