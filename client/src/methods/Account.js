const axios = require("axios")
const jwt = require("jsonwebtoken")
const HTTP = axios.create({
    baseURL: "http://127.0.0.1:5000",
});


export const Login = (username, password) => {
    return new Promise((resolve, reject) => {
        HTTP.post("/account/login", { username: username, password: password })
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}


export const isExpired = () => {
    return new Promise((resolve, reject) => {
        HTTP.post("/account/is-expired", { token: localStorage.getItem("jwt") })
            .then(res => resolve(res.data))
            .catch(err => console.log(err))
    })
}