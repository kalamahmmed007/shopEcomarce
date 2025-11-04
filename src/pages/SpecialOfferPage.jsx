import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Badge, Spinner, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const SpecialOfferPage = () => {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.product);
  const cartItems = useSelector((state) => state.cart.items || []);

  // Filters & sorting state
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

  // Filter special offer products
  const filteredProducts = (products || [])
    .filter(
      (p) =>
        p.isSpecialOffer &&
        (categoryFilter ? p.category === categoryFilter : true)
    )
    .sort(sortProducts);

  const categories = [...new Set(products?.map((p) => p.category))];

  // Calculate total quantity in cart
  const totalCartQuantity = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <Container className="my-5">
      {/* Hero banner */}
      <div
        className="rounded-3 shadow-lg mb-4 d-flex flex-column justify-content-center align-items-center text-center text-white"
        style={{
          background: "url('/public/assets/banner/banner1.webp') center center/cover no-repeat",
          height: "250px",
        }}
      >
        <h1 className="display-4 fw-bold" style={{ textShadow: "2px 2px 5px rgba(0,0,0,0.7)" }}>
          Special Offers
        </h1>
        <p className="lead" style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.6)" }}>
          Grab your favorites at exclusive prices!
        </p>
      </div>

      {/* Free Delivery Alert */}
      {totalCartQuantity >= 3 && (
        <Alert variant="success" className="text-center">
          🎉 Congratulations! You qualify for <strong>FREE Delivery</strong> 🎉
        </Alert>
      )}

      {/* Filters */}
      <Row className="mb-4 justify-content-center">
        <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
          <Form.Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter by category"
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
          >
            <option value="popularity">Sort by Popularity</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Product Grid */}
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center fs-5">No special offer products available now.</p>
      ) : (
        <Row className="g-4">
          {filteredProducts.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="d-flex">
              <Card className="shadow-sm flex-fill d-flex flex-column">
                <div className="position-relative overflow-hidden" style={{ height: 220 }}>
                  <Card.Img
                    variant="top"
                    src={product.image || "/images/placeholder.jpg"}
                    alt={product.name}
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <Badge
                    bg="info"
                    className="position-absolute top-0 start-0 m-2 px-2 py-1 fs-6"
                  >
                    Special Offer
                  </Badge>
                  {product.stock && product.stock < 5 && (
                    <Badge
                      bg="warning"
                      text="dark"
                      className="position-absolute top-0 end-0 m-2 px-2 py-1 fs-6"
                    >
                      Only {product.stock} left
                    </Badge>
                  )}
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fs-6 fw-semibold">{product.name}</Card.Title>

                  <div className="mb-2">
                    <span className="fw-bold fs-5 text-primary">Tk. {product.price}</span>{" "}
                    {product.originalPrice && (
                      <del className="text-muted">{`Tk. ${product.originalPrice}`}</del>
                    )}
                  </div>

                  <Button
                    variant="primary"
                    className="mt-auto"
                    onClick={() => dispatch(addToCart(product))}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default SpecialOfferPage;
