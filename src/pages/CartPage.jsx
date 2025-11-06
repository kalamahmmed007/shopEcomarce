import React from 'react';
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Breadcrumb,
  Table,
  Alert,
} from 'react-bootstrap';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from '../redux/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const total = subtotal;

  return (
    <Container className="py-4">
      {/* Breadcrumb */}
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Cart List</Breadcrumb.Item>
      </Breadcrumb>

      <h4 className="mb-4">Your Cart</h4>

      <Row>
        {/* Left: Cart Items */}
        <Col md={8}>
          {cartItems.length === 0 ? (
            <div className="text-muted">Your cart is empty.</div>
          ) : (
            cartItems.map((item) => (
              <Row
                key={item.id}
                className="align-items-center border-bottom py-3"
              >
                <Col md={2}>
                  <Image src={item.image} fluid rounded />
                </Col>
                <Col md={4}>
                  <h6>{item.name}</h6>
                  {item.size && (
                    <div>
                      <small className="text-muted">Size:</small>{' '}
                      <span className="border px-2 py-1 rounded bg-light">
                        {item.size}
                      </span>
                    </div>
                  )}
                </Col>
                <Col md={2}>
                  <strong>BDT {item.price}</strong>
                </Col>
                <Col md={2} className="d-flex align-items-center">
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => dispatch(decrementQuantity(item.id))}
                    disabled={item.quantity === 1}
                  >
                    <FaMinus />
                  </Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button
                    variant="light"
                    size="sm"
                    onClick={() => dispatch(incrementQuantity(item.id))}
                  >
                    <FaPlus />
                  </Button>
                </Col>
                <Col md={2}>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    <FaTrash />
                  </Button>
                </Col>
              </Row>
            ))
          )}
        </Col>

        {/* Right: Order Summary */}
        <Col md={4}>
          <div className="border rounded p-3 shadow-sm bg-light">
            <h5>Order Summary</h5>

            {/* ✅ Free Delivery Message */}
            {totalItems >= 5 && (
              <Alert variant="success" className="text-center fw-semibold">
                🎉 You’ve qualified for <strong>FREE Delivery</strong> by buying 5 or more items!
              </Alert>
            )}

            <Table borderless size="sm" className="mb-0">
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <Image
                        src={item.image}
                        width={40}
                        height={40}
                        rounded
                      />
                    </td>
                    <td>
                      <small>{item.name}</small>
                      <br />
                      <small className="text-muted">Size: {item.size}</small>
                    </td>
                    <td className="text-end">
                      BDT {item.price * item.quantity}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="2" className="text-muted">
                    Subtotal
                  </td>
                  <td className="text-end">BDT {subtotal}</td>
                </tr>

                <tr className="fw-bold">
                  <td colSpan="2">TOTAL</td>
                  <td className="text-end">BDT {total}</td>
                </tr>
              </tbody>
            </Table>
            <Button
              variant="info"
              className="w-100 mt-3 text-white"
              disabled={cartItems.length === 0}
              onClick={() => {
                console.log("navigating to checkout");
                navigate('/checkout');
              }}
            >
              Checkout
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
