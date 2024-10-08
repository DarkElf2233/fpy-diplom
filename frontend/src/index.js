// React
import React from 'react';
import ReactDOM from 'react-dom/client';
// React Router
import { BrowserRouter } from 'react-router-dom';
// React Redux
import store from './app/store'
import { Provider } from 'react-redux'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

// Font Awesome icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
