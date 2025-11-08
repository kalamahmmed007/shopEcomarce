import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching all products
export const getAllProducts = createAsyncThunk(
  'products/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/products');
      if (!Array.isArray(res.data)) throw new Error('API returned invalid data');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = Array.isArray(action.payload) ? action.payload : [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.items = Array.isArray(action.payload) ? action.payload : [];
        state.loading = false;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch products';
      });
  },
});

// Memoized selectors
export const selectProducts = createSelector(
  (state) => state.products.items,
  (items) => items
);

export const selectProductsLoading = createSelector(
  (state) => state.products.loading,
  (loading) => loading
);

export const selectProductsError = createSelector(
  (state) => state.products.error,
  (error) => error
);

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
