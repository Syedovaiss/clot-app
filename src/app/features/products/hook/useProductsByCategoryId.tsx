

import { useState } from "react"
import { ClothAPI } from "../../../api/ClothApi"
import {ENDPOINT_PRODUCTS_BY_CATEGORY, ENDPOINT_TOP_SELLING } from "../../../../utils/Constants"

export default (): [
    (categoryId:string) => void,
    any[],
    string | null
] => {
    const api = ClothAPI()
    const [products, setProducts] = useState<any[]>([])
    const [error, setError] = useState<string | null>(null)
    const getProducts = async (categoryId:string) => {
        try {
            setError(null)
            await api.get(`${ENDPOINT_PRODUCTS_BY_CATEGORY}?categoryId=${categoryId}`)
                .then(response => {
                    if (response && response.data) {
                        setProducts(response.data.data)
                    } else {
                        setError("Failed to get top selling products!")
                    }
                })
                .catch(error => {
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
                })
        } catch (error: any) {
            setError(error)
        }

    }
    return [getProducts, products, error] as const

}