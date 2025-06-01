import { rootReducer } from '../../services/store';

describe('rootReducer', () => {
  it('should return initial state', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    
    expect(initialState).toEqual({
      ingredients: {
        ingredients: [],
        isLoading: false,
        error: null
      },
      constructr: {
        constructorItems: {
          bun: null,
          ingredients: []
        },
        orderModalData: null,
        orderRequest: false,
        error: null
      },
      feed: {
        feeds: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: null,
        orderModalData: []
      },
      order: {
        name: null,
        profileOrders: [],
        isLoading: false,
        error: null
      },
      user: {
        user: null,
        isAuthorized: false,
        error: null
      }
    });
  });
}); 