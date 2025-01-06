import { useState } from "react"
import { ClothAPI } from "../../../api/ClothApi"
import { ENDPOINT_PROFILE } from "../../../../utils/Constants"

export default (): [
    (token: string|null) => void,
    string | undefined | null,
    string | undefined
] => {
    const [avatar, setAvatar] = useState<string | undefined | null>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)
    const getUserAvatar = async (token: string|null) => {
        const api = ClothAPI(token!)
        try {
            setError(undefined);
            const response = await api.get(ENDPOINT_PROFILE)
            if (response && response.data) {
                setAvatar(response.data.avatar);
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

    return [getUserAvatar, avatar, error]

}