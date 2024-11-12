import { useState } from "react"
import { isEmpty } from "../../../../utils/Helpers"
import { EMPTY_EMAIL, EMPTY_FIRST_NAME, EMPTY_GENDER, EMPTY_LAST_NAME, EMPTY_PASSWORD, EMPTY_PHONE, EMPTY_STRING } from "../../../../utils/Constants"
import { ValidationResult } from "../../../../utils/ValidationResults.type"
export default (): [
    (firstName: string, lastName: string, email: string, password: string, phoneNumber: string, gender: string) => void,
    errorMessage: string,
    ValidationResult
] => {
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [result, setResult] = useState<ValidationResult>(ValidationResult.None)
    const validate = (firstName: string, lastName: string, email: string, password: string, phoneNumber: string, gender: string): void => {
        if (isEmpty(firstName)) {
            setErrorMessage(EMPTY_FIRST_NAME)
            setResult(ValidationResult.InValid)
        } else if (isEmpty(lastName)) {
            setErrorMessage(EMPTY_LAST_NAME)
            setResult(ValidationResult.InValid)
        } else if (isEmpty(gender)) {
            setErrorMessage(EMPTY_GENDER)
            setResult(ValidationResult.InValid)
        } else if (isEmpty(email)) {
            setErrorMessage(EMPTY_EMAIL)
            setResult(ValidationResult.InValid)
        } else if (isEmpty(phoneNumber)) {
            setErrorMessage(EMPTY_PHONE)
            setResult(ValidationResult.InValid)
        } else if (isEmpty(password)) {
            setErrorMessage(EMPTY_PASSWORD)
            setResult(ValidationResult.InValid)
        } else {
            setErrorMessage('')
            setResult(ValidationResult.Valid)
        }
    }
    return [validate, errorMessage, result]
}