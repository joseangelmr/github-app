import initialState from './initialState';

import { reducer as usersReducer } from './getUsers'
import { reducer as searchReducer } from './searchUsers'


const reducers = [
    usersReducer,
    searchReducer
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
