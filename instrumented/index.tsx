import { createOvermind } from 'overmind';
import { Provider } from 'overmind-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App/App';
import { config } from './overmind';
import reportWebVitals from './reportWebVitals';
import './index.css';
import WebFont from 'webfontloader';

const WebFontConfig = {
  typekit: {
    id: 'azv0mmk',
    api: 'https://use.typekit.net/'
  }
}

WebFont.load(WebFontConfig);

const overmind = createOvermind(config, {
  devtools: true
})

ReactDOM.render(
  <React.StrictMode>
    <Provider value={overmind}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
