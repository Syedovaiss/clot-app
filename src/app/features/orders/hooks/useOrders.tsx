import { useState } from "react";
import { ClothAPI } from "../../../api/ClothApi";
import { ENDPOINT_ORDERS } from "../../../../utils/Constants";
interface CartItem {
    productId: string;
    quantity: number;
    size: string;
    color: string;
    _id: string;
  }
  
  interface Pricing {
    subTotal: number;
    total: number;
    shipping: number;
    tax: number;
    _id: string;
  }
  
  interface PaymentInfo {
    cardNumber: string;
    cardType: string;
    cardHolderName: string;
  }
  
  interface Order {
    _id: string;
    userId: string;
    cartItems: CartItem[];
    pricing: Pricing;
    addressId: string;
    paymentId: string;
    __v: number;
  }
  
  interface OrderResponse {
    data: Order[];
    shippingAddress: string;
    paymentInfo: PaymentInfo;
  }
  
export default (): [
    (token: string | null) => void,
    OrderResponse | null,
    string | undefined
] => {
    const [orders, setOrderResponse] = useState<OrderResponse | null>(null);
    const [error, setError] = useState<string | undefined>(undefined);

    const getOrders = async (token: string | null) => {
        if (!token) {
            setError("Token is required to access order data.");
            return;
        }

        const api = ClothAPI(token);

        try {
            setError(undefined); 
            const response = await api.get(ENDPOINT_ORDERS);

            if (response && response?.data) {
                setOrderResponse(response.data);
            } else {
                setError("Failed to get order!");
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

    return [getOrders, orders, error];
};
