/**
 * Created by joseangelmr on 28/1/17.
 */
import React, { Component, PropTypes } from 'react';

export default class Layout extends React.Component {
    render() {
        return (
            <div>
                <h4>Layout</h4>
                { this.props.children }
            </div>
        );
    }
}