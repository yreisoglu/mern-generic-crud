import axios from 'axios';

const HTTP = axios.create({
    baseURL: "http://127.0.0.1:5000",
});


export const GetUsers = async () => {
    return new Promise((resolve, reject) => {
        HTTP.get('/user', { headers: { 'usersSecretKey': "asd" } })
            .then(response => {
                resolve(response.data);
            }).catch(error => reject(error))
    })

};

export const GetUserById = async (id) => {
    return new Promise((resolve, reject) => {
        HTTP.get('/user/get-user-by-id', { params: { "id": id }, headers: { 'usersSecretKey': "asd" } })
            .then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
    })
}

export const DeleteUserById = async (id) => {
    return new Promise((resolve, reject) => {
        HTTP.delete('/user', { headers: { 'usersSecretKey': "asd" } }, { "_id": id })
            .then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
    })
}
