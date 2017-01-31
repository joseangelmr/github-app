/**
 * Created by joseangelmr on 28/1/17.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../commons/redux/actions';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {blue500, yellow600} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';
import NoFavoriteIcon from 'material-ui/svg-icons/action/favorite-border';
import _ from 'lodash';

export class Users extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showAll: true
        }

    }

    componentWillMount() {
        this.props.getUsers(this.props.since != 0 ? 0 : this.props.since)
    }


    isFav(login) {

        const fav = _.find(this.props.favorites, {'login': login});

        if (fav)
            return true
        else
            return false
    }

    renderUsers() {


        const users = this.state.showAll ? this.props.users : this.props.favorites


        if (users.length > 0) {
            return <List>

                {
                    users.map((user, i) => {

                        this.isFav(user.login)

                        return (
                            <ListItem
                                key = { i }
                                leftAvatar={<Avatar src={ user.avatar_url } />}
                                primaryText={ user.login }
                                rightIcon={
                                           this.isFav(user.login) ? <FavoriteIcon onClick={ () => { this.props.removeFavorite(user, i) }}/> :
                                           <NoFavoriteIcon onClick={ () => { this.props.setFavorite(user) }}/>
                                        }
                            />
                        )
                    })
                }

            </List>
        }

        return ''

    }

    renderPagination() {

        if (this.state.showAll) {
            return (
                <div className="row">
                    <div className="col-xs pull-right">
                        <RaisedButton label="Next" primary={ true }
                                      onClick={ () => {  this.props.getUsers(this.props.since) }}/>
                    </div>
                </div>
            )
        }
    }

    render() {

        const users = this.renderUsers()
        const pagination = this.renderPagination()

        return (
            <div className="users-default-page">

                <div className="row">
                    <div className="col-xs-6 col-sm-3 col-md-3 col-lg-2">
                        <FlatButton label="All Accounts" primary={ this.state.showAll }
                                    onClick={ () => { this.setState({showAll:true}) }}/>
                    </div>
                    <div className="col-xs-6 col-sm-3 col-md-3 col-lg-2">
                        <FlatButton label="Favorites" primary={ !this.state.showAll }
                                    onClick={ () => { this.setState({showAll:false}) }}/>
                    </div>
                </div>

                <div className="row">
                    { users }
                </div>

                { pagination }

            </div>
        );
    }
}


function mapStateToProps(state) {


    return {
        users: state.global.users,
        isLoading: state.global.isLoading,
        favorites: state.global.favorites,
        since : state.global.since
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getUsers: (since) => {
            dispatch(actions.getUsers(since))
        },
        setFavorite: (user) => {
            dispatch(actions.setFavorite(user))
        },
        removeFavorite: (user) => {
            dispatch(actions.removeFavorite(user))
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Users);

