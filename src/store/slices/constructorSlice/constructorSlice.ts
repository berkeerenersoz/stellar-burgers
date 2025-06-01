import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../ingredientsSlice/ingredientsSlice';

interface ConstructorIngredient extends Ingredient {
  id: string;
}

interface ConstructorState {
  bun: Ingredient | null;
  fillings: ConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: null,
  fillings: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<Ingredient>) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.fillings.push({
          ...action.payload,
          id: crypto.randomUUID()
        });
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.fillings = state.fillings.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) => {
      const { dragIndex, hoverIndex } = action.payload;
      const draggedItem = state.fillings[dragIndex];
      state.fillings.splice(dragIndex, 1);
      state.fillings.splice(hoverIndex, 0, draggedItem);
    }
  }
});

export const { addIngredient, removeIngredient, moveIngredient } =
  constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;

export { initialState }; 