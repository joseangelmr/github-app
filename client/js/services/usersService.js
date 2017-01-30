/**
 * Created by joseangelmr on 28/1/17.
 */
import got from 'got';
import { USERS_URL, SEARCH_USERS_URL } from './constants'

export function getUsers() {
    return new Promise(
        function (resolve, reject) {

            got.post(USERS_URL)
                .then(response => {
                    return resolve(JSON.parse(response.body));
                })
                .catch(error => {
                    return reject(error);
                });
        })
}

export function searchUsers(query){
    return new Promise(
        function (resolve, reject) {
            got.get(SEARCH_USERS_URL, {
                query : {
                    q : query
                }
            })
                .then(response => {
                    return resolve(JSON.parse(response.body));
                })
                .catch(error => {
                    return reject(error);
                });
        })
}