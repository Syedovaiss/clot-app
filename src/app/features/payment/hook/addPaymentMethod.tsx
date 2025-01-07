import { useState } from "react"
import { ClothAPI } from "../../../api/ClothApi";
import { ENDPOINT_ADD_PAYMENT_METHODS } from "../../../../utils/Constants";
import { ApiResult } from "../../../../utils/APIResult";

export default (): [
    (cardHolderName: string, cardNumber: string, expiry: string, cvv: string, token?: string | null) => void,
    ApiResult,
    string | undefined
] => {
    const [result, setResult] = useState<ApiResult>(ApiResult.None)
    const [error, setError] = useState<string | undefined>(undefined)
    const addNewPaymentMethod = async (cardHolderName: string, cardNumber: string, expiry: string, cvv: string, token?: string | null) => {
        const api = ClothAPI(token!)
        try {
            setError(undefined);
            const response = await api.post(
                ENDPOINT_ADD_PAYMENT_METHODS,
                {
                    cardHolderName: cardHolderName,
                    cardNumber: cardNumber,
                    expiry:expiry,
                    cvv:cvv
                }
            )
            if (response && response.data) {
                setResult(ApiResult.Success);
            } else {
                setError("Failed to get categories.");
                setResult(ApiResult.Failure);
            }
        } catch (error: any) {
            if (error.response) {
                const errorCode = error.response.status;
                const errorData = error.response.data;
                console.log("Error Code:", errorCode);
                console.log("Error Message:", errorData.message);
                setError(errorData.message || `Error: ${errorCode}`);
            } else if (error.request) {
                console.log("No response received from server");
                setError("No response from server. Please try again later.");
            } else {
                console.log("Error Message:", error.message);
                setError(`Something went wrong: ${error.message}`);
            }
        }
    };

    return [addNewPaymentMethod, result, error]
}