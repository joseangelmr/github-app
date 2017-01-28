import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configStore from './../commons/configureStore';
import App from './containers/App'

require('style!css!sass!applicationStyles')

const store = configStore();
const history = syncHistoryWithStore(hashHistory, store);

render(
    <App store={ store } history={ history } />,
    document.getElementById('app')
);