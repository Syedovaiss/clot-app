import { useState } from "react";
import { ClothAPI } from "../../../api/ClothApi";
import { ENDPOINT_CART } from "../../../../utils/Constants";
import { Product } from "../../home/ui/Product";

export type CartResponse = {
    products: {
        product: Product;  // The product details
        quantity: number;  // The quantity of the product in the cart
    }[];
    amount: {
        subTotal: number;
        shippingFee: number;
        total: number;
        tax: number;
    };
};

export default (): [
    (token: string | null) => void,
    CartResponse | null,
    string | undefined
] => {
    const [cart, setCartResponse] = useState<CartResponse | null>(null);
    const [error, setError] = useState<string | undefined>(undefined);

    const addToCart = async (token: string | null) => {
        if (!token) {
            setError("Token is required to access cart data.");
            return;
        }

        const api = ClothAPI(token);

        try {
            setError(undefined); 
            const response = await api.get(ENDPOINT_CART);

            if (response && response?.data) {
                const formattedResponse: CartResponse = {
                    products: response.data.data.products,
                    amount: response.data.data.amount
                }
                
                setCartResponse(formattedResponse);
            } else {
                setError("Failed to get cart. Data format is incorrect.");
            }
        } catch (error: any) {
            // Error handling improvements
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

    return [addToCart, cart, error];
};
