import axios from 'axios'

const HTTP = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

export const GetAvailableForms = () => {
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
export const PostCreateForms = (body) => {
    return new Promise(() => {
        HTTP.post('/api/dynamic/create-form', body)
            .then((response) => console.log(response))
            .catch((error) => console.log(error))
    })
}
