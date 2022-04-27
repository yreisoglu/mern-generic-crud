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
export const DeleteFormsByIds = (ids) => {
    const payload = {
        form_ids: ids,
        token: localStorage.getItem('jwt'),
    }
    return new Promise((resolve, reject) => {
        HTTP.delete('/api/dynamic/delete-forms', { data: payload })
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
