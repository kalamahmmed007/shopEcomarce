import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Spinner,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";

// Global flash deal ends in 2 hours
const FLASH_DEAL_END_TIME = new Date().getTime() + 2 * 60 * 60 * 1000;

// Per product countdown hook
function useCountdown(endTime) {
  const [timeLeft, setTimeLeft] = useState(endTime - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = endTime - new Date().getTime();
      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
      } else {
        setTimeLeft(diff);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  return timeLeft;
}

// Format milliseconds to hh:mm:ss
const formatTime = (ms) => {
  if (ms <= 0) return "00:00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

const FlashDealPage = () => {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.product);

  // Filters & sort state
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOption, setSortOption] = useState("popularity");

  // Sort function
  const sortProducts = (a, b) => {
    switch (sortOption) {
      case "priceLow":
        return a.price - b.price;
      case "priceHigh":
        return b.price - a.price;
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "popularity":
      default:
        return (b.sold || 0) - (a.sold || 0);
    }
  };

  // Filter & sort products flagged as flash deal
  const filteredProducts = (products || [])
    .filter(
      (p) =>
        p.isFlashDeal &&
        (categoryFilter ? p.category === categoryFilter : true)
    )
    .sort(sortProducts);

  const categories = [...new Set(products?.map((p) => p.category))];

  return (
    <div className="flash-page-wrapper">
      {/* Hero Header */}
      <div
        className="text-center text-white py-5 mb-5"
        style={{
          background: "linear-gradient(90deg, #FF6F00, #FF3D00)",
          borderRadius: "20px",
          boxShadow: "0 4px 20px rgba(255, 111, 0, 0.4)",
        }}
      >
        <h1 className="fw-bold display-5">⚡ Flash Deals</h1>
        <p className="fs-5 mb-2 opacity-90">
          Grab your favorites before the time runs out!
        </p>
        <Badge
          bg="light"
          text="dark"
          className="fs-4 py-2 px-4 mt-2 shadow-sm rounded-pill"
        >
          Deal Ends In ⏰ {formatTime(FLASH_DEAL_END_TIME - new Date().getTime())}
        </Badge>
      </div>

      <Container>
        {/* Filters */}
        <Row className="mb-4 justify-content-center">
          <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
            <Form.Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              aria-label="Filter by category"
              className="shadow-sm border-0 rounded-3"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
            <Form.Select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              aria-label="Sort products"
              className="shadow-sm border-0 rounded-3"
            >
              <option value="popularity">Sort by Popularity</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Products */}
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="warning" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center fs-5 text-muted">
            No flash deal products found 😢
          </p>
        ) : (
          <Row className="g-4">
            {filteredProducts.map((product) => {
              const productCountdown = useCountdown(
                product.flashDealEndTime || FLASH_DEAL_END_TIME
              );

              return (
                <Col
                  key={product.id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className="d-flex"
                >
                  <Card
                    className="shadow-lg border-0 flex-fill d-flex flex-column hover-glow"
                    style={{
                      borderRadius: "15px",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div
                      className="position-relative"
                      style={{ height: 220, overflow: "hidden" }}
                    >
                      <Card.Img
                        src={product.image || "/images/placeholder.jpg"}
                        alt={product.name}
                        className="h-100 w-100 object-fit-cover"
                      />
                      <Badge
                        bg="danger"
                        className="position-absolute top-0 start-0 m-2 px-3 py-1 fs-6 rounded-pill"
                      >
                        Flash Deal
                      </Badge>
                      {product.stock && product.stock < 5 && (
                        <Badge
                          bg="warning"
                          text="dark"
                          className="position-absolute top-0 end-0 m-2 px-3 py-1 fs-6 rounded-pill"
                        >
                          Only {product.stock} left
                        </Badge>
                      )}
                    </div>

                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="fs-6 fw-bold mb-2 text-center text-truncate">
                        {product.name}
                      </Card.Title>

                      <div className="text-center mb-2">
                        <span className="fw-bold fs-5 text-danger">
                          Tk. {product.price}
                        </span>{" "}
                        <del className="text-muted fs-6">
                          {product.originalPrice && `Tk. ${product.originalPrice}`}
                        </del>
                      </div>

                      <div className="mb-3 text-center text-danger fw-semibold">
                        ⏱ {formatTime(productCountdown)}
                      </div>

                      <Button
                        variant="warning"
                        className="mt-auto fw-semibold shadow-sm"
                        onClick={() => dispatch(addToCart(product))}
                      >
                        🛒 Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}
      </Container>

      <style>{`
        .hover-glow:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(255, 111, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default FlashDealPage;
