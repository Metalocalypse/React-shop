import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Product } from '../types'; 

interface ProductState {
  items: Product[];
  selectedProduct: Product | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  selectedProduct: null,
  status: 'idle',
  error: null,
};

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { rejectValue: { message: string } }
>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        return rejectWithValue({ message: `Failed to fetch products. Status: ${response.status}` });
      }
      const data: Product[] = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue({ message: error.message || 'An unknown error occurred while fetching products.' });
    }
  }
);

export const fetchProductById = createAsyncThunk<
  Product,
  number,
  { rejectValue: { status?: number; message: string } }
>(
  'products/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      if (!response.ok) {
        let errorData = { message: `Request failed with status ${response.status}` };
        try {
          errorData = await response.json();
        } catch (e) {
          errorData.message = response.statusText || errorData.message;
        }
        return rejectWithValue({ status: response.status, message: errorData.message });
      }

      const responseText = await response.text();
      if (!responseText || responseText.trim() === "") {
        return rejectWithValue({ status: 404, message: `Product with ID ${productId} not found.` });
      }

      const data: Product | null = JSON.parse(responseText);

      if (data === null) {
        return rejectWithValue({ status: 404, message: `Product with ID ${productId} not found.` });
      }
      return data;
    } catch (error: any) {
      return rejectWithValue({ message: error.message || 'Failed to process product details.' });
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message || 'Failed to fetch products.';
        }
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
        state.selectedProduct = null;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.status = 'succeeded';
        state.selectedProduct = action.payload;
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.selectedProduct = null;
        if (action.payload) {
          state.error = action.payload.message;
        } else {
          state.error = action.error.message || 'Could not fetch product details.';
        }
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;