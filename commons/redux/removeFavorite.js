/**
 * Created by joseangelmr on 30/1/17.
 */
import { REMOVE_FAVORITE } from './constants';
import update from 'react-addons-update';
import _ from 'lodash'

export function removeFavorite(user, index) {
    return {
        type: REMOVE_FAVORITE,
        user,
        index
    }
}

export function reducer(state, action) {

    switch (action.type) {
        case REMOVE_FAVORITE:

            const _update = _.remove(state.favorites, function(user, i) {
                return user.login != action.user.login;
            });

            return update(state, {
                favorites : {
                    $set : _update
                }
            })

        default:
            return state;
    }
}