import { useState } from "react"
import { ClothAPI } from "../../../api/ClothApi"
import { ENDPOINT_DECREMENT_CART_ITEM } from "../../../../utils/Constants"
import { CartResponse } from "./useCartItems"

export default (): [
    (token: string | null,productId: string) => void,
    CartResponse | null,
    string | undefined
] => {
    const [items, setItemsResponse] = useState<CartResponse | null>(null)
    const [error, setError] = useState<string | undefined>(undefined)
    const decrementItems = async (token: string | null, productId: string) => {
        const api = ClothAPI(token!)
        try {
            setError(undefined);
            const response = await api.get(`${ENDPOINT_DECREMENT_CART_ITEM}?productId=${productId}`)
            if (response && response.data) {
                const formattedResponse: CartResponse = {
                    products: response.data.data.products,
                    amount: response.data.data.amount
                }
                setItemsResponse(formattedResponse);
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

    return [decrementItems, items, error]

}