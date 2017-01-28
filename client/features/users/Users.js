/**
 * Created by joseangelmr on 28/1/17.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../commons/redux/actions';

export class Users extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="users-default-page">
                Component content: users/Users
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

