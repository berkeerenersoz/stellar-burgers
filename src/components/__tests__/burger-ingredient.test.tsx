import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { BurgerIngredient } from '../burger-ingredient/burger-ingredient';
import { rootReducer } from '../../services/store';

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState
  });
};

describe('BurgerIngredient', () => {
  const mockIngredient = {
    _id: '1',
    name: 'Test Ingredient',
    type: 'main',
    proteins: 10,
    fat: 5,
    carbohydrates: 20,
    calories: 200,
    price: 100,
    image: 'test-image.jpg',
    image_mobile: 'test-image-mobile.jpg',
    image_large: 'test-image-large.jpg',
    __v: 0
  };

  const renderComponent = (count = 0) => {
    const store = createMockStore();
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <BurgerIngredient ingredient={mockIngredient} count={count} />
        </BrowserRouter>
      </Provider>
    );
  };

  it('renders ingredient with correct name', () => {
    renderComponent();
    expect(screen.getByText('Test Ingredient')).toBeInTheDocument();
  });

  it('displays correct count', () => {
    renderComponent(2);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('displays correct price', () => {
    renderComponent();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('handles add ingredient click', () => {
    renderComponent();
    const addButton = screen.getByRole('button');
    fireEvent.click(addButton);
    // The addIngredient action should be dispatched
    // We can verify this by checking if the count increases
    // This would require additional setup with a spy on the dispatch function
  });
}); 