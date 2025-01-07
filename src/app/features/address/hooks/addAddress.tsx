import { useState } from "react"
import { ClothAPI } from "../../../api/ClothApi";
import { ENDPOINT_ADD_ADDRESSES } from "../../../../utils/Constants";
import { ApiResult } from "../../../../utils/APIResult";

export default (): [
    (address: string, addressType: string, token?: string | null) => void,
    ApiResult,
    string | undefined
] => {
    const [result, setRsult] = useState<ApiResult>(ApiResult.None)
    const [error, setError] = useState<string | undefined>(undefined)
    const addNewAddress = async (address: string, addressType: string, token?: string | null) => {
        const api = ClothAPI(token!)
        try {
            setError(undefined);
            const response = await api.post(
                ENDPOINT_ADD_ADDRESSES,
                {
                    addressType: addressType,
                    address: address
                }
            )
            if (response && response.data) {
                setRsult(ApiResult.Success);
            } else {
                setError("Failed to get categories.");
                setRsult(ApiResult.Failure);
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

    return [addNewAddress, result, error]
}