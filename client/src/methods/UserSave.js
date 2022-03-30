import axios from 'axios';

const HTTP = axios.create({
    baseURL: "http://127.0.0.1:5000",
});

export const UserSave = async (body) => {
    await HTTP.post('/user', body)
        .then(response => console.log(response))
        .catch(error => console.log(error));
};
