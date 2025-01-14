export const EMPTY_EMAIL = "Email can't be empty!"
export const EMPTY_PASSWORD = "Password can't be empty!"
export const EMPTY_STRING = ""
export const EMPTY_FIRST_NAME = "First name can't be empty!"
export const EMPTY_LAST_NAME = "Last name can't be empty!"
export const EMPTY_PHONE = "Phone number can't be empty"
export const EMPTY_GENDER = "Please select gender!"


const BASE_URL = "http://127.0.0.1:4000"
export const ENDPOINT_LOGIN = `${BASE_URL}/api/sign-in`
export const ENDPOINT_SIGNUP = `${BASE_URL}/api/sign-up`
export const ENDPOINT_ABOUT_YOURSELF = `${BASE_URL}/api/add-user-info`
export const ENDPOINT_SEARCH_API = `${BASE_URL}/api/search`
export const ENDPOINT_TOP_SELLING = `${BASE_URL}/api/products/top-selling`
export const ENDPOINT_LAST_ADDED = `${BASE_URL}/api/last-ten-products`
export const ENDPOINT_CATEGORIES = `${BASE_URL}/api/categories`
export const ENDPOINT_PROFILE = `${BASE_URL}/api/profile`
export const ENDPOINT_ALL_ADDRESSES = `${BASE_URL}/api/address`
export const ENDPOINT_ADD_ADDRESSES = `${BASE_URL}/api/add-address`
export const ENDPOINT_ALL_PAYMENT_METHODS = `${BASE_URL}/api/payment-methods`
export const ENDPOINT_ADD_PAYMENT_METHODS = `${BASE_URL}/api/add-payment-method`
export const ENDPOINT_WISHLIST = `${BASE_URL}/api/wishlist`
export const ENDPOINT_REMOVE_FROM_WISHLIST = `${BASE_URL}/api/remove-from-wishlist`
export const ENDPOINT_ADD_TO_CART = `${BASE_URL}/api/add-to-cart`
export const ENDPOINT_ADD_TO_WISHLIST = `${BASE_URL}/api/add-to-wishlist`
export const ENDPOINT_CART = `${BASE_URL}/api/cart`
export const ENDPOINT_INCREMENT_CART_ITEM = `${BASE_URL}/api/cart/increase-item`
export const ENDPOINT_DECREMENT_CART_ITEM = `${BASE_URL}/api/cart/decrease-item`
export const ENDPOINT_CLEAR_CART_ITEM = `${BASE_URL}/api/cart/clear`
export const ENDPOINT_PLACE_ORDER = `${BASE_URL}/api/place-order`


export const PROFILE_THUMBNAIL = 'https://www.w3schools.com/w3images/avatar2.png';
export const getImageUrl = (imageUrl?: string | null) => {
    if(imageUrl === null) {
        return PROFILE_THUMBNAIL
    }
    let imageURl = BASE_URL + "/"+ imageUrl
    return imageURl
}

export const SUPPORT_URL: string = "https://www.venturedive.com/contact/"
const phoneNumber = "+923362402603"
const helpMessage = "Hey! I need help."
export const HELP_URL = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(helpMessage)}`;
