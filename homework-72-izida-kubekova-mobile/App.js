import React from 'react';
import { Provider } from 'react-redux';
import DishesPage from './containers/DishesPage';
import { store } from './store/store';

export default function App() {
  return (
    <Provider store={store}>
      <DishesPage />      
    </Provider>

  );
};
