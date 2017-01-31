/**
 * Created by joseangelmr on 28/1/17.
 */
import React, {Component, PropTypes} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {SelectField, RaisedButton, AppBar, MenuItem, FontIcon} from 'material-ui/';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';


export default class Layout extends React.Component {
    render() {

        const location = window.location.hash

        return (
            <MuiThemeProvider muiTheme={ getMuiTheme(darkBaseTheme) }>
                <div>
                    <AppBar title="Github App" showMenuIconButton={ false }
                            iconElementRight={
                                location != "#/users/" ? <FlatButton label="All" href="/#/users/"/> :
                                <FlatButton label="Search" href="/#/"/>
                            }/>

                    { this.props.children }

                </div>

            </MuiThemeProvider>
        );
    }
}