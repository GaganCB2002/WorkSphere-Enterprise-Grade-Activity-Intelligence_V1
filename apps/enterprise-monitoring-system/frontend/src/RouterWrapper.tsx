import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// @ts-ignore
import store from './app/store';

export const RouterWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <HashRouter>{children}</HashRouter>
    </Provider>
  );
};
