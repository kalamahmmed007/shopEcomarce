import React from "react";
import { ListGroup, Image, Badge } from "react-bootstrap";
import {
    House,
    ClockHistory,
    Heart,
    Person,
    GeoAlt,
    Key,
    BoxArrowRight,
    Bell,
} from "react-bootstrap-icons";
import { useSelector } from "react-redux";

export default function Sidebar({ active, setActive }) {
    const user = useSelector((state) => state.profile.user);

    const menuItems = [
        { key: "dashboard", icon: <House />, text: "Dashboard" },
        { key: "orders", icon: <ClockHistory />, text: "Order History" },
        { key: "wishlist", icon: <Heart />, text: "Wishlist" },
        { key: "profile", icon: <Person />, text: "Profile & Security" },
        { key: "address", icon: <GeoAlt />, text: "Manage Address" },
        { key: "password", icon: <Key />, text: "Change Password" },
        { key: "notifications", icon: <Bell />, text: "Notifications" },
    ];

    return (
        <div className="p-3 bg-white shadow-sm rounded-4" style={{ height: "100%" }}>
            {/* User info */}
            <div className="text-center mb-4">
                <Image
                    src={user.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    roundedCircle
                    width="80"
                    height="80"
                    style={{ objectFit: "cover" }}
                />
                <h6 className="mt-2 mb-0 fw-bold">{user.name}</h6>
                <small className="text-muted">{user.email}</small>

                {/* Notifications badge */}
                {user.notifications > 0 && (
                    <div className="mt-2">
                        <Bell className="me-1" />
                        <Badge bg="danger" pill>
                            {user.notifications}
                        </Badge>
                    </div>
                )}
            </div>

            {/* Menu */}
            <ListGroup variant="flush">
                {menuItems.map((item) => (
                    <ListGroup.Item
                        key={item.key}
                        action
                        active={active === item.key}
                        onClick={() => setActive(item.key)}
                        className="d-flex align-items-center rounded-3 mb-1"
                    >
                        <span className="me-2">{item.icon}</span>
                        {item.text}
                    </ListGroup.Item>
                ))}
            </ListGroup>

            {/* Logout */}
            <ListGroup.Item
                action
                className="mt-4 text-danger d-flex align-items-center rounded-3"
                onClick={() => alert("Logged Out!")}
            >
                <BoxArrowRight className="me-2" /> Logout
            </ListGroup.Item>
        </div>
    );
}
