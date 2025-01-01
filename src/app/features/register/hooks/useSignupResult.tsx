import { useState } from "react";
import { ValidationResult } from "../../../../utils/ValidationResults.type";
import { ClothAPI } from "../../../api/ClothApi";
import { ENDPOINT_SIGNUP } from "../../../../utils/Constants";

interface SignUpResponse {
    message: string;
    status: string;
}

export default (): [
    (firstName: string, lastName: string, email: string, password: string, phoneNumber: string, gender: string) => void,
    string, // error message
    ValidationResult // result status
] => {
    const api = ClothAPI();
    const [result, setResult] = useState<ValidationResult>(ValidationResult.None);
    const [error, setError] = useState<string>('');

    const signUp = async (
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        phoneNumber: string,
        gender: string
    ) => {
        try {
            console.log("Hook Called!")
            setError('');
            const payload = { firstName, lastName, email, password, phoneNumber, gender };
            const response = await api.post<SignUpResponse>(ENDPOINT_SIGNUP, payload);
            if (response && response.data) {
                setResult(ValidationResult.Valid);
                console.log("Signup Successful, token:", response.data.message);
            } else {
                setResult(ValidationResult.InValid);
                setError("Invalid Data");
                console.log("Invalid Data!");
            }
        } catch (err: any) {
            if (err.response) {
                const errorCode = err.response.status;
                const errorData = err.response.data;

                console.log("Error Code:", errorCode);
                console.log("Error Message:", errorData.message || errorData.error || errorCode);
                if (errorData && errorData.message) {
                    setError(errorData.message);
                } else if (errorData && errorData.error) {
                    setError(errorData.error);
                } else {
                    setError(`Error Code: ${errorCode}`);
                }
            } else if (err.request) {
                console.log("No response received from server");
                setError("No response from server. Please try again later.");
            } else {
                console.log("Error Message:", err.message);
                setError(`Something went wrong: ${err.message}`);
            }
            setResult(ValidationResult.InValid);
        }
    };
    return [signUp, error, result];
};
