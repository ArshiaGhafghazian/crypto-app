import axios from "axios"

export const API_KEY = "x_cg_demo_api_key=CG-ZyWD5vW2foiYE8WTsw4zHCqz"

const api = axios.create({
    baseURL: "https://api.coingecko.com/api/v3/",
})

export default api 
