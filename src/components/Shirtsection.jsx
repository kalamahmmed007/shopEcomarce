import React from "react";
import { Card, Button, Badge, Container } from "react-bootstrap";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Shirtsection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Grab wishlist items from Redux store
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);

  const products = [
    {
      id: 1,
      name: 'Casual Checked Shirt - VC305',
      price: 1290,
      originalPrice: 1490,
      category: 'Men',
      rating: 4.5,
      image: '/src/assets/images/shirt.webp',
    },
    {
      id: 2,
      name: 'Checked Shirt - VC306',
      price: 990,
      originalPrice: 1490,
      category: 'Men',
      rating: 4,
      image: '/src/assets/images/shirt.webp',
    },
    {
      id: 3,
      name: 'Striped Shirt - VC312',
      price: 1290,
      originalPrice: 1480,
      category: 'Men',
      rating: 5,
      image: '/src/assets/images/shirt.webp',
    },
    {
      id: 4,
      name: 'Printed Shirt - VC311',
      price: 1480,
      originalPrice: 1580,
      category: 'Men',
      rating: 3.5,
      image: '/src/assets/images/shirt.webp',
    },
    {
      id: 5,
      name: 'Checked Shirt - VC316',
      price: 1290,
      originalPrice: 1480,
      category: 'Men',
      rating: 4,
      image: '/src/assets/images/shirt.webp',
    },
    {
      id: 6,
      name: 'Formal Shirt - VC320',
      price: 1190,
      originalPrice: 1390,
      category: 'Men',
      rating: 4.7,
      image: '/src/assets/images/shirt.webp',
    },
    {
      id: 7,
      name: 'Stylish Shirt - VC325',
      price: 1390,
      originalPrice: 1590,
      category: 'Men',
      rating: 5,
      image: '/src/assets/images/shirt.webp',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 2 } },
    ],
  };

  // Check if product is in wishlist
  const isInWishlist = (productId) => wishlistItems.some(item => item.id === productId);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleBuyNow = (e, product) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    navigate('/checkout');
  };

  const toggleWishlist = (e, product) => {
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <Container className="my-5">
      <h3 className="text-center mb-4">SHIRT COLLECTION</h3>
      <img
        src="/assets/banner/banner1.webp"
        alt="New Arrival Banner"
        className="img-fluid mb-4 cover"
        style={{ width: "100%", maxHeight: "350px", objectFit: "cover" }}
      />

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
              style={{ cursor: 'pointer', position: 'relative' }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="position-relative">
                <Card.Img
                  variant="top"
                  src={product.image}
                  style={{ height: '260px', objectFit: 'cover' }}
                />
                <Badge bg="primary" className="position-absolute top-0 start-0 m-2">
                  {product.category}
                </Badge>
                <Badge bg="secondary" className="position-absolute top-0 end-0 m-2">
                  Sale
                </Badge>

                {/* Wishlist Button */}
                <Button
                  variant="light"
                  size="sm"
                  onClick={(e) => toggleWishlist(e, product)}
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    borderRadius: '50%',
                    padding: '6px 8px',
                    boxShadow: '0 0 6px rgba(0,0,0,0.15)',
                    zIndex: 10,
                  }}
                  aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
                >
                  {isInWishlist(product.id) ? (
                    <FaHeart color="red" size={18} />
                  ) : (
                    <FaRegHeart color="red" size={18} />
                  )}
                </Button>
              </div>

              <Card.Body className="text-center d-flex flex-column">
                <Card.Title className="fs-6">{product.name}</Card.Title>
                <div className="text-warning mb-2">
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                </div>
                <p>
                  <span className="fw-bold text-primary">Tk. {product.price}</span>{' '}
                  <del className="text-muted">Tk. {product.originalPrice}</del>
                </p>
                <div className="d-flex justify-content-center gap-2 mt-auto">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={(e) => handleBuyNow(e, product)}
                  >
                    Buy Now
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        ))}
      </Slider>
      <div className="text-center mt-4">
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

export default Shirtsection;
