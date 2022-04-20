import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import * as serviceWprker from './ser'
import { Provider} from 'react-redux';
import 'antd/dist/antd.css'
import { applyMiddleware , createStore} from "redux";
import promiseMiddleware from 'redux-promise'
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducer'

import reportWebVitals from './reportWebVitals';
// import Hello from "./Hello";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(Reducer,
      window.__REDUX_DEVTOOLS_EXTENTION__ && window.__REDUX_DEVTOOLS_EXTENTION__()
      )} >
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
