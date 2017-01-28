import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootClientReducer';
import devToolsEnhancer from 'remote-redux-devtools';
import * as actionCreators from './actionCreators.js';

const middlewares = [thunk];
let devToolsExtension = f => f;

if (process.env.NODE_ENV === 'dev') {
    const createLogger = require('redux-logger');

    const logger = createLogger({ collapsed: true });
    middlewares.push(logger);

    if (window.devToolsExtension) {
        devToolsExtension = window.devToolsExtension();
    }
}

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, compose(
        applyMiddleware(...middlewares),
        devToolsEnhancer({
            realtime: true, actionCreators
        })
    ));
    if (module.hot) {
        module.hot.accept('./rootClientReducer', () => {
            const nextRootReducer = require('./rootClientReducer').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
