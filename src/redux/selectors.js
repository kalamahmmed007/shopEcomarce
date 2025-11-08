// src/redux/selectors.js
import { createSelector } from '@reduxjs/toolkit';
const selectProductsState = (state) => state.products || {};

export const selectProducts = createSelector(
  [selectProductsState],
  (products) => Array.isArray(products.items) ? products.items : []
);

// ===== Wishlist Selectors =====
const selectWishlistState = (state) => state.wishlist || {};

export const selectWishlistItems = createSelector(
  [selectWishlistState],
  (wishlist) => Array.isArray(wishlist.wishlistItems) ? wishlist.wishlistItems : []
);

// ===== Cart Selectors =====
const selectCartState = (state) => state.cart || {};

export const selectCartItems = createSelector(
  [selectCartState],
  (cart) => Array.isArray(cart.items) ? cart.items : []
);

export const selectCartCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + (item.quantity || 0), 0)
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0)
);

// ===== Auth Selectors =====
const selectAuthState = (state) => state.auth || {};

export const selectUser = createSelector(
  [selectAuthState],
  (auth) => auth.user || null
);

export const selectIsAuthenticated = createSelector(
  [selectUser],
  (user) => Boolean(user)
);
