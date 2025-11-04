import React from "react";
import { useSelector } from "react-redux";
import { Card, Row, Col, Badge } from "react-bootstrap";

export default function Dashboard() {
    const user = useSelector((state) => state.profile.user);
    const profileData = useSelector((state) => state.profile.userData || {});
    const cart = useSelector((state) => state.cart.items || []); // <- cartSlice

    const stats = [
        {
            title: "On Going Orders",
            value: profileData.orders?.ongoing || 0,
            color: "success",
            icon: "🛒",
        },
        {
            title: "Products in Cart",
            value: cart.length || 0,
            color: "primary",
            icon: "🛍️",
        },
        {
            title: "Products in Wishlist",
            value: profileData.wishlist?.length || 0,
            color: "danger",
            icon: "❤️",
        },
        {
            title: "Products Ordered",
            value: profileData.orders?.total || 0,
            color: "info",
            icon: "📦",
        },
    ];

    return (
        <div>
            <h4 className="fw-bold mb-4">Dashboard</h4>

            {/* Stats Cards */}
            <Row className="g-3 mb-4">
                {stats.map((s, i) => (
                    <Col md={3} sm={6} xs={12} key={i}>
                        <Card className={`border-${s.color} rounded-4 shadow-sm bg-white`}>
                            <Card.Body className="text-center py-4">
                                <div className={`display-6 text-${s.color}`}>{s.value}</div>
                                <p className="mb-1 fw-semibold">{s.title}</p>
                                <span style={{ fontSize: "1.5rem" }}>{s.icon}</span>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Cart Card */}
            <Card className="text-center p-4 rounded-4 shadow-sm bg-white border-0">
                <p className="fw-bold fs-5">My Cart</p>
                {cart.length > 0 ? (
                    <p className="text-muted mb-3">
                        You have {cart.length} product{cart.length > 1 ? "s" : ""} in your cart.
                    </p>
                ) : (
                    <>
                        <p className="text-muted mb-3">There are no products in your cart.</p>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                            width="120"
                            alt="empty-cart"
                        />
                        <div className="mt-3">
                            <Badge bg="primary" pill className="py-2 px-4 fs-6">
                                Shop Now
                            </Badge>
                        </div>
                    </>
                )}
            </Card>
        </div>
    );
}
