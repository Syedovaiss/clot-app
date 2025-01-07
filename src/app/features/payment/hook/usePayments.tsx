import { useState } from "react"
import { ClothAPI } from "../../../api/ClothApi";
import { ENDPOINT_ALL_PAYMENT_METHODS } from "../../../../utils/Constants";

export type PaymentMethods = {
    _id: string,
    cardNumber: string,
    expiry: string,
    cardHolderName: string,
    cardType: string
}

export default (): [
    (token: string | null) => void,
    PaymentMethods[],
    string | undefined
] => {
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethods[]>([])
    const [error, setError] = useState<string | undefined>(undefined)
    const getPaymentMethods = async (token: string | null) => {
        const api = ClothAPI(token!)
        try {
            setError(undefined);
            const response = await api.get(ENDPOINT_ALL_PAYMENT_METHODS)
            if (response && response.data) {
                setPaymentMethods(response.data.data);
            } else {
                setError("Failed to get categories.");
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

    return [getPaymentMethods, paymentMethods, error]

}