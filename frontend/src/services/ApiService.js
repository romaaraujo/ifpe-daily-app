import axios from 'axios';

const ApiService = axios.create({
    baseURL: "http://localhost:55505"
});

export default ApiService;