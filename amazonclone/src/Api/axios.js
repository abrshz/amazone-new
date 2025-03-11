import axios from "axios"

const axiosInstance = axios.create({
    baseURL:"https://amazon-api-deploy-2-1xak.onrender.com"
})

export {axiosInstance}