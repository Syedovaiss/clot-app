import { useState } from "react"
import { ClothAPI } from "../../../api/ClothApi"
import { ENDPOINT_PLACE_ORDER } from "../../../../utils/Constants"

export type PlaceOrderRequest = {
    addressId: string,
    paymentId: string,
    cartItems: {},
    amount: {}
}
export default (): [
    (token: string | null,request: PlaceOrderRequest) => void,
    string | undefined | null,
    string | undefined
] => {
    const [order, setOrderResponse] = useState<string | undefined | null>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)
    const placeOrder = async (token: string | null, request: PlaceOrderRequest) => {
        const api = ClothAPI(token!)
        try {
            setError(undefined);
            const response = await api.post(ENDPOINT_PLACE_ORDER,request)
            if (response && response.data) {
                setOrderResponse(response.data);
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

    return [placeOrder, order, error]

}