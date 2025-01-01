
import axios from "axios";
import Config from "react-native-config";

export const ClothAPI = (token?: string) => {
    console.log("BASE_URL =>",Config.BASE_URL)
    const instance = axios.create({
        baseURL: Config.BASE_URL,
        headers: {
            Authorization: token ? `Bearer ${token}` : null,
            "Content-Type": "application/json",
        },
        timeout: 10000,
    });

    // Add request interceptor
    instance.interceptors.request.use(
        (config) => {
            console.log("Request Interceptor - Config:", config);
            // Modify the request if needed
            return config;
        },
        (error) => {
            console.log("Request Interceptor - Error:", error);
            // Handle request error
            return Promise.reject(error);
        }
    );

    // Add response interceptor
    instance.interceptors.response.use(
        (response) => {
            console.log("Response Interceptor - Response:", response);
            // Return the response data directly
            return response;
        },
        (error) => {
            console.log("Response Interceptor - Error:", error);
            if (error.response) {
                // Server responded with a status outside 2xx
                console.log("Error Response Data:", error.response.data);
                console.log("Error Response Status:", error.response.status);
            } else if (error.request) {
                // No response received
                console.log("No Response:", error.request);
            } else {
                // Something else happened
                console.log("Error Message:", error.message);
            }
            return Promise.reject(error);
        }
    );

    return instance;
};
