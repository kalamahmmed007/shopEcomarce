// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import {
  Navbar as BsNavbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  Badge,
  NavDropdown,
} from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Offcanvas } from 'bootstrap';
import * as bootstrap from 'bootstrap';

import { logout } from '../redux/authSlice';
import {
  selectWishlistItems,
  selectCartItems,
  selectUser,
} from '../redux/selectors';

import SearchIcon from '../assets/icons/search.png';
import FlashIcon from '../assets/icons/flashsale.gif';
import OfferIcon from '../assets/icons/coupons.gif';
import HeartIcon from '../assets/icons/package.png';
import CartIcon from '../assets/icons/shopping-cart.png';
import UserIcon from '../assets/icons/user.png';
import MenuIcon from '../assets/icons/Menu.png';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredDropdown, setHoveredDropdown] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const wishlistItems = useSelector(selectWishlistItems);
  const cartItems = useSelector(selectCartItems);
  const user = useSelector(selectUser);
  const totalItems = cartItems.reduce(
    (acc, item) => acc + (item.qty || 1),
    0
  );

  const mainCategories = [
    { name: 'PANJABI', slug: 'panjabi' },
    {
      name: 'T-SHIRT',
      slug: 'tshirt',
      hasDropdown: true,
      subcategories: [
        'Regular T-Shirt',
        'Premium T-Shirt',
        'Graphic T-Shirt',
        'Polo T-Shirt',
      ],
    },
    {
      name: 'SHIRT',
      slug: 'shirt',
      hasDropdown: true,
      subcategories: [
        'Formal Shirt',
        'Casual Shirt',
        'Denim Shirt',
        'Check Shirt',
      ],
    },
    { name: 'POLO SHIRT', slug: 'polo-shirt' },
    {
      name: 'WINTER',
      slug: 'winter',
      hasDropdown: true,
      subcategories: ['Sweater', 'Hoodie', 'Jacket', 'Cardigan'],
    },
    {
      name: 'ACCESSORIES',
      slug: 'accessories',
      hasDropdown: true,
      subcategories: [
        'SHOE',
        'BELT',
        'WALLET',
        'FASHION MASK',
        'TRACKSUIT COMBO',
        'BOXER',
        'TROUSER',
      ],
    },
    {
      name: 'PANT',
      slug: 'pant',
      hasDropdown: true,
      subcategories: ['Jeans Pant', 'Casual Pant', 'Formal Pant', 'Cargo Pant'],
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleMobileNav = (path) => {
    navigate(path);
    const sidebar = document.getElementById('mobileSidebar');
    const bsOffcanvas = Offcanvas.getInstance(sidebar);
    if (bsOffcanvas) bsOffcanvas.hide();
  };

  const handleCollapseToggle = (id) => {
    document.querySelectorAll('.offcanvas .collapse').forEach((el) => {
      if (el.id !== id) {
        const bsCollapse = bootstrap.Collapse.getInstance(el);
        if (bsCollapse && el.classList.contains('show')) {
          bsCollapse.hide();
        }
      }
    });
  };

  const isActiveCategory = (slug) =>
    location.pathname.includes(`/category/${slug}`);

  useEffect(() => {
    const el = document.getElementById('mobileSidebar');
    if (el && !Offcanvas.getInstance(el)) {
      new Offcanvas(el);
    }
  }, []);

  return (
    <>
      {/* Desktop Navbar -  */}
      <BsNavbar
        className="shadow-sm py-2 d-none d-md-block sticky-top"
        style={{
          backgroundColor: '#1a2332',
          zIndex: 1040
        }}
      >
        <Container fluid="lg" className="align-items-center">
          {/* Logo */}
          <Link
            to="/"
            className="navbar-brand fw-bold fs-4 d-flex align-items-center text-white"
          >
            <img
              src="/src/assets/logo/royelattire.png"
              alt="Logo"
              width={50}
              height={50}
              className="me-2"
            />
            RoyelAttire
          </Link>

          {/* Search Bar */}
          <Form
            onSubmit={handleSearch}
            className="flex-grow-1 mx-4"
            style={{ maxWidth: 500 }}
          >
            <div className="input-group">
              <FormControl
                type="search"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-0"
                style={{ backgroundColor: 'white' }}
              />
              <Button
                type="submit"
                style={{
                  backgroundColor: '#ff6b35',
                  border: 'none'
                }}
              >
                <img src={SearchIcon} alt="Search" style={{ width: 18, height: 18, filter: 'brightness(0) invert(1)' }} />
              </Button>
            </div>
          </Form>

          {/* Action Buttons */}
          <Nav className="align-items-center gap-2">
            {/* Flash Deal */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/flash-deal"
                className="btn btn-sm px-3 py-2 text-white fw-semibold text-decoration-none d-flex align-items-center gap-2"
                style={{
                  backgroundColor: '#2c3e50',
                  border: 'none',
                  borderRadius: '6px'
                }}
              >
                <img src={FlashIcon} alt="Flash" width={20} height={20} />
                <span className="small">11.11<br />Offers</span>
              </Link>
            </motion.div>

            {/* PC Builder */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/special-offer"
                className="btn btn-sm px-3 py-2 text-white fw-semibold text-decoration-none d-flex align-items-center gap-2"
                style={{
                  backgroundColor: '#2c3e50',
                  border: 'none',
                  borderRadius: '6px'
                }}
              >
                <img src={OfferIcon} alt="Offer" width={20} height={20} />
                <span className="small">Special<br />Offer</span>
              </Link>
            </motion.div>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="nav-link position-relative"
              style={{ padding: '8px' }}
            >
              <img src={HeartIcon} alt="Wishlist" width={24} height={24} style={{ filter: 'brightness(0) invert(1)' }} />
              {wishlistItems.length > 0 && (
                <Badge
                  pill
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.65rem' }}
                >
                  {wishlistItems.length}
                </Badge>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="nav-link position-relative"
              style={{ padding: '8px' }}
            >
              <img src={CartIcon} alt="Cart" width={24} height={24} style={{ filter: 'brightness(0) invert(1)' }} />
              {totalItems > 0 && (
                <Badge
                  pill
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.65rem' }}
                >
                  {totalItems}
                </Badge>
              )}
            </Link>

            {/* User Account */}
            {user ? (
              <NavDropdown
                title={
                  <span className="text-white d-flex align-items-center gap-1">
                    <img src={UserIcon} alt="User" width={20} height={20} style={{ filter: 'brightness(0) invert(1)' }} />
                    <span className="small">Account</span>
                  </span>
                }
                id="user-dropdown"
                align="end"
                className="text-white"
              >
                <Link to="/orders" className="dropdown-item">My Orders</Link>
                <Link to="/profile" className="dropdown-item">Profile</Link>
                <NavDropdown.Divider />
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </NavDropdown>
            ) : (
              <Link to="/login" className="nav-link">
                <Button
                  size="sm"
                  className="px-3 fw-semibold"
                  style={{
                    backgroundColor: '#ff6b35',
                    border: 'none',
                    borderRadius: '6px'
                  }}
                >
                  <img src={UserIcon} alt="User" width={16} height={16} style={{ filter: 'brightness(0) invert(1)' }} className="me-1" />
                  Login/Register
                </Button>
              </Link>
            )}
          </Nav>
        </Container>
      </BsNavbar>

      {/* Category Bar - Desktop */}
      <nav
        className="d-none d-md-block shadow-sm"
        style={{
          backgroundColor: '#2c3e50',
          zIndex: 1030
        }}
      >
        <Container fluid="lg">
          <Nav className="justify-content-start">
            {mainCategories.map((cat, idx) =>
              cat.hasDropdown ? (
                <NavDropdown
                  key={cat.slug}
                  title={
                    <span
                      className={`fw-semibold ${isActiveCategory(cat.slug)
                        ? 'text-warning'
                        : 'text-white'
                        }`}
                      style={{ fontSize: '0.9rem' }}
                    >
                      {cat.name}
                    </span>
                  }
                  id={`cat-dropdown-${idx}`}
                  className="px-2"
                  onMouseEnter={() => setHoveredDropdown(idx)}
                  onMouseLeave={() => setHoveredDropdown(null)}
                  show={hoveredDropdown === idx}
                >
                  {cat.subcategories.map((sub) => (
                    <NavDropdown.Item
                      key={sub}
                      onClick={() =>
                        handleMobileNav(
                          `/category/${cat.slug}?sub=${sub
                            .toLowerCase()
                            .replace(/\s+/g, '-')}`
                        )
                      }
                    >
                      {sub}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              ) : (
                <Nav.Link
                  key={cat.slug}
                  onClick={() => handleMobileNav(`/category/${cat.slug}`)}
                  className={`fw-semibold px-3 ${isActiveCategory(cat.slug)
                    ? 'text-warning'
                    : 'text-white'
                    }`}
                  style={{ fontSize: '0.9rem' }}
                >
                  {cat.name}
                </Nav.Link>
              )
            )}
          </Nav>
        </Container>
      </nav>

      {/* Mobile Navbar */}
      <div className="d-md-none sticky-top shadow-sm" style={{ backgroundColor: '#1a2332', zIndex: 1040 }}>
        {/* Top Bar */}
        <div className="d-flex justify-content-between align-items-center py-2 px-3">
          <img
            src={MenuIcon}
            alt="menu"
            width={28}
            height={28}
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileSidebar"
            style={{ filter: 'brightness(0) invert(1)', cursor: 'pointer' }}
          />

          <Link to="/" className="fw-bold text-white fs-5 text-decoration-none">
            RoyelAttire
          </Link>

          <div className="d-flex align-items-center gap-3">
            <img
              src={HeartIcon}
              alt="Wishlist"
              width={24}
              height={24}
              onClick={() => handleMobileNav('/wishlist')}
              style={{ filter: 'brightness(0) invert(1)', cursor: 'pointer' }}
            />
            <div className="position-relative" onClick={() => handleMobileNav('/cart')} style={{ cursor: 'pointer' }}>
              <img src={CartIcon} alt="Cart" width={24} height={24} style={{ filter: 'brightness(0) invert(1)' }} />
              {totalItems > 0 && (
                <Badge
                  pill
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.65rem' }}
                >
                  {totalItems}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-3 pb-2">
          <form onSubmit={handleSearch}>
            <div className="input-group shadow-sm rounded overflow-hidden">
              <input
                type="text"
                className="form-control border-0"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="btn border-0"
                style={{ backgroundColor: '#ff6b35' }}
              >
                <img src={SearchIcon} alt="Search" width={16} height={16} style={{ filter: 'brightness(0) invert(1)' }} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Offcanvas Sidebar for Mobile */}
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="mobileSidebar">
        <div className="offcanvas-header" style={{ backgroundColor: '#1a2332' }}>
          <h5 className="offcanvas-title fw-bold text-white">Menu</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          <div className="mb-3">
            <button
              className="btn w-100 text-start d-flex align-items-center gap-2 mb-2 fw-semibold"
              onClick={() => handleMobileNav('/flash-deal')}
              style={{
                backgroundColor: '#f8f9fa',
                border: 'none'
              }}
            >
              <img src={FlashIcon} alt="Flash" width={24} height={24} /> Flash Deal
            </button>
            <button
              className="btn w-100 text-start d-flex align-items-center gap-2 fw-semibold"
              onClick={() => handleMobileNav('/special-offer')}
              style={{
                backgroundColor: '#f8f9fa',
                border: 'none'
              }}
            >
              <img src={OfferIcon} alt="Offer" width={24} height={24} /> Special Offer
            </button>
          </div>

          <hr />

          <ul className="list-unstyled">
            {mainCategories.map((cat, idx) => (
              <li key={idx} className="mb-2">
                {cat.hasDropdown ? (
                  <>
                    <button
                      className="btn w-100 text-start fw-semibold"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${idx}`}
                      onClick={() => handleCollapseToggle(`collapse${idx}`)}
                    >
                      {cat.name}
                    </button>
                    <div className="collapse" id={`collapse${idx}`}>
                      <ul className="list-unstyled ms-3">
                        {cat.subcategories.map((sub) => (
                          <li key={sub}>
                            <button
                              className="btn btn-sm text-start text-secondary"
                              onClick={() =>
                                handleMobileNav(
                                  `/category/${cat.slug}?sub=${sub
                                    .toLowerCase()
                                    .replace(/\s+/g, '-')}`
                                )
                              }
                            >
                              {sub}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <button
                    className="btn w-100 text-start fw-semibold"
                    onClick={() => handleMobileNav(`/category/${cat.slug}`)}
                  >
                    {cat.name}
                  </button>
                )}
              </li>
            ))}
          </ul>

          <hr />

          {user ? (
            <>
              <button
                className="btn w-100 text-start mb-2"
                onClick={() => handleMobileNav('/profile')}
              >
                Profile
              </button>
              <button className="btn w-100 text-start" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button
              className="btn w-100 fw-semibold"
              onClick={() => handleMobileNav('/login')}
              style={{
                backgroundColor: '#ff6b35',
                color: 'white',
                border: 'none'
              }}
            >
              Login / Register
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;