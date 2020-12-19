import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'

import 'antd/dist/antd.css';
import { applyMiddleware, createStore } from 'redux';
// redux가 promise 객체와 function을 받기위해 promise와 thunk를 써준다
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk'
import Reducer from './_reducers'
const createStroreWithMiddleware = applyMiddleware(promiseMiddleware,ReduxThunk)(createStore)

// CREATE STORE 했으니까 REDUCER와 익스텐션을 넣어준다
ReactDOM.render(
  <Provider store={createStroreWithMiddleware(Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
