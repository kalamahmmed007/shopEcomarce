import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";

export default function ChangePassword() {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [message, setMessage] = useState({ text: "", type: "" });

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSave = () => {
        const { currentPassword, newPassword, confirmPassword } = formData;

        if (!currentPassword || !newPassword || !confirmPassword) {
            setMessage({ text: "All fields are required.", type: "danger" });
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage({
                text: "New password and confirm password do not match.",
                type: "danger",
            });
            return;
        }

        // TODO: connect to backend API
        setMessage({ text: "Password changed successfully!", type: "success" });
        setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    };

    return (
        <Card className="mb-4 shadow-sm rounded-4 border-0">
            <Card.Body>
                <Card.Title className="fw-bold mb-3">Change Password</Card.Title>

                {message.text && <Alert variant={message.type}>{message.text}</Alert>}

                <Form className="mt-3">
                    <Form.Group className="mb-3">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            placeholder="Enter current password"
                            className="shadow-sm rounded-3"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="Enter new password"
                            className="shadow-sm rounded-3"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm new password"
                            className="shadow-sm rounded-3"
                        />
                    </Form.Group>

                    <Button variant="primary" className="rounded-pill" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}
