import { useState } from "react"
import { ClothAPI } from "../../../api/ClothApi"
import { ENDPOINT_PROFILE } from "../../../../utils/Constants"

export type UserInfo = {
    firstName: string,
    lastName: string,
    avatar: string,
    phoneNumber: string,
    email: string,
    gender: string,
    clothesPriority: string
}

export default (): [
    (token: string | null) => void,
    UserInfo | undefined,
    string | undefined
] => {
    const [userInfo, setUserInfo] = useState<UserInfo| undefined>(undefined)
    const [error, setError] = useState<string | undefined>(undefined)
    const getUserInfo = async (token: string | null) => {
        const api = ClothAPI(token!)
        try {
            setError(undefined);
            const response = await api.get(ENDPOINT_PROFILE)
            if (response && response.data) {
                setUserInfo(response.data)
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

    return [getUserInfo, userInfo, error]

}