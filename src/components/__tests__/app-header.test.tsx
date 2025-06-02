import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { AppHeader } from '../app-header/app-header';
import { rootReducer } from '../../services/store';

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState
  });
};

describe('AppHeader', () => {
  const renderComponent = (userName: string | null = null) => {
    const initialState = {
      user: {
        user: userName ? { name: userName } : null
      }
    };
    const store = createMockStore(initialState);
    return render(
      <Provider store={store}>
        <BrowserRouter>
          <AppHeader />
        </BrowserRouter>
      </Provider>
    );
  };

  it('shows default text when user is not logged in', () => {
    renderComponent();
    expect(screen.getByText('Личный кабинет')).toBeInTheDocument();
  });

  it('shows user name when user is logged in', () => {
    renderComponent('John Doe');
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    renderComponent();
    expect(screen.getByText('Конструктор')).toBeInTheDocument();
    expect(screen.getByText('Лента заказов')).toBeInTheDocument();
  });
}); 