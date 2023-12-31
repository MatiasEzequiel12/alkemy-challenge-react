import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom/';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');
const root = ReactDOMClient.createRoot (rootElement);

root.render(
    <BrowserRouter>  
      <App />
    </BrowserRouter>  ,

);
reportWebVitals();