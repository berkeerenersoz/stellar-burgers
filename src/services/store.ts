import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './slices/userSlice/userSlice';
import { orderSlice } from './slices/orderSlice/orderSlice';
import { feedSlice } from './slices/feedSlice/feedSlice';
import { ingredientsSlice } from './slices/ingredientsSlice/ingredientsSlice';
import { constructorSlice } from './slices/constructorSlice/constructorSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [constructorSlice.name]: constructorSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
