import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import i18n from './i18n';
// Components (styles)
import Global from './styles/global';
// Components (childs)
import Spinner from './components/Spinner';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Spinner />}>
      <Global />
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
