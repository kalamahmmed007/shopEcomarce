import React, { useState } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { FaMapMarkerAlt, FaEdit, FaTrash } from "react-icons/fa";

export default function AddressBook() {
    const [addresses, setAddresses] = useState([
        {
            id: 1,
            type: "Home",
            street: "House 127, Baselor Point",
            city: "Dhaka",
            postalCode: "1207",
            country: "Bangladesh",
        },
    ]);

    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        type: "",
        street: "",
        city: "",
        postalCode: "",
        country: "",
    });

    const handleEdit = (addr) => {
        setEditingId(addr.id);
        setFormData({ ...addr });
    };

    const handleDelete = (id) => {
        setAddresses(addresses.filter((addr) => addr.id !== id));
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (editingId) {
            setAddresses(
                addresses.map((addr) =>
                    addr.id === editingId ? { ...formData, id: editingId } : addr
                )
            );
        } else {
            setAddresses([...addresses, { ...formData, id: Date.now() }]);
        }
        setEditingId(null);
        setFormData({ type: "", street: "", city: "", postalCode: "", country: "" });
    };

    const handleCancel = () => {
        setEditingId(null);
        setFormData({ type: "", street: "", city: "", postalCode: "", country: "" });
    };

    return (
        <Card className="mb-4 shadow-sm rounded-4 border-0">
            <Card.Body>
                <Card.Title className="mb-4 d-flex align-items-center fw-bold">
                    <FaMapMarkerAlt className="me-2 text-primary" /> Address Book
                </Card.Title>

                {/* Form */}
                <Form className="mb-4">
                    <Row className="mb-2 g-2">
                        <Col md={4}>
                            <Form.Control
                                type="text"
                                placeholder="Type (Home, Work...)"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="shadow-sm rounded-3"
                            />
                        </Col>
                        <Col md={8}>
                            <Form.Control
                                type="text"
                                placeholder="Street Address"
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                                className="shadow-sm rounded-3"
                            />
                        </Col>
                    </Row>

                    <Row className="mb-2 g-2">
                        <Col md={4}>
                            <Form.Control
                                type="text"
                                placeholder="City"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="shadow-sm rounded-3"
                            />
                        </Col>
                        <Col md={4}>
                            <Form.Control
                                type="text"
                                placeholder="Postal Code"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                className="shadow-sm rounded-3"
                            />
                        </Col>
                        <Col md={4}>
                            <Form.Control
                                type="text"
                                placeholder="Country"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="shadow-sm rounded-3"
                            />
                        </Col>
                    </Row>

                    <div className="d-flex gap-2">
                        <Button variant="primary" className="rounded-pill" onClick={handleSave}>
                            {editingId ? "Update" : "Add"}
                        </Button>
                        {editingId && (
                            <Button variant="secondary" className="rounded-pill" onClick={handleCancel}>
                                Cancel
                            </Button>
                        )}
                    </div>
                </Form>

                {/* Address List */}
                {addresses.map((addr) => (
                    <Card
                        key={addr.id}
                        className="mb-3 shadow-sm rounded-4 border-0"
                        style={{ transition: "0.2s" }}
                    >
                        <Card.Body className="d-flex justify-content-between align-items-center">
                            <div>
                                <Card.Text className="mb-1 fw-semibold">
                                    {addr.type}: {addr.street}, {addr.city}
                                </Card.Text>
                                <Card.Text className="text-muted mb-0">
                                    {addr.country} - {addr.postalCode}
                                </Card.Text>
                            </div>
                            <div className="d-flex gap-2">
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    className="rounded-circle"
                                    onClick={() => handleEdit(addr)}
                                >
                                    <FaEdit />
                                </Button>
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    className="rounded-circle"
                                    onClick={() => handleDelete(addr.id)}
                                >
                                    <FaTrash />
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </Card.Body>
        </Card>
    );
}
