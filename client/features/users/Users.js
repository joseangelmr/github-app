/**
 * Created by joseangelmr on 28/1/17.
 */
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../commons/redux/actions';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { blue500, yellow600 } from 'material-ui/styles/colors';

export class Users extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){
        this.props.getUsers()
    }

    renderUsers() {

        if (this.props.users.length > 0) {
            return <List>

                {
                    this.props.users.map((user, i) => {

                        return (
                            <ListItem
                                leftAvatar={<Avatar src={ user.avatar_url } />}
                                primaryText={ user.login }
                            />
                        )
                    })
                }
                
            </List>
        }

        return ''

    }

    render() {

        const users = this.renderUsers()

        return (
            <div className="users-default-page">
                { users }
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        users: state.global.users,
        isLoading: state.global.isLoading
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getUsers: () => {
            dispatch(actions.getUsers())
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Users);

