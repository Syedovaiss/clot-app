import { useState } from "react";
import { ValidationResult } from "../../../../utils/ValidationResults.type";
import { ClothAPI } from "../../../api/ClothApi";
import { ENDPOINT_ABOUT_YOURSELF } from "../../../../utils/Constants";

export default (): [
    (shopFor: string, ageRange: string, token: string) => void,
    errorMessage: string,
    success: boolean | undefined
] => {
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [result, setResult] = useState<boolean | undefined>(undefined)
    const execute = async (shopFor: string, ageRange: string, token: string) => {
        const api = ClothAPI(token)
        await api.post(ENDPOINT_ABOUT_YOURSELF, {
            age: ageRange,
            interestedIn: shopFor
        }).then((response) => {
            if (response && response.data) {
                setResult(true)
            } else {
                setResult(false)
                setErrorMessage("Something went wrong!")
                console.log("Something went wrong!")
            }
        }).catch(error => {
            setResult(false)
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
    }

    return [execute, errorMessage, result]
}