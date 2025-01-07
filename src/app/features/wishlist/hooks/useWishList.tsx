import { useState } from "react"
import { ClothAPI } from "../../../api/ClothApi";
import { ENDPOINT_WISHLIST } from "../../../../utils/Constants";

export type WishlistItem = {
    _id: string,
    title: string,
    description: string,
    price: string,
    size: string[],
    availableQuantity: number,
    availableColors:string[],
    categoryId:string,
    image:string
}

export default (): [
    (token: string | null) => void,
    WishlistItem[],
    string | undefined
] => {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([])
    const [error, setError] = useState<string | undefined>(undefined)
    const getWishlist = async (token: string | null) => {
        const api = ClothAPI(token!)
        try {
            setError(undefined);
            const response = await api.get(ENDPOINT_WISHLIST)
            if (response && response.data) {
                setWishlist(response.data.data);
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

    return [getWishlist, wishlist, error]

}