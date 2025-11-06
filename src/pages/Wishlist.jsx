import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Toast, ToastContainer } from "react-bootstrap";

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const handleMoveToCart = (item) => {
    dispatch(addToCart({ ...item, quantity: 1 }));
    dispatch(removeFromWishlist(item.id));
    setShowToast(true);
  };

  if (wishlistItems.length === 0) {
    return (
      <motion.div
        className="container py-5 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h3 className="fw-semibold">Your wishlist is empty 😢</h3>
        <Link to="/" className="btn btn-primary mt-3">
          Go Shopping
        </Link>
      </motion.div>
    );
  }

  return (
    <>
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <h2 className="fw-bold mb-0 text-center text-md-start">
            My Wishlist ❤️
          </h2>
          <p className="text-muted mb-0">
            Total Items: {wishlistItems.length}
          </p>
        </div>

        <div className="row gy-4">
          {wishlistItems.map((item) => (
            <motion.div
              key={item.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card h-100 shadow-sm border-0">
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.image || "/default.jpg"}
                    className="card-img-top"
                    alt={item.title}
                    style={{
                      height: "230px",
                      objectFit: "cover",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                    }}
                  />
                </Link>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-semibold text-truncate">
                    {item.title}
                  </h5>
                  <p className="card-text text-muted mb-3">
                    ৳{item.price.toLocaleString()}
                  </p>
                  <div className="mt-auto d-flex justify-content-between flex-wrap gap-2">
                    <button
                      className="btn btn-outline-primary btn-sm w-100"
                      onClick={() => handleMoveToCart(item)}
                    >
                      Move to Cart
                    </button>
                    <button
                      className="btn btn-danger btn-sm w-100"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Toast Notification */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg="success"
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={2000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            ✅ Moved to Cart successfully!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default Wishlist;
