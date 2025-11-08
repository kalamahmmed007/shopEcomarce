import React, { useState, useEffect } from "react";
import { Card, Button, Badge, Container, Row, Col, Spinner, Alert, Form, Breadcrumb } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Dummy products
const dummyProducts = [
    { id: 1, name: "Casual Checked Shirt", price: 1290, originalPrice: 1490, category: "Shirt", rating: 4.5, brand: "Brand A", image: "/src/assets/images/7.jpg", dateAdded: "2025-01-01" },
    { id: 2, name: "Checked Shirt", price: 990, originalPrice: 1490, category: "Shirt", rating: 4, brand: "Brand B", image: "/src/assets/images/6.jpg", dateAdded: "2025-02-01" },
    { id: 3, name: "Striped Shirt", price: 1290, originalPrice: 1480, category: "Shirt", rating: 5, brand: "Brand A", image: "/src/assets/images/5.jpg", dateAdded: "2025-03-01" },
    { id: 4, name: "Printed Shirt", price: 1480, originalPrice: 1580, category: "Shirt", rating: 3.5, brand: "Brand C", image: "/src/assets/images/4.jpg", dateAdded: "2025-04-01" },
    { id: 5, name: "Slim Fit Pant", price: 1800, originalPrice: 2000, category: "Pant", rating: 4.2, brand: "Brand A", image: "/src/assets/images/8.jpg", dateAdded: "2025-05-01" },
    { id: 6, name: "Casual Panjabi", price: 2200, originalPrice: 2500, category: "Panjabi", rating: 4.8, brand: "Brand B", image: "/src/assets/images/9.jpg", dateAdded: "2025-06-01" },
    { id: 7, name: "Formal Shirt", price: 1600, originalPrice: 1800, category: "Shirt", rating: 4.1, brand: "Brand C", image: "/src/assets/images/10.jpg", dateAdded: "2025-07-01" },
    { id: 8, name: "Denim Jeans", price: 2000, originalPrice: 2300, category: "Pant", rating: 4.6, brand: "Brand A", image: "/src/assets/images/11.jpg", dateAdded: "2025-08-01" },
    { id: 9, name: "Printed Panjabi", price: 2500, originalPrice: 2700, category: "Panjabi", rating: 4.9, brand: "Brand B", image: "/src/assets/images/12.jpg", dateAdded: "2025-09-01" },
];

const BestSellingPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({ category: "All", brand: "All", priceRange: [0, 3000], sortBy: "Newest" });
    const [visibleCount, setVisibleCount] = useState(8); // Load more

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                // Simulate API call
                setProducts(dummyProducts);
            } catch {
                setError("Failed to load products.");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Filter + Sort products
    const filteredProducts = products
        .filter(p => (filters.category === "All" ? true : p.category === filters.category))
        .filter(p => (filters.brand === "All" ? true : p.brand === filters.brand))
        .filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1])
        .sort((a, b) => {
            if (filters.sortBy === "PriceLow") return a.price - b.price;
            if (filters.sortBy === "PriceHigh") return b.price - a.price;
            if (filters.sortBy === "Rating") return b.rating - a.rating;
            if (filters.sortBy === "Newest") return new Date(b.dateAdded) - new Date(a.dateAdded);
            return 0;
        });

    if (loading) return <Container className="my-5 text-center"><Spinner animation="border" /></Container>;
    if (error) return <Container className="my-5"><Alert variant="danger" className="text-center">{error}</Alert></Container>;

    return (
        <Container className="my-5">
            {/* Header + Breadcrumbs */}
            <div className="mb-4 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center ">
                <div>
                    <h2>BEST SELLING PRODUCTS</h2>
                    <Breadcrumb>
                        <Breadcrumb.Item onClick={() => navigate("/")}>Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Best Selling</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Button variant="outline-primary" onClick={() => navigate("/")}>Back to Home</Button>
            </div>

            {/* Filters + Sorting */}
            <Row className="mb-4 g-2 align-items-center display-flex border-bottom pb-3">
                <Col xs={12} md={3}>
                    <Form.Select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
                        <option value="All">All Categories</option>
                        <option value="Shirt">Shirt</option>
                        <option value="Pant">Pant</option>
                        <option value="Panjabi">Panjabi</option>
                    </Form.Select>
                </Col>
                <Col xs={12} md={3}>
                    <Form.Select value={filters.brand} onChange={(e) => setFilters({ ...filters, brand: e.target.value })}>
                        <option value="All">All Brands</option>
                        <option value="Brand A">Brand A</option>
                        <option value="Brand B">Brand B</option>
                        <option value="Brand C">Brand C</option>
                    </Form.Select>
                </Col>
                <Col xs={12} md={3}>
                    <Form.Select value={filters.sortBy} onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}>
                        <option value="Newest">Newest</option>
                        <option value="PriceLow">Price: Low to High</option>
                        <option value="PriceHigh">Price: High to Low</option>
                        <option value="Rating">Rating</option>
                    </Form.Select>
                </Col>
            </Row>

            {/* Product Grid */}
            <Row className="g-4">
                {filteredProducts.slice(0, visibleCount).map((product) => (
                    <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                        >
                            <Card
                                className="shadow-sm border-0 h-100"
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate(`/product/${product.id}`)}
                            >
                                <div className="position-relative">
                                    <Card.Img
                                        variant="top"
                                        src={product.image}
                                        alt={product.name}
                                        style={{ height: "300px", objectFit: "cover" }}
                                    />
                                    <Badge bg="primary" className="position-absolute top-0 start-0 m-2">{product.category}</Badge>
                                </div>
                                <Card.Body className="d-flex flex-column justify-content-between text-center">
                                    <div>
                                        <Card.Title className="fs-6">{product.name}</Card.Title>
                                        <div className="text-warning mb-2">
                                            {"★".repeat(Math.floor(product.rating))}{"☆".repeat(5 - Math.floor(product.rating))}
                                        </div>
                                        <p>
                                            <span className="fw-bold text-primary">Tk. {product.price}</span>{" "}
                                            <del className="text-muted">{product.originalPrice}</del>
                                        </p>
                                    </div>
                                    <div className="d-flex justify-content-center gap-2 mt-2">
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            onClick={(e) => { e.stopPropagation(); dispatch(addToCart(product)); navigate("/checkout"); }}
                                        >
                                            Buy Now
                                        </Button>
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={(e) => { e.stopPropagation(); dispatch(addToCart(product)); }}
                                        >
                                            Add to Cart
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </motion.div>
                    </Col>
                ))}
            </Row>

            {/* Load More */}
            {visibleCount < filteredProducts.length && (
                <div className="text-center mt-4">
                    <Button onClick={() => setVisibleCount(visibleCount + 4)}>Load More</Button>
                </div>
            )}
        </Container>
    );
};

export default BestSellingPage;
