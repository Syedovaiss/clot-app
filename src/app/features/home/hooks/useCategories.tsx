import { useState } from "react"
import { ClothAPI } from "../../../api/ClothApi"
import { ENDPOINT_CATEGORIES } from "../../../../utils/Constants"

export default (): [
    () => void,
    any[] | null,
    string | undefined
] => {
    const api = ClothAPI()
    const [categories, setCategories] = useState<any[]>([])
    const [error, setError] = useState<string | undefined>(undefined)
    const getCategories = async () => {
        try {
            setError(undefined); // Clear any previous error
            const response = await api.get(ENDPOINT_CATEGORIES);
            
            // Log response to check if the data is coming through as expected
            console.log("Categories Response:", response.data);
    
            if (response && response.data) {
                setCategories(response.data.data);
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
    
    return [getCategories, categories, error]

}