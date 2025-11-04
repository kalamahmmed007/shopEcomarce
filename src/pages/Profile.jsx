import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Profile/Sidebar";
import Dashboard from "../components/Profile/Dashboard";
import ProfileInfo from "../components/Profile/ProfileInfo";
import AddressBook from "../components/Profile/Address";
import OrderHistory from "../components/Profile/OrderHistory";
import Wishlist from "../components/Profile/Wishlist";
import ChangePassword from "../components/Profile/ChangePassword";
import Notification from "../components/Profile/Notification";

export default function ProfilePage() {
  const [active, setActive] = useState("dashboard");

  const renderSection = () => {
    switch (active) {
      case "dashboard":
        return <Dashboard />;
      case "profile":
        return <ProfileInfo />;
      case "address":
        return <AddressBook />;
      case "orders":
        return <OrderHistory />;
      case "wishlist":
        return <Wishlist />;
      case "password":
        return <ChangePassword />;
      case "notifications":
        return <Notification />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Container fluid className="p-4">
      <Row>
        <Col md={3}>
          <Sidebar active={active} setActive={setActive} />
        </Col>
        <Col md={9}>{renderSection()}</Col>
      </Row>
    </Container>
  );
}
