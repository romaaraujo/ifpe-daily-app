import axios from 'axios';

const ApiService = axios.create({
    baseURL: "https://gorest.co.in/public/v2/"
});

export default ApiService;