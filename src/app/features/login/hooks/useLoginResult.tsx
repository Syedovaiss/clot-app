import { useState } from "react";
import { ClothAPI } from "../../../api/ClothApi";
import { ENDPOINT_LOGIN } from "../../../../utils/Constants";

export default (): [
    (email: string, password: string) => void,
    string | null,
    string | null
] => {
    const api = ClothAPI()
    const [result, setResult] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const login = async (email: string, password: string) => {
        try {
            const LoginData = {
                email,
                password
            }
            await api.post(ENDPOINT_LOGIN, LoginData).then((response) => {
                if (response && response.data && response.data.accessToken) {
                    setResult(response.data.accessToken);
                    console.log("Login Successful, token:", response.data.accessToken);
                } else {
                    setErrorMessage("Invalid Creds!")
                    console.log("Invalid Creds!")
                }
            }).catch(error => {
                if (error.response) {
                    const errorCode = error.response.status;
                    const errorData = error.response.data;
                    console.log("Error Code:", errorCode);
                    console.log("Error Message:", errorData.message);
                    if (errorData && errorData.message) {
                        setErrorMessage(errorData.message);
                    } else {
                        setErrorMessage(`Error: ${errorCode}`);
                        console.log(`Error: ${errorCode}`);
                    }
                } else if (error.request) {
                    console.log("No response received from server");
                    setErrorMessage("No response from server. Please try again later.");
                } else {
                    console.log("Error Message:", error.message);
                    setErrorMessage(`Something went wrong: ${error.message}`);
                }
            })
           
        } catch (error: any) {
            setErrorMessage(error)
        }
    }
    return [login, result, errorMessage]
}