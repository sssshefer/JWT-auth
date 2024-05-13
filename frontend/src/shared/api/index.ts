import axios, {AxiosInstance, InternalAxiosRequestConfig} from "axios";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/';

const $host:AxiosInstance = axios.create({
    withCredentials:true,
    baseURL: API_URL,
    headers:{
        Accept: 'application/json'
    }

})

const $authHost:AxiosInstance = axios.create({
    withCredentials:true,
    baseURL:API_URL
})

const authInterceptor = (config:InternalAxiosRequestConfig):InternalAxiosRequestConfig => {
    const accessToken = localStorage.getItem('accessToken');
    config.headers = config.headers ?? {}
    if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
}

$authHost.interceptors.request.use(authInterceptor)
$authHost.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${API_URL}updateTokens`, {withCredentials: true})
            localStorage.setItem('accessToken', response.data);
            return $authHost.request(originalRequest);
        } catch (e) {
            console.log('Unauthorized')
        }
    }
    throw error;
})
export {
    $host,
    $authHost
}