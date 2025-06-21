import axios from "axios"
import axiosInstance from "../configuration/axiosconfig"

export const getme = (token) => {
    return axiosInstance.get('/users/profile', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}