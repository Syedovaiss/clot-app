import { useState } from "react"
import { isEmpty } from "../../../../utils/Helpers"
import { EMPTY_EMAIL, EMPTY_PASSWORD, EMPTY_STRING } from "../../../../utils/Constants"
import { ValidationResult } from "../../../../utils/ValidationResults.type"
export default (): [
    (email: string, password: string) => void,
    errorMessage: string,
    ValidationResult
] => {
    const [errorMessage,setErrorMessage] = useState<string>('')
    const [result, setResult] = useState<ValidationResult>(ValidationResult.None)
    const validate = (email: string, password: string): void => {
        if (isEmpty(email)) {
            setErrorMessage(EMPTY_EMAIL)
            setResult(ValidationResult.InValid)
        } else if (isEmpty(password)) {
            setErrorMessage(EMPTY_PASSWORD)
            setResult(ValidationResult.InValid)
        } else {
            setErrorMessage('')
            setResult(ValidationResult.Valid)
        }
        // resetting hook so it can be called multiple times
         setTimeout(() => setResult(ValidationResult.None), 0);
    }
    return [validate, errorMessage,result]
}