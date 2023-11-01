import axios from 'axios';

const api = axios.create({  
    baseURL: 'http://127.0.0.1:4010',
    timeout: 2000,
    headers: { 
        'token': '975a3c9e-0220-11ec-9a03-0242ac130003',
        'Content-type': 'application/json, application/xml'
    },
});

export default api;