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
      {/* Desktop Navbar */}
      <BsNavbar
        bg="white"
        expand="md"
        className="shadow-sm py-2 d-none d-md-block sticky-top border-bottom"
        style={{ zIndex: 1040 }}
      >
        <Container fluid="lg" className="align-items-center">
          <Link
            to="/"
            className="navbar-brand fw-bold fs-3 d-flex align-items-center text-dark"
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

          <Form
            onSubmit={handleSearch}
            className="d-flex align-items-center flex-grow-1 mx-4"
            style={{ maxWidth: 600 }}
          >
            <div className="input-group">
              <FormControl
                type="search"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-start"
              />
              <Button
                type="submit"
                variant="outline-secondary"
                className="input-group-text"
              >
                <img src={SearchIcon} alt="Search" style={{ width: 16, height: 16 }} />
              </Button>
            </div>

            <div className="d-flex align-items-center ms-3 gap-3">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/flash-deal"
                  className="d-flex align-items-center gap-1 text-decoration-none text-dark"
                >
                  <img src={FlashIcon} alt="Flash" width={36} height={36} />
                  <span className="small fw-semibold">Flash Deal</span>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/special-offer"
                  className="d-flex align-items-center gap-1 text-decoration-none text-dark"
                >
                  <img src={OfferIcon} alt="Offer" width={30} height={30} />
                  <span className="small fw-semibold">Special Offer</span>
                </Link>
              </motion.div>
            </div>
          </Form>

          <Nav className="align-items-center gap-3">
            <Link to="/wishlist" className="nav-link position-relative text-dark">
              <img src={HeartIcon} alt="Wishlist" width={28} height={28} />
              {wishlistItems.length > 0 && (
                <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                  {wishlistItems.length}
                </Badge>
              )}
            </Link>

            <Link to="/cart" className="nav-link position-relative text-dark">
              <img src={CartIcon} alt="Cart" width={28} height={28} />
              {totalItems > 0 && (
                <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                  {totalItems}
                </Badge>
              )}
            </Link>

            {user ? (
              <NavDropdown
                title={<img src={UserIcon} alt="User" width={22} height={22} />}
                id="user-dropdown"
                align="end"
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
                <Button variant="outline-dark" size="sm" className="rounded-pill px-3">
                  Login
                </Button>
              </Link>
            )}
          </Nav>
        </Container>
      </BsNavbar>

      {/* Category Bar - Desktop */}
      <nav className="bg-info d-none d-md-block border-top shadow-sm" style={{ top: '96px', zIndex: 1030 }}>
        <Container fluid="lg">
          <Nav className="justify-content-center">
            {mainCategories.map((cat, idx) =>
              cat.hasDropdown ? (
                <NavDropdown
                  key={cat.slug}
                  title={
                    <span
                      className={`fw-semibold ${isActiveCategory(cat.slug)
                        ? 'text-white bg-primary px-2 rounded'
                        : 'text-dark'
                        }`}
                    >
                      {cat.name}
                    </span>
                  }
                  id={`cat-dropdown-${idx}`}
                  className="px-3"
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
                  className={`text-uppercase fw-semibold px-3 ${isActiveCategory(cat.slug)
                    ? 'text-white bg-primary rounded px-2'
                    : 'text-dark'
                    }`}
                >
                  {cat.name}
                </Nav.Link>
              )
            )}
          </Nav>
        </Container>
      </nav>

      {/* 🟧 Mobile Navbar */}
      <div className="d-md-none sticky-top shadow-sm" style={{ backgroundColor: 'orange', zIndex: 1040 }}>
        {/* Top Bar */}
        <div className="d-flex justify-content-between align-items-center py-2 px-3">
          <img
            src={MenuIcon}
            alt="menu"
            width={28}
            height={28}
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileSidebar"
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
            />
            <div className="position-relative" onClick={() => handleMobileNav('/cart')}>
              <img src={CartIcon} alt="Cart" width={24} height={24} />
              {totalItems > 0 && (
                <Badge
                  pill
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {totalItems}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-3 pb-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchTerm.trim()) {
                navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
                setSearchTerm('');
              }
            }}
          >
            <div className="input-group shadow-sm rounded overflow-hidden">
              <input
                type="text"
                className="form-control border-0"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="btn btn-light border-0">
                <img src={SearchIcon} alt="Search" width={16} height={16} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Offcanvas Sidebar for Mobile */}
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="mobileSidebar">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title fw-bold">Menu</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          <div className="mb-3">
            <button
              className="btn w-100 text-start d-flex align-items-center gap-2 mb-1"
              onClick={() => handleMobileNav('/flash-deal')}
            >
              <img src={FlashIcon} alt="Flash" width={24} height={24} /> Flash Deal
            </button>
            <button
              className="btn w-100 text-start d-flex align-items-center gap-2"
              onClick={() => handleMobileNav('/special-offer')}
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
                className="btn w-100 text-start"
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
              className="btn w-100 btn-dark"
              onClick={() => handleMobileNav('/login')}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
