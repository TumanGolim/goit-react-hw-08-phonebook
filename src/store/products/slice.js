import { createSlice } from '@reduxjs/toolkit'
import { createProductsThunk, getProductsThunk } from './thunks'

const productsSlice = createSlice({
	name: 'products',
	initialState: {
		products: null,
		singleProduct: null,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getProductsThunk.fulfilled, (state, { payload }) => {
				state.products = payload.products
			})
			.addCase(createProductsThunk.fulfilled, (state, { payload }) => {
				state.singleProduct = payload
			})
	},
})

export const productsReducer = productsSlice.reducer
