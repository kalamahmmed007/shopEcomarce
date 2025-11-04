import React, { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { FaTrash, FaCartPlus } from "react-icons/fa";

export default function Wishlist() {
    // Dummy wishlist items
    const [items, setItems] = useState([
        {
            id: 1,
            name: "Stylish Sneakers",
            price: 79.99,
            img: "https://via.placeholder.com/250x200?text=Product+1",
        },
        {
            id: 2,
            name: "Classic Watch",
            price: 150.0,
            img: "https://via.placeholder.com/250x200?text=Product+2",
        },
        {
            id: 3,
            name: "Leather Bag",
            price: 120.0,
            img: "https://via.placeholder.com/250x200?text=Product+3",
        },
        {
            id: 4,
            name: "Sunglasses",
            price: 45.0,
            img: "https://via.placeholder.com/250x200?text=Product+4",
        },
    ]);

    const handleRemove = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const handleAddToCart = (item) => {
        alert(`Added ${item.name} to cart!`);
        // Later connect to cart API
    };

    return (
        <div>
            <h2 className="mb-4">My Wishlist</h2>
            {items.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <Row className="g-4">
                    {items.map((item) => (
                        <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
                            <Card className="h-100 shadow-sm">
                                <Card.Img
                                    variant="top"
                                    src={item.img}
                                    style={{ objectFit: "cover", height: "200px" }}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text className="mb-2">Price: ${item.price.toFixed(2)}</Card.Text>
                                    <div className="mt-auto d-flex justify-content-between">
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleRemove(item.id)}
                                        >
                                            <FaTrash className="me-1" /> Remove
                                        </Button>
                                        <Button
                                            variant="success"
                                            size="sm"
                                            onClick={() => handleAddToCart(item)}
                                        >
                                            <FaCartPlus className="me-1" /> Add to Cart
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}
