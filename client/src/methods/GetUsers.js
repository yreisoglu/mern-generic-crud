import axios from 'axios';

const HTTP = axios.create({
    baseURL: "http://127.0.0.1:5000",
});


export const GetUsers = async () => {
    return new Promise((resolve, reject) => {
        HTTP.get('/user', { headers: { 'x-access-token': localStorage.getItem("jwt") } })
            .then(response => {
                resolve(response.data);
            }).catch(error => reject(error))
    })

};

export const GetUserById = async (id) => {
    return new Promise((resolve, reject) => {
        HTTP.get('/user/get-user-by-id', { params: { "id": id }, headers: { 'x-access-token': localStorage.getItem("jwt") } })
            .then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
    })
}

export const DeleteUsersByIds = async (ids) => {
    let payload = {
        ids: ids,
        token: localStorage.getItem("jwt")
    }
    return new Promise((resolve, reject) => {
        HTTP.delete("/user/delete-multiple", { data: payload }).then(response => {
            resolve(response.data)
        }).catch(error => {
            reject(error)
        })
    })
}
