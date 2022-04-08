import axios from 'axios';

const labURL = "http://172.28.226.108:5000"
const devURL = "https://mern-generic-crud.herokuapp.com"

const HTTP = axios.create({
    baseURL: labURL
});

export const UserSave = async (body) => {
    await HTTP.post('/api/user', body)
        .then(response => console.log(response))
        .catch(error => console.log(error));
};
