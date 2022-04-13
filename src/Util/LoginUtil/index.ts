const axios = require("axios");

export interface User {
    uuid: string
    username: string
}

const host = "http://localhost:3000";
const userEndpoint = "user";

const createUserOptions = (username: string, password: string) => {
    return {
        method: 'PUT',
        url: `${host}/${userEndpoint}`,
        params: {
            'username': username,
            'password': password,
        }
    }
};


export function createUser(username: string, password: string): Promise<User> {
    return axios.request(createUserOptions(username, password)).then(function (response: { data: { user: User } }) {
        return response.data
    }).catch(function (error: any) {
        console.error(error)
    })
}

