/**
 * Created by joseangelmr on 30/1/17.
 */
import { REMOVE_FAVORITE } from './constants';
import update from 'react-addons-update';

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

            return update(state, {
                favorites : {
                    [action.user.login] : {
                        $set : null
                    }
                }
            })

        default:
            return state;
    }
}