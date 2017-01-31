/**
 * Created by joseangelmr on 28/1/17.
 */
import { GET_USERS, DATA_USERS_CHANGE } from './constants';
import { getUsers as getDataUsers } from '../../client/js/services/'
import update from 'react-addons-update';
import _ from 'lodash'


export function receiveUsers(data, since) {
    return {
        type: DATA_USERS_CHANGE,
        data,
        since
    }
}

export function requestUsers(last_since) {
    return {
        type: GET_USERS,
        last_since
    }
}

export function getUsers(since) {
    
    return dispatch => {

        dispatch(requestUsers(since))

        getDataUsers(since).then(response => {
            const last = _.last(response)
            dispatch(receiveUsers(response, last.id ))
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
                },
                since : {
                    $set: action.since
                }
            })

        case GET_USERS:
            return update(state, {
                isLoading : {
                    $set: true
                },
                last_since : {
                    $set : action.last_since
                }
            })

        default:
            return state;
    }
}