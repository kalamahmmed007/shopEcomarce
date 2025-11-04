import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  Carousel,
  Badge,
} from "react-bootstrap";
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";

// ------------------ Dummy Data ------------------
const dummyProducts = [
  {
    id: "1",
    title: "Casual Chek Shirt - VC352",
    brand: "Voyage",
    price: 1480,
    originalPrice: 1850,
    colors: ["#b49a68", "#4a4a4a", "#e3e3e3"],
    images: ["/images/shirt1.jpg", "/images/shirt2.jpg", "/images/shirt3.jpg"],
    sizes: [
      { size: "L", inStock: true },
      { size: "XL", inStock: true },
      { size: "XXL", inStock: false },
    ],
    description:
      "Premium cotton casual check shirt — comfortable, breathable, and stylish. Ideal for both casual and semi-formal looks.",
    fabric: "100% Premium Cotton",
    care: "Machine wash cold, tumble dry low.",
    styleTips: "Pair it with blue or black denim jeans.",
    reviews: [
      { id: 1, user: "Alice", rating: 5, comment: "Super comfy!", date: "2025-01-02", approved: true },
      { id: 2, user: "Ryan", rating: 4, comment: "Nice fit!", date: "2025-01-05", approved: true },
    ],
  },
  { id: "2", title: "Skinny Dark Blue Jeans", price: 1390, images: ["/images/jeans1.jpg"] },
  { id: "3", title: "Tinted Blue Jeans", price: 1390, images: ["/images/jeans2.jpg"] },
  { id: "4", title: "Sky Light Jeans", price: 1390, images: ["/images/jeans3.jpg"] },
  { id: "5", title: "Solid Shirt - Pink", price: 890, images: ["/images/shirt4.jpg"] },
  { id: "6", title: "Blue Denim Shirt Contrast", price: 990, images: ["/images/shirt5.jpg"] },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ user: "", rating: 5, comment: "" });
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const prod = dummyProducts.find((p) => p.id === id) || dummyProducts[0];
    setProduct(prod);
    setSelectedSize(prod.sizes?.find((s) => s.inStock)?.size || "");
    setSelectedColor(prod.colors?.[0] || "");
    setSelectedImage(prod.images?.[0] || "");
    setReviews(prod.reviews || []);
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return <div className="text-center mt-5">Loading...</div>;

  const relatedProducts = dummyProducts.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity, size: selectedSize, color: selectedColor, image: selectedImage }));
    alert("✅ Added to cart!");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate("/checkout");
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewForm.user.trim() || !reviewForm.comment.trim()) return alert("Fill name & comment!");
    const newReview = {
      id: Date.now(),
      user: reviewForm.user,
      rating: reviewForm.rating,
      comment: reviewForm.comment,
      date: new Date().toISOString().split("T")[0],
      approved: false,
    };
    alert("✅ Review submitted for admin approval!");
    setReviews((prev) => [newReview, ...prev]);
    setReviewForm({ user: "", rating: 5, comment: "" });
  };

  return (
    <Container className="py-4">
      {/* ------------ Desktop View ------------ */}
      <Row className="g-4 d-none d-md-flex">
        <Col md={6}>
          <img
            src={selectedImage}
            alt="Product"
            className="img-fluid rounded shadow-sm mb-3"
          />
          <div className="d-flex gap-2">
            {product.images?.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="thumb"
                onClick={() => setSelectedImage(img)}
                className={`img-fluid rounded border ${selectedImage === img ? "border-dark" : ""
                  }`}
                style={{ width: 80, height: 90, cursor: "pointer" }}
              />
            ))}
          </div>
        </Col>

        <Col md={6}>
          <p className="text-muted mb-1">{product.brand || "Men Fashion"}</p>
          <h3 className="fw-semibold">{product.title}</h3>
          <h5 className="fw-bold mt-2 text-dark">
            ৳{product.price}{" "}
            {product.originalPrice && (
              <del className="text-muted fs-6 ms-2">৳{product.originalPrice}</del>
            )}
          </h5>

          {/* Colors */}
          {product.colors && (
            <div className="mt-3">
              <p className="fw-semibold mb-1">Color</p>
              <div className="d-flex gap-2">
                {product.colors.map((color) => (
                  <div
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: "50%",
                      backgroundColor: color,
                      border: selectedColor === color ? "2px solid black" : "1px solid #ccc",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes && (
            <div className="mt-3">
              <p className="fw-semibold mb-1">Select Size</p>
              <div className="d-flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <Button
                    key={s.size}
                    variant={
                      s.inStock
                        ? selectedSize === s.size
                          ? "dark"
                          : "outline-dark"
                        : "outline-secondary"
                    }
                    size="sm"
                    disabled={!s.inStock}
                    onClick={() => setSelectedSize(s.size)}
                    className="rounded-pill"
                  >
                    {s.size}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <Button variant="dark" className="w-100 mt-3 py-2" onClick={handleAddToCart}>
            <FaShoppingCart className="me-2" />
            Add to Cart
          </Button>

          <div className="mt-4">
            <h6 className="fw-semibold">Description</h6>
            <p className="text-muted small">{product.description}</p>
            <p className="small mb-0">
              <strong>Fabric:</strong> {product.fabric}
            </p>
            <p className="small mb-0">
              <strong>Care:</strong> {product.care}
            </p>
            <p className="small">
              <strong>Style Tips:</strong> {product.styleTips}
            </p>
          </div>
        </Col>
      </Row>

      {/* ------------ Mobile View ------------ */}
      <div className="d-block d-md-none">
        <div className="position-relative">
          <Carousel indicators={false} interval={2000}>
            {product.images?.map((img, idx) => (
              <Carousel.Item key={idx}>
                <img
                  src={img}
                  alt="Product"
                  className="img-fluid w-100 rounded"
                  style={{ maxHeight: "400px", objectFit: "cover" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <Button
            variant="light"
            className="position-absolute top-0 end-0 m-2 rounded-circle shadow-sm"
          >
            <FaHeart />
          </Button>
        </div>

        <div className="mt-3 px-2">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="fw-semibold mb-0">{product.title}</h5>
            <span className="fw-bold fs-5">৳{product.price}</span>
          </div>
          <div className="d-flex align-items-center gap-1 text-warning mt-1">
            <FaStar />
            <span className="fw-semibold">4.5</span>
          </div>

          {/* Sizes */}
          {product.sizes && (
            <div className="mt-3">
              <p className="fw-semibold mb-1">Size</p>
              <div className="d-flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <Button
                    key={s.size}
                    variant={
                      s.inStock
                        ? selectedSize === s.size
                          ? "dark"
                          : "outline-dark"
                        : "outline-secondary"
                    }
                    size="sm"
                    disabled={!s.inStock}
                    onClick={() => setSelectedSize(s.size)}
                    className="rounded-pill"
                  >
                    {s.size}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="mt-4 border-bottom d-flex justify-content-between">
            <Button
              variant="link"
              className={`text-decoration-none ${activeTab === "description" ? "fw-bold text-dark" : "text-muted"
                }`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </Button>
            <Button
              variant="link"
              className={`text-decoration-none ${activeTab === "reviews" ? "fw-bold text-dark" : "text-muted"
                }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </Button>
          </div>

          <div className="mt-2 small text-muted">
            {activeTab === "description" ? (
              <p>{product.description}</p>
            ) : (
              <div>
                {reviews.map((r) => (
                  <div key={r.id} className="border-bottom py-2">
                    <strong>{r.user}</strong> ⭐{r.rating}
                    <p className="mb-1 small">{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Buttons */}
          <div className="d-flex gap-2 mt-4 pb-3">
            <Button variant="outline-dark" className="flex-grow-1" onClick={handleAddToCart}>
              <FaShoppingCart className="me-1" /> Add to Cart
            </Button>
            <Button variant="dark" className="flex-grow-1" onClick={handleBuyNow}>
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      {/* ------------ Related Products ------------ */}
      <div className="mt-5">
        <h5 className="fw-semibold mb-3">You might also like</h5>
        <Row className="g-3">
          {relatedProducts.map((item) => (
            <Col xs={6} md={3} key={item.id}>
              <Card className="border-0 shadow-sm rounded h-100">
                <Card.Img
                  variant="top"
                  src={item.images?.[0]}
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title className="fs-6 mb-1">{item.title}</Card.Title>
                  <div className="fw-semibold text-dark">৳{item.price}</div>
                  <Button
                    variant="outline-dark"
                    size="sm"
                    className="mt-2 w-100"
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
}
