import axios from 'axios'

const API_REQUEST = process.env.REACT_APP_BACKEND_URL
const axiosClient = axios.create({
    baseURL: API_REQUEST
})

export default axiosClient;