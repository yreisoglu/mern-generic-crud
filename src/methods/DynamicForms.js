import axios from 'axios'

const HTTP = axios.create({
    baseURL: 'https://mern-generic-crud.herokuapp.com',
})
const GetAvailableForms = () => {
    return new Promise((resolve, reject) => {
        HTTP.get('api/dynamic/get-forms')
            .then((res) => {
                resolve(res.data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

export default GetAvailableForms
