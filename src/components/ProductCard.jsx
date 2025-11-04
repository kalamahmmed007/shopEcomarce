import React, { useState } from "react";
import { Card, Button, Badge, Form } from "react-bootstrap";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { motion } from "framer-motion";

const ProductCard = ({
  product,
  onBuy,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
}) => {
  const [selectedSize, setSelectedSize] = useState("");
  const sizes = ["S", "M", "L", "XL"];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first!");
      return;
    }
    onAddToCart({ ...product, size: selectedSize });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <Card className="border-0 shadow-sm h-100 text-center overflow-hidden">
        <div className="position-relative overflow-hidden">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card.Img
              variant="top"
              src={product.image}
              alt={product.name}
              style={{
                height: "260px",
                objectFit: "cover",
                transition: "transform 0.3s",
              }}
            />
          </motion.div>

          {/* Category Badge */}
          <Badge
            bg="primary"
            className="position-absolute top-0 start-0 m-2 px-2 py-1 text-uppercase"
          >
            {product.category}
          </Badge>

          {/* Sale Badge */}
          {product.sale && (
            <Badge
              bg="danger"
              className="position-absolute top-0 end-0 m-2 px-2 py-1 text-uppercase"
            >
              Sale
            </Badge>
          )}
        </div>

        <Card.Body className="d-flex flex-column justify-content-between">
          <div>
            {/* Product Title */}
            <Card.Title className="fs-6 fw-semibold text-truncate">
              {product.name}
            </Card.Title>

            {/* Rating */}
            <div className="text-warning mb-2">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i}>{i < Math.floor(product.rating) ? "★" : "☆"}</span>
              ))}
            </div>

            {/* Price */}
            <p className="mb-2">
              <span className="fw-bold text-primary">৳ {product.price}</span>{" "}
              {product.oldPrice && (
                <del className="text-muted ms-2">৳ {product.oldPrice}</del>
              )}
            </p>

            {/* Size Selector */}
            <Form.Select
              size="sm"
              className="mb-2"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="">Select Size</option>
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </Form.Select>
          </div>

          {/* Action Buttons */}
          <div className="d-flex justify-content-center gap-2 mt-2">
            <Button variant="primary" size="sm" onClick={onBuy}>
              Buy Now
            </Button>

            <Button variant="outline-secondary" size="sm" onClick={handleAddToCart}>
              Add to Cart
            </Button>

            {/* Wishlist Button with Bootstrap Icon */}
            <Button
              variant="light"
              size="sm"
              className="d-flex align-items-center justify-content-center p-0"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "1px solid #dc3545",
              }}
              onClick={() => onToggleWishlist(product)}
            >
              {isInWishlist ? (
                <HeartFill color="#dc3545" size={18} />
              ) : (
                <Heart color="#dc3545" size={18} />
              )}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
