import React, { useEffect, useState } from "react";
import { Card, Button, Badge, Container, OverlayTrigger, Tooltip, Spinner } from "react-bootstrap";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";

const Panjabi = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items || []);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const isInWishlist = (id) => wishlistItems.some((item) => item.id === id);

  // 🧠 Dummy data (fallback)
  const demoProducts = [
    {
      id: 1,
      name: 'Casual Checked Shirt - VC305',
      price: 1290,
      originalPrice: 1490,
      category: 'Men',
      rating: 4.5,
      image: '/src/assets/images/panjabi.webp',
    },
    {
      id: 2,
      name: 'Checked Shirt - VC306',
      price: 990,
      originalPrice: 1490,
      category: 'Men',
      rating: 4,
      image: '/src/assets/images/panjabi.webp',
    },
    {
      id: 3,
      name: 'Striped Shirt - VC312',
      price: 1290,
      originalPrice: 1480,
      category: 'Men',
      rating: 5,
      image: '/src/assets/images/panjabi.webp',
    },
    {
      id: 4,
      name: 'Printed Shirt - VC311',
      price: 1480,
      originalPrice: 1580,
      category: 'Men',
      rating: 3.5,
      image: '/src/assets/images/panjabi.webp',
    },
    {
      id: 5,
      name: 'Formal Shirt - VC320',
      price: 1190,
      originalPrice: 1390,
      category: 'Men',
      rating: 4.7,
      image: '/src/assets/images/panjabi.webp',
    },
  ];

  //  Future-ready API call
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // when your API ready, just replace the URL
        // const res = await axios.get("https://your-api.com/api/products?category=panjabi");
        // setProducts(res.data);

        // for now, use demo data
        setProducts(demoProducts);
      } catch (error) {
        console.error("Error loading products:", error);
        setProducts(demoProducts); // fallback if API fails
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const settings = {
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
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <Container className="my-5">
      <h3 className="text-center mb-4">PANJABI COLLECTION</h3>
      <img
        src="/assets/banner/banner1.webp"
        alt="New Arrival Banner"
        className="img-fluid mb-4 cover"
        style={{ width: "100%", maxHeight: "350px", objectFit: "cover" }}
      />

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Slider {...settings}>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
                    style={{ height: "260px", objectFit: "cover" }}
                  />
                  <Badge bg="primary" className="position-absolute top-0 start-0 m-2">
                    {product.category}
                  </Badge>
                  <Badge bg="secondary" className="position-absolute top-0 end-0 m-2">
                    Sale
                  </Badge>

                  <OverlayTrigger
                    placement="left"
                    overlay={
                      <Tooltip>
                        {isInWishlist(product.id)
                          ? "Remove from Wishlist"
                          : "Add to Wishlist"}
                      </Tooltip>
                    }
                  >
                    <Button
                      variant="light"
                      size="sm"
                      className="position-absolute bottom-0 end-0 m-2 rounded-circle p-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isInWishlist(product.id)) {
                          dispatch(removeFromWishlist(product.id));
                        } else {
                          dispatch(addToWishlist(product));
                        }
                      }}
                    >
                      {isInWishlist(product.id) ? (
                        <FaHeart color="red" />
                      ) : (
                        <FaRegHeart color="gray" />
                      )}
                    </Button>
                  </OverlayTrigger>
                </div>

                <Card.Body className="text-center">
                  <Card.Title className="fs-6">{product.name}</Card.Title>
                  <div className="text-warning mb-2">
                    {"★".repeat(Math.floor(product.rating))}
                    {"☆".repeat(5 - Math.floor(product.rating))}
                  </div>
                  <p>
                    <span className="fw-bold text-primary">Tk. {product.price}</span>{" "}
                    <del className="text-muted">Tk. {product.originalPrice}</del>
                  </p>
                  <div className="d-flex justify-content-center gap-2">
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
      )}

      {/* View More Button */}
      <div className="text-center mt-4 ">
        <Button
          variant="primary"
          size="sm"
          className="px-5 rounded-pill"
          onClick={() => navigate(`/category/${products[0]?.category.toLowerCase()}`)}
        >
          View More
        </Button>
      </div>
    </Container>
  );
};

export default Panjabi;
