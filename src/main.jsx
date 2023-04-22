import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { articleApi } from './services/article.js';

const store = configureStore({
   reducer: {
      [articleApi.reducerPath]: articleApi.reducer
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware)
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
)

// Store is the global state of the app 
// Reducer is a slice or potion of our whole state
// Middleware is a piece of code that can modify the state
// Provider will wrap and service the app with a store 