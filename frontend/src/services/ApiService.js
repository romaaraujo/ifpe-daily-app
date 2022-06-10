import axios from 'axios';

const ApiService = axios.create({
    baseURL: "http://localhost:8080"
});

export default ApiService;