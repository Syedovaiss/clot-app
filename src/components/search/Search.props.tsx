export type AutoCapitalize = 'none' | 'words' | 'sentences' | 'characters'
export type SearchBarProps = {
    placeholder: string,
    textContentType?: string,
    autoCorrect?: boolean,
    maxLength?: number,
    onQuerySubmit: (text: string) => void,
    onTextChanged: (text: string) => void
}