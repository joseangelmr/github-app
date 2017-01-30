import initialState from './initialState';

import { reducer as usersReducer } from './getUsers'
import { reducer as searchReducer } from './searchUsers'
import { reducer as setFavoriteReducer } from './setFavorite'
import { reducer as removeFavoriteReducer } from './removeFavorite'




const reducers = [
    usersReducer,
    searchReducer,
    setFavoriteReducer,
    removeFavoriteReducer
];

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        default:
            newState = state;
            break;
    }
    return reducers.reduce((s, r) => r(s, action), newState);
}
