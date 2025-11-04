import React, { useState } from "react";
import { Card, Form, Button, Row, Col, Image, Alert } from "react-bootstrap";
import { FaUpload } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../redux/profileSlice";

export default function ProfileInfo() {
    const user = useSelector((state) => state.profile.user);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState(user);
    const [message, setMessage] = useState({ text: "", type: "" });

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handlePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () =>
                setFormData({ ...formData, profilePic: reader.result });
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        if (!formData.name || !formData.email) {
            setMessage({ text: "Name and Email are required.", type: "danger" });
            return;
        }

        dispatch(updateProfile(formData)); // Redux updates sidebar automatically
        setMessage({ text: "Profile updated successfully!", type: "success" });
    };

    return (
        <Card className="mb-4 shadow-sm">
            <Card.Body>
                <Card.Title>Profile Information</Card.Title>
                {message.text && <Alert variant={message.type}>{message.text}</Alert>}

                <Row className="mt-3">
                    <Col md={3} className="text-center mb-3">
                        <Image
                            src={
                                formData.profilePic ||
                                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            }
                            roundedCircle
                            fluid
                            style={{ width: "150px", height: "150px", objectFit: "cover" }}
                        />
                        <Form.Group className="mt-2">
                            <Form.Label className="btn btn-outline-primary mb-0">
                                <FaUpload className="me-1" /> Upload
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePicChange}
                                    hidden
                                />
                            </Form.Label>
                        </Form.Group>
                    </Col>

                    <Col md={9}>
                        <Form>
                            <Row>
                                <Col md={6} className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col md={6} className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col md={6} className="mb-3">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </Col>
                                <Col md={6} className="mb-3">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Row>

                            <Button variant="primary" onClick={handleSave}>
                                Save Changes
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}
