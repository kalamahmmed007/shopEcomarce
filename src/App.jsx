// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Category from './pages/Category';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import OrderSuccess from './pages/OrderSuccess';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Wishlist from './pages/Wishlist';
import FaqPage from './pages/FaqPage';
import ReturnsPage from './pages/ReturnsPage';
import ShippingPage from './pages/ShippingPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import FlashDealPage from './pages/FlashDeal';
import SpecialOfferPage from "./pages/SpecialOfferPage";
import BestSellingPage from "./pages/BestSellingPage";

const CategoryWithProductList = () => {
  return (
    <>
      <Category />
      <ProductList />
    </>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:slug" element={<CategoryWithProductList />} />
          <Route path="/best-sellers" element={<BestSellingPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/returns" element={<ReturnsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/flash-deal" element={<FlashDealPage />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/special-offer" element={<SpecialOfferPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
