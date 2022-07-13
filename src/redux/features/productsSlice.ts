import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_PRODUCTS} from "../../config";

interface HoursItem {
    closes_at:  string,
    is_closed: boolean,
    opens_at:  string,
}

interface ProductItem {
    address: string,
    description: string,
    hours: {
        friday: HoursItem,
        monday: HoursItem,
        saturday: HoursItem,
        sunday: HoursItem,
        thursday: HoursItem,
        tuesday: HoursItem,
        wednesday: HoursItem,
    },
    id: number,
    logo: string,
    name: string,
    phone_number: string,
    review: string,
    type: string,
    uid: string,
}

export interface ProductsState {
    loading: boolean,
    error: any,
    products: Array<ProductItem>,
    filteredProducts: Array<ProductItem>,
    productTypes: Array<string>,
    filters: Array<string>
}

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(API_PRODUCTS);
            return await response.json();
        } catch (error: any)  {
            return thunkAPI.rejectWithValue({ error: error?.message });
        }
    }
)

const initialState: ProductsState = {
    loading: false,
    error: null,
    products: [],
    filteredProducts: [],
    productTypes: [],
    filters: []
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setFilter(state, action){
            const indexProduct = state.filters.indexOf(action.payload.product)
            if (state.filters.includes(action.payload.product)) {
                state.filters.splice(indexProduct, 1)
            } else {
                state.filters.push(action.payload.product)
            }
            state.products.forEach((product) => {
                if (state.filters.includes(product.type)){
                    state.filteredProducts.push(product)
                } else {
                    state.filteredProducts = []
                    state.products.forEach(product => {
                        if (state.filters.includes(product.type)) {
                            state.filteredProducts.push(product)
                        }
                    })
                }})
            if (!state.filters.length) state.filteredProducts = []
            state.filteredProducts = state.filteredProducts.filter((rest, index, self) =>
                index === self.findIndex((element) => element.id === rest.id))
        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchProducts.pending, (state) => {
                state.loading = true;
            });
        builder.addCase(
            fetchProducts.fulfilled, (state, {payload}) => {
                state.products = payload;
                const typeList = payload.map((element: ProductItem) => element.type);
                state.productTypes = Array.from(new Set(typeList))
                state.filters = []
                state.loading = false;
            });
        builder.addCase(
            fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
    }
})

export const { setFilter } = productsSlice.actions;

export default productsSlice.reducer