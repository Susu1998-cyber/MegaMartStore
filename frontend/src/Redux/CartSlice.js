import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCart,
  addCartItem,
  updateCartItem,
  deleteCartItem,
} from "../services/api";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCart();

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load cart",
      );
    }
  },
);

export const addItem = createAsyncThunk(
  "cart/addItem",
  async (data, { rejectWithValue }) => {
    try {
      const response = await addCartItem(data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add item",
      );
    }
  },
);

export const updateItem = createAsyncThunk(
  "cart/updateItem",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const response = await updateCartItem(id, quantity);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update cart",
      );
    }
  },
);

export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteCartItem(id);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove item",
      );
    }
  },
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    clearCart: (state) => {
      state.items = [];
    },

    clearCartError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload?.items || [];
      })

      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload?.items || [];
      })

      .addCase(addItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateItem.fulfilled, (state, action) => {
        state.items = action.payload?.items || [];
      })

      .addCase(updateItem.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete
      .addCase(removeItem.fulfilled, (state, action) => {
        state.items = action.payload?.items || [];
      })

      .addCase(removeItem.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearCart, clearCartError } = cartSlice.actions;

export default cartSlice.reducer;
