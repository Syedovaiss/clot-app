import { useState } from "react"
import { Cloth } from "../../main/Cloth.app"
import { ClothAPI } from "../../../api/ClothApi"
import { ENDPOINT_SEARCH_API } from "../../../../utils/Constants"

export default (): [
    (query: string) => void,
    any[],
    string | null
] => {
    const api = ClothAPI()
    const [searchResult, setSearchResult] = useState<any[]>([])
    const [error, setError] = useState<string | null>(null)
    const search = async (query: string) => {
        try {
            setError(null)
            await api.get(ENDPOINT_SEARCH_API + `?searchQuery=${query}`)
                .then(response => {
                    if (response && response.data && response.data.accessToken) {
                        setSearchResult(response.data)
                    } else {
                        setError("Invalid Search Query!")
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
    return [search, searchResult, error] as const

}