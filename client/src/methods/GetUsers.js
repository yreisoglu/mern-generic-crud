import axios from 'axios';

const HTTP = axios.create({
    baseURL: "https://mern-generic-crud.herokuapp.com",
});


export const GetUsers = async () => {
    return new Promise((resolve, reject) => {
        HTTP.get('/api/user', { headers: { 'x-access-token': localStorage.getItem("jwt") } })
            .then(response => {
                resolve(response.data);
            }).catch(error => reject(error))
    })

};

export const GetUserById = async (id) => {
    return new Promise((resolve, reject) => {
        HTTP.get('/api/user/get-user-by-id', { params: { "id": id }, headers: { 'x-access-token': localStorage.getItem("jwt") } })
            .then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            })
    })
}

export const UpdateUser = async (body) => {
    await HTTP.put('/api/user', body)
    .then(response => console.log(response))
    .catch(error => console.log(error));
};

export const DeleteUsersByIds = async (ids) => {
    let payload = {
        ids: ids,
        token: localStorage.getItem("jwt")
    }
    return new Promise((resolve, reject) => {
        HTTP.delete("/api/user/delete-multiple", { data: payload }).then(response => {
            resolve(response.data)
        }).catch(error => {
            reject(error)
        })
    })
}
