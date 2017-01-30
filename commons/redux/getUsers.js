/**
 * Created by joseangelmr on 28/1/17.
 */
import { GET_USERS, DATA_USERS_CHANGE } from './constants';
import { getUsers as getDataUsers } from '../../client/js/services/'
import update from 'react-addons-update';


export function receiveUsers(data) {
    return {
        type: DATA_USERS_CHANGE,
        data
    }
}

export function requestUsers() {
    return {
        type: GET_USERS
    }
}

export function getUsers() {
    return dispatch => {

        dispatch(requestUsers())

        getDataUsers().then(response => {
            dispatch(receiveUsers(response))
        })
            .catch(error => {

            });
    }
}

export function reducer(state, action) {

    switch (action.type) {
        case DATA_USERS_CHANGE:
            return update(state, {
                users: {
                    $set: action.data
                },
                isLoading : {
                    $set: false
                }
            })

        case GET_USERS:
            return update(state, {
                isLoading : {
                    $set: true
                }
            })

        default:
            return state;
    }
}