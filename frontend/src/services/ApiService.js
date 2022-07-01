import axios from 'axios';

const ApiService = axios.create({
    baseURL: "http://187.87.138.176:55505"
});

export default ApiService;