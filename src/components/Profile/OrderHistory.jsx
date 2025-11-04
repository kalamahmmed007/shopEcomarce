import React from "react";
import { Card, Table, Button, Badge } from "react-bootstrap";

export default function OrderHistory() {
    const orders = [
        {
            id: "ORD1234",
            date: "2025-10-20",
            total: 120.0,
            status: "Delivered",
            items: [
                { name: "Product A", qty: 1, price: 50 },
                { name: "Product B", qty: 2, price: 35 },
            ],
        },
        {
            id: "ORD1235",
            date: "2025-10-18",
            total: 80.0,
            status: "Pending",
            items: [
                { name: "Product C", qty: 1, price: 40 },
                { name: "Product D", qty: 2, price: 20 },
            ],
        },
    ];

    return (
        <div>
            <h2 className="mb-4 fw-bold">Order History</h2>
            {orders.map((order) => (
                <Card key={order.id} className="mb-4 shadow-sm rounded-4 border-0">
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                            <div>
                                <h5 className="mb-1">Order ID: {order.id}</h5>
                                <p className="mb-1 text-muted">Date: {order.date}</p>
                                <p className="mb-0">
                                    Status:{" "}
                                    <Badge bg={order.status === "Delivered" ? "success" : "warning"}>
                                        {order.status}
                                    </Badge>
                                </p>
                            </div>
                            <div className="text-end mt-2 mt-md-0">
                                <h5 className="mb-1">Total: ${order.total.toFixed(2)}</h5>
                                <Button variant="outline-primary" size="sm" className="me-2 rounded-pill mb-1">
                                    View Details
                                </Button>
                                <Button variant="success" size="sm" className="rounded-pill mb-1">
                                    Reorder
                                </Button>
                            </div>
                        </div>

                        {/* Items table */}
                        <Table
                            striped
                            bordered
                            hover
                            responsive
                            className="mt-3 mb-0 rounded-3 shadow-sm"
                        >
                            <thead className="table-light">
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price ($)</th>
                                    <th>Subtotal ($)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{item.name}</td>
                                        <td>{item.qty}</td>
                                        <td>{item.price}</td>
                                        <td>{(item.qty * item.price).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}
