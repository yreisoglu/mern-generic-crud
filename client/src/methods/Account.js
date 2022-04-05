const axios = require("axios")
const HTTP = axios.create({
    baseURL: "https://mern-generic-crud.herokuapp.com",
});


export const Login = (username, password) => {
    return new Promise((resolve, reject) => {
        HTTP.post("/api/account/login", { username: username, password: password })
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}


export const isExpired = () => {
    return new Promise((resolve, reject) => {
        HTTP.post("/api/account/is-expired", { token: localStorage.getItem("jwt") })
            .then(res => resolve(res.data))
            .catch(err => console.log(err))
    })
}