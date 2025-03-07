import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/types";
import { fetchProductsAPI } from "../utils/api";

interface ProductsState {
  items: Product[];
  total: number;
  loading: boolean;
  error: string | null;
  searchTerm: string;
  pageSize: number;
  currentPage: number;
  activeTab: "ALL" | "LAPTOPS";
}

const initialState: ProductsState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
  searchTerm: "",
  pageSize: 5,
  currentPage: 1,
  activeTab: "ALL",
};

interface FetchProductsArgs {
  limit: number;
  skip: number;
  category: string;
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ limit, skip, category }: FetchProductsArgs) => {
    return await fetchProductsAPI({ limit, skip, category });
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<"ALL" | "LAPTOPS">) => {
      state.activeTab = action.payload;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { setSearchTerm, setPageSize, setCurrentPage, setActiveTab } =
  productsSlice.actions;
export default productsSlice.reducer;
