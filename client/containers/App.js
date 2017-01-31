/**
 * Created by joseangelmr on 28/1/17.
 */
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routeConfig from './../../commons/routeConfig';

export default class App extends React.Component {

    render() {
        const { history, store } = this.props;
        if (!this.routeConfig) this.routeConfig = routeConfig;

        return (
            <Provider store={store}>
                <Router history={ history } routes={ routeConfig }></Router>
            </Provider>
        );
    }
}