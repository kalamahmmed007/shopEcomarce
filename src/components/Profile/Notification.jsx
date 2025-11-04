import React from "react";
import { Card, ListGroup, Badge, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { markNotificationRead, markAllRead } from "../../redux/profileSlice";

export default function Notification() {
    const dispatch = useDispatch();
    const notifications = useSelector((state) => state.profile.notificationsList);

    const handleMarkRead = (id) => {
        dispatch(markNotificationRead(id));
    };

    const handleMarkAll = () => {
        dispatch(markAllRead());
    };

    return (
        <Card className="mb-4 shadow-sm rounded-4 border-0">
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-center fw-bold mb-3">
                    Notifications
                    <Button variant="outline-primary" size="sm" className="rounded-pill" onClick={handleMarkAll}>
                        Mark All Read
                    </Button>
                </Card.Title>

                <ListGroup variant="flush" className="mt-2">
                    {notifications.length === 0 && <p className="text-center text-muted">No notifications</p>}

                    {notifications.map((notif) => (
                        <ListGroup.Item
                            key={notif.id}
                            className={`d-flex justify-content-between align-items-start shadow-sm rounded-3 mb-2 ${!notif.read ? "bg-light" : "bg-white"
                                }`}
                            style={{ transition: "0.2s" }}
                        >
                            <div>
                                <div>{notif.text}</div>
                                <div className="text-muted small">{notif.date}</div>
                            </div>

                            {!notif.read && (
                                <Badge
                                    pill
                                    bg="primary"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleMarkRead(notif.id)}
                                    className="py-2 px-3"
                                >
                                    New
                                </Badge>
                            )}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
}
