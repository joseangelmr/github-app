/**
 * Created by joseangelmr on 30/1/17.
 */
import { SEARCH_USERS, DATA_SEARCH_USERS_CHANGE } from './constants';
import { searchUsers as searchDataUsers } from '../../client/js/services/'
import update from 'react-addons-update';


export function receiveUsers(data) {
    return {
        type: DATA_SEARCH_USERS_CHANGE,
        data
    }
}

export function requestUsers() {
    return {
        type: SEARCH_USERS
    }
}

export function searchUsers(query) {
    
    return dispatch => {

        dispatch(requestUsers())

        searchDataUsers(query).then(response => {
            dispatch(receiveUsers(response))
        })
            .catch(error => {

            });
    }
}

export function reducer(state, action) {

    switch (action.type) {
        case DATA_SEARCH_USERS_CHANGE:
            return update(state, {
                filter: {
                    $set: action.data
                },
                isLoading : {
                    $set: false
                }
            })

        case SEARCH_USERS:
            return update(state, {
                isLoading : {
                    $set: true
                }
            })

        default:
            return state;
    }
}
