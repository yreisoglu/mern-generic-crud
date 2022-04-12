const axios = require("axios")
const labURL = "http://47.168.155.32:5000"
const devURL = "https://mern-generic-crud.herokuapp.com"

const HTTP = axios.create({
    baseURL: labURL
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