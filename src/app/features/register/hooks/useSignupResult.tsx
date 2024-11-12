import { useState } from "react"
import { ValidationResult } from "../../../../utils/ValidationResults.type"
import { ClothAPI } from "../../../api/ClothApi";
import { ENDPOINT_SIGNUP } from "../../../../utils/Constants";

export default (): [
    (firstName: string, lastName: string, email: string, password: string, phoneNumber: string, gender: string) => void,
    error: string,
    result: ValidationResult
] => {

    const [result, setResult] = useState<ValidationResult>(ValidationResult.None)
    const [error, setError] = useState<string>('')

    const signUp = async (firstName: string, lastName: string, email: string, password: string, phoneNumber: string, gender: string) => {

        try {
            const payload = {
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
                gender
            }
            const response = await ClothAPI().post(
                ENDPOINT_SIGNUP,
                payload
            )
            if (response && response.data) {
                setResult(response.data.message);
                console.log("Signup Successful, token:", response.data);
            } else {
                setError("Invalid Data")
                console.log("Invalid Data!")
            }
        } catch (error: any) {
            if (error.response) {
                const errorCode = error.response.status;
                const errorData = error.response.data;
                console.log("Error Code:", errorCode);
                console.log("Error Message:", errorData.message);
                if (errorData && errorData.message) {
                    setError(errorData.message);
                } else {
                    setError(`Error: ${errorCode}`);
                    console.log(`Error: ${errorCode}`);
                }
            } else if (error.request) {
                console.log("No response received from server");
                setError("No response from server. Please try again later.");
            } else {
                console.log("Error Message:", error.message);
                setError(`Something went wrong: ${error.message}`);
            }
        }

    }
    return [signUp, error, result]
}