import { constructorSlice, initialState, addIngredient, removeIngredient, moveDownIngredient, moveUpIngredient } from '../../../../services/slices/constructorSlice/constructorSlice';

describe('constructorSlice', () => {
  const mockBun = {
    _id: '1',
    name: 'Test Bun',
    type: 'bun',
    price: 100,
    image: 'test-bun.jpg',
    image_large: 'test-bun-large.jpg',
    image_mobile: 'test-bun-mobile.jpg',
    calories: 100,
    proteins: 10,
    fat: 10,
    carbohydrates: 10
  };

  const mockFilling = {
    _id: '2',
    name: 'Test Filling',
    type: 'main',
    price: 200,
    image: 'test-filling.jpg',
    image_large: 'test-filling-large.jpg',
    image_mobile: 'test-filling-mobile.jpg',
    calories: 200,
    proteins: 20,
    fat: 20,
    carbohydrates: 20
  };

  describe('addIngredient', () => {
    it('should add a bun', () => {
      const action = addIngredient(mockBun);
      const state = constructorSlice.reducer(initialState, action);

      expect(state.constructorItems.bun).toMatchObject({
        ...mockBun,
        id: expect.any(String)
      });
      expect(state.constructorItems.ingredients).toEqual([]);
    });

    it('should add a filling', () => {
      const action = addIngredient(mockFilling);
      const state = constructorSlice.reducer(initialState, action);

      expect(state.constructorItems.bun).toBeNull();
      expect(state.constructorItems.ingredients).toHaveLength(1);
      expect(state.constructorItems.ingredients[0]).toMatchObject({
        ...mockFilling,
        id: expect.any(String)
      });
    });
  });

  describe('removeIngredient', () => {
    it('should remove a filling', () => {
      const stateWithFilling = constructorSlice.reducer(
        initialState,
        addIngredient(mockFilling)
      );
      const fillingId = stateWithFilling.constructorItems.ingredients[0].id;

      const action = removeIngredient({ ...mockFilling, id: fillingId });
      const state = constructorSlice.reducer(stateWithFilling, action);

      expect(state.constructorItems.ingredients).toHaveLength(0);
    });
  });

  describe('moveIngredient', () => {
    it('should move a filling down', () => {
      const filling1 = { ...mockFilling, _id: '2' };
      const filling2 = { ...mockFilling, _id: '3' };

      let state = constructorSlice.reducer(initialState, addIngredient(filling1));
      state = constructorSlice.reducer(state, addIngredient(filling2));

      const fillingId = state.constructorItems.ingredients[0].id;
      const action = moveDownIngredient({ ...filling1, id: fillingId });
      state = constructorSlice.reducer(state, action);

      expect(state.constructorItems.ingredients[0]._id).toBe(filling2._id);
      expect(state.constructorItems.ingredients[1]._id).toBe(filling1._id);
    });

    it('should move a filling up', () => {
      const filling1 = { ...mockFilling, _id: '2' };
      const filling2 = { ...mockFilling, _id: '3' };

      let state = constructorSlice.reducer(initialState, addIngredient(filling1));
      state = constructorSlice.reducer(state, addIngredient(filling2));

      const fillingId = state.constructorItems.ingredients[1].id;
      const action = moveUpIngredient({ ...filling2, id: fillingId });
      state = constructorSlice.reducer(state, action);

      expect(state.constructorItems.ingredients[0]._id).toBe(filling2._id);
      expect(state.constructorItems.ingredients[1]._id).toBe(filling1._id);
    });
  });
}); 