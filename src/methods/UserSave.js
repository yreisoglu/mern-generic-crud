import axios from 'axios';

const HTTP = axios.create({
    baseURL: "http://localhost:5000",
});

export const UserSave = async (body) => {
    await HTTP.post('/user/', body)
};

