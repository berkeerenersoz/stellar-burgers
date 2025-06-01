import { ingredientsSlice, initialState, getIngredients } from '../../../../services/slices/ingredientsSlice/ingredientsSlice';

describe('ingredientsSlice', () => {
  const mockIngredients = [
    {
      _id: '1',
      name: 'Test Ingredient 1',
      type: 'main',
      price: 100,
      image: 'test1.jpg',
      image_large: 'test1-large.jpg',
      image_mobile: 'test1-mobile.jpg',
      calories: 100,
      proteins: 10,
      fat: 10,
      carbohydrates: 10
    },
    {
      _id: '2',
      name: 'Test Ingredient 2',
      type: 'bun',
      price: 200,
      image: 'test2.jpg',
      image_large: 'test2-large.jpg',
      image_mobile: 'test2-mobile.jpg',
      calories: 200,
      proteins: 20,
      fat: 20,
      carbohydrates: 20
    }
  ];

  describe('getIngredients', () => {
    it('should handle pending state', () => {
      const action = getIngredients.pending;
      const state = ingredientsSlice.reducer(initialState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fulfilled state', () => {
      const action = getIngredients.fulfilled(mockIngredients, 'requestId');
      const state = ingredientsSlice.reducer(initialState, action);

      expect(state.ingredients).toEqual(mockIngredients);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should handle rejected state', () => {
      const error = 'Failed to fetch ingredients';
      const action = getIngredients.rejected(new Error(error), 'requestId');
      const state = ingredientsSlice.reducer(initialState, action);

      expect(state.error).toBe(error);
      expect(state.isLoading).toBe(false);
      expect(state.ingredients).toEqual([]);
    });
  });
}); 