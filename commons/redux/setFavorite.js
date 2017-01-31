/**
 * Created by joseangelmr on 30/1/17.
 */
import { SET_FAVORITE } from './constants';
import update from 'react-addons-update';

export function setFavorite(user) {
    return {
        type: SET_FAVORITE,
        user
    }
}

export function reducer(state, action) {

    switch (action.type) {
        case SET_FAVORITE:
            return update(state, {
                favorites : {
                    $push : [action.user]
                }
            })

        default:
            return state;
    }
}