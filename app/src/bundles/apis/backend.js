// The globally accessible api to be used to make requests to backend server

import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8000',
});
