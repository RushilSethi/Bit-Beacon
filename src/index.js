import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import store from "./app/store";
// import 'antd/dist/antd.css';

//to stop the findDOMNode warning from stacking the console
if (process.env.NODE_ENV === 'development') {
    const originalConsoleError = console.error.bind(console);
    console.error = (error, ...args) => {
      if (error?.toString().includes('Warning: findDOMNode is deprecated')) {
        return;
      }
      originalConsoleError(error, ...args);
    };
  }

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider> 
    </Router>
);
