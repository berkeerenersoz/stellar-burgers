import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Ingredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
}

interface IngredientsState {
  data: Ingredient[];
  isLoading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  data: [],
  isLoading: false,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    fetchIngredientsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchIngredientsSuccess: (state, action: PayloadAction<Ingredient[]>) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchIngredientsFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
      state.data = [];
    }
  }
});

export const {
  fetchIngredientsRequest,
  fetchIngredientsSuccess,
  fetchIngredientsFailed
} = ingredientsSlice.actions;

export const ingredientsReducer = ingredientsSlice.reducer;

export { initialState }; 