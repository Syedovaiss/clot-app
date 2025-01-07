export const EMPTY_EMAIL = "Email can't be empty!"
export const EMPTY_PASSWORD = "Password can't be empty!"
export const EMPTY_STRING = ""
export const EMPTY_FIRST_NAME = "First name can't be empty!"
export const EMPTY_LAST_NAME = "Last name can't be empty!"
export const EMPTY_PHONE = "Phone number can't be empty"
export const EMPTY_GENDER = "Please select gender!"

const BASE_URL = "http://192.168.226.135:4000"
export const ENDPOINT_LOGIN = `${BASE_URL}/api/sign-in`
export const ENDPOINT_SIGNUP = `${BASE_URL}/api/sign-up`
export const ENDPOINT_ABOUT_YOURSELF = `${BASE_URL}/api/add-user-info`
export const ENDPOINT_SEARCH_API = `${BASE_URL}/api/search`
export const ENDPOINT_TOP_SELLING = `${BASE_URL}/api/products/top-selling`
export const ENDPOINT_LAST_ADDED = `${BASE_URL}/api/last-ten-products`
export const ENDPOINT_CATEGORIES = `${BASE_URL}/api/categories`
export const ENDPOINT_PROFILE = `${BASE_URL}/api/profile`


export const PROFILE_THUMBNAIL = 'https://www.w3schools.com/w3images/avatar2.png';
export const getImageUrl = (imageUrl: string) => {
    let imageURl = BASE_URL + "/"+ imageUrl
    return imageURl
}
