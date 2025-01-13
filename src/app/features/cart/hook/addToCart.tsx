import { useState } from "react"
import { ClothAPI } from "../../../api/ClothApi"
import { ENDPOINT_ADD_TO_CART } from "../../../../utils/Constants"

export type CartItem = {
    productId?: string,
    quantity: number,
    size: string,
    color: string
}
export default (): [
    (token: string | null,request: CartItem[]) => void,
    string | undefined | null,
    string | undefined
] => {
    const [cart, setCartResponse] = useState<string | undefined | null>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)
    const addToCart = async (token: string | null, request: CartItem[]) => {
        const api = ClothAPI(token!)
        try {
            setError(undefined);
            const response = await api.post(ENDPOINT_ADD_TO_CART,request)
            if (response && response.data) {
                setCartResponse(response.data);
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

    return [addToCart, cart, error]

}