import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  InputGroup,
  Alert,
  Modal,
  ProgressBar,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth?.user);

  const [showLoading, setShowLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const [formData, setFormData] = useState({
    phone: "",
    name: "",
    email: "",
    address: "",
    deliveryType: "INSIDE DHAKA",
    paymentMethod: "cod",
    onlineGateway: "",
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvv: "",
    coupon: "",
    note: "",
    agree: false,
  });

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const shipping = formData.deliveryType === "OUTSIDE DHAKA" ? 130 : 70;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.agree) return alert("Please agree to Terms & Conditions.");
    if (!formData.phone || !formData.name || !formData.address)
      return alert("Please fill all required fields.");

    if (formData.paymentMethod === "online" && !formData.onlineGateway)
      return alert("Please select an online payment method.");

    if (
      formData.onlineGateway === "ssl" &&
      (!formData.cardNumber || !formData.cardHolder || !formData.expiry || !formData.cvv)
    ) {
      return alert("Please fill in all card details.");
    }

    const orderPayload = {
      ...formData,
      cartItems,
      subtotal,
      shipping,
      total,
      itemCount,
      user: user?._id || null,
    };

    console.log("✅ Order payload ready:", orderPayload);

    setShowLoading(true);
    setProgress(0);
  };

  // 🚗 Animate progress bar with car image
  useEffect(() => {
    if (showLoading) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setShowLoading(false);
            setShowSuccess(true);

            dispatch(clearCart());

            if (user) {
              const prevOrders =
                JSON.parse(localStorage.getItem(`orders_${user._id}`)) || [];
              localStorage.setItem(
                `orders_${user._id}`,
                JSON.stringify([
                  ...prevOrders,
                  { date: new Date().toISOString(), items: cartItems, total },
                ])
              );
            }

            setTimeout(() => {
              setShowSuccess(false);
              navigate("/");
            }, 2000);
            return 100;
          }
          return prev + 2;
        });
      }, 60);
    }
  }, [showLoading, dispatch, user, cartItems, total, navigate]);

  return (
    <Container className="py-4">
      <Row>
        {/* LEFT: Shipping */}
        <Col md={8}>
          <h5 className="mb-3">Shipping Details</h5>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Your Phone *</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Your Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email (Optional)</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address *</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Enter your address"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Delivery Type *</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="INSIDE DHAKA"
                  name="deliveryType"
                  type="radio"
                  value="INSIDE DHAKA"
                  checked={formData.deliveryType === "INSIDE DHAKA"}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="OUTSIDE DHAKA"
                  name="deliveryType"
                  type="radio"
                  value="OUTSIDE DHAKA"
                  checked={formData.deliveryType === "OUTSIDE DHAKA"}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>

            <h5 className="mt-4">Payment Method</h5>
            <Form.Check
              type="radio"
              label="Cash on Delivery"
              name="paymentMethod"
              value="cod"
              checked={formData.paymentMethod === "cod"}
              onChange={handleChange}
              inline
            />
            <Form.Check
              type="radio"
              label="Online Payment"
              name="paymentMethod"
              value="online"
              checked={formData.paymentMethod === "online"}
              onChange={handleChange}
              inline
            />

            {formData.paymentMethod === "cod" && (
              <Image
                src="/src/assets/icons/cod.png"
                width={180}
                className="mt-3"
                alt="Cash on Delivery"
              />
            )}

            {formData.paymentMethod === "online" && (
              <div className="mt-3">
                <Alert variant="info">
                  You will be redirected to the selected payment gateway after confirming.
                </Alert>
                <Form.Check
                  type="radio"
                  id="bkash"
                  name="onlineGateway"
                  label={
                    <div className="d-flex align-items-center gap-2">
                      <Image src="/src/assets/icons/bkash.png" height={50} alt="Bkash" />
                      <span>Bkash</span>
                    </div>
                  }
                  value="bkash"
                  onChange={handleChange}
                  checked={formData.onlineGateway === "bkash"}
                />
                <Form.Check
                  type="radio"
                  id="ssl"
                  name="onlineGateway"
                  label={
                    <div className="d-flex align-items-center gap-2 mt-2">
                      <Image src="/src/assets/icons/ssl.png" height={40} alt="SSLCommerz" />
                      <span>SSLCommerz</span>
                    </div>
                  }
                  value="ssl"
                  onChange={handleChange}
                  checked={formData.onlineGateway === "ssl"}
                />

                {/* SSLCommerz Card Inputs */}
                {formData.onlineGateway === "ssl" && (
                  <div className="mt-3 p-3 border rounded bg-light">
                    <Form.Group className="mb-2">
                      <Form.Label>Card Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                      />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label>Card Holder Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="cardHolder"
                        value={formData.cardHolder}
                        onChange={handleChange}
                        placeholder="John Doe"
                      />
                    </Form.Group>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-2">
                          <Form.Label>Expiry Date</Form.Label>
                          <Form.Control
                            type="text"
                            name="expiry"
                            value={formData.expiry}
                            onChange={handleChange}
                            placeholder="MM/YY"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-2">
                          <Form.Label>CVV</Form.Label>
                          <Form.Control
                            type="password"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            placeholder="•••"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                )}
              </div>
            )}
          </Form>
        </Col>

        {/* RIGHT: Summary */}
        <Col md={4}>
          <div className="bg-light p-3 rounded shadow-sm">
            <h5>Order Summary</h5>
            {itemCount >= 3 && (
              <Alert variant="success" className="fw-semibold text-center">
                🎁 Free delivery unlocked for 3+ items!
              </Alert>
            )}

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="d-flex justify-content-between align-items-start mb-2"
              >
                <div className="d-flex gap-2">
                  <Image src={item.image} width={40} height={40} rounded />
                  <div>
                    <small>{item.name}</small>
                    <br />
                    <small className="text-muted">Size: {item.size}</small>
                  </div>
                </div>
                <div>BDT {item.price * item.quantity}</div>
              </div>
            ))}

            <div className="border-top pt-2 mt-2">
              <div className="d-flex justify-content-between">
                <small>Subtotal</small>
                <small>BDT {subtotal}</small>
              </div>

              <Form.Group className="my-2">
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="coupon"
                    value={formData.coupon}
                    onChange={handleChange}
                    placeholder="Enter coupon code"
                  />
                  <Button variant="outline-secondary">Apply</Button>
                </InputGroup>
              </Form.Group>

              <div className="d-flex justify-content-between">
                <small>Shipping</small>
                <small>BDT {shipping}</small>
              </div>

              <div className="d-flex justify-content-between fw-bold mt-2">
                <span>Total</span>
                <span>BDT {total}</span>
              </div>

              <Form.Group className="mt-2">
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="note"
                  placeholder="Order Note"
                  value={formData.note}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Check
                  type="checkbox"
                  name="agree"
                  label={
                    <>
                      I agree to{" "}
                      <a href="/terms-conditions" target="_blank">
                        Terms & Conditions
                      </a>{" "}
                      &{" "}
                      <a href="/privacy-policy" target="_blank">
                        Privacy Policy
                      </a>
                    </>
                  }
                  checked={formData.agree}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button
                type="submit"
                variant="info"
                className="w-100 text-white mt-3"
                onClick={handleSubmit}
              >
                Confirm Order
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* 🚗 Loading Modal */}
      <Modal show={showLoading} centered backdrop="static" keyboard={false}>
        <Modal.Body className="text-center">
          <h5 className="fw-bold mb-3">Processing Your Order...</h5>
          <div className="position-relative mb-3">
            <ProgressBar
              now={progress}
              label={`${progress}%`}
              animated
              striped
              className="rounded-pill"
            />
            <motion.div
              className="position-absolute"
              initial={{ x: 0 }}
              animate={{ x: `${progress * 2.2}px` }}
              transition={{ ease: "linear", duration: 0.2 }}
              style={{ top: -35, left: 0 }}
            >
              <Image src="/src/assets/icon/car.png" height={45} alt="Car" />
            </motion.div>
          </div>
          <p className="text-muted">Hang tight, confirming your order...</p>
        </Modal.Body>
      </Modal>

      {/* ✅ Success Modal */}
      <Modal show={showSuccess} centered backdrop="static" keyboard={false}>
        <Modal.Body className="text-center py-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mb-3"
          >
            <Image src="/src/assets/icon/success.png" height={70} alt="Success" />
          </motion.div>
          <h5 className="fw-bold text-success mb-2">Order Confirmed!</h5>
          <p className="text-muted mb-0">Your order has been placed successfully 🎉</p>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CheckoutPage;
