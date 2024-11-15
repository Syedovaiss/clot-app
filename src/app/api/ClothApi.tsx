import axios from "axios";
import Config from "react-native-config";
import { EMPTY_STRING } from "../../utils/Constants";

export const ClothAPI = (token?: string) => axios.create({
    baseURL: Config.BASE_URL,
    headers: {
        Authorization: token ? token : EMPTY_STRING,
        "Content-Type": 'application/json'
    }
})