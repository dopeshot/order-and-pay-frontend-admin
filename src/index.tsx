import { library } from "@fortawesome/fontawesome-svg-core";
import { faAddressBook, faCheck, faCheckDouble, faHamburger, faPizzaSlice, faUser } from "@fortawesome/free-solid-svg-icons";
import { createOvermind } from 'overmind';
import { Provider } from 'overmind-react';
import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import { App } from './components/App/App';
import './index.css';
import { config } from './overmind';
import reportWebVitals from './reportWebVitals';

// We have to predefine all icons we are using from api (they must be loaded here)
library.add(faUser, faAddressBook, faCheck, faCheckDouble, faHamburger, faPizzaSlice)

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
