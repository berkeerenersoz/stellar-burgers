// Mock useNavigate from react-router-dom BEFORE importing the component
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: jest.fn(),
  };
});

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { rootReducer } from '../../services/store';

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState
  });
};

describe('BurgerConstructor', () => {
  const mockInitialState = {
    constructor: {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: null
    },
    user: {
      user: null
    }
  };

  const renderComponent = (initialState = mockInitialState) => {
    const store = createMockStore(initialState);
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <BurgerConstructor />
        </BrowserRouter>
      </Provider>
    );
  };

  it('renders without crashing', () => {
    const { container } = renderComponent();
    expect(container.querySelector('[data-cy="burgerConstructor"]')).toBeInTheDocument();
  });
}); 