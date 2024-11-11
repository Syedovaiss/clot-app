
export type AutoCapitalize  = 'none' | 'words' | 'sentences' | 'characters'
export type KeyboardType = 'number-pad' | 'decimal-pad' | 'default' | 'numeric'
export type ReturnKeyType = 'search' | 'done' | 'next'
export type TextInputProps = {
    placeholder: string,
    secureTextEntry?: boolean,
    textContentType?: string,
    autoCorrect?: boolean,
    autoCapitalize?: AutoCapitalize,
    keyboardType?: KeyboardType,
    returnKeyType?: ReturnKeyType,
    onTextSubmit: (text: string) => void
}