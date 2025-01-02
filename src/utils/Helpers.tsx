export function isEmpty(value: any): boolean {
    return value === null || value === undefined || value === '';
}

export function isBlank(value: any): boolean {
    return value === null || value === undefined || value.trim() === '';
}

export function isNull(value: any): boolean {
    return value === null;
}
export function isNotEmpty(value: any): boolean {
    return !isEmpty(value);
}

export function isNotBlank(value: any): boolean {
    return !isBlank(value);
}

export function isNotNull(value: any): boolean {
    return value !== null;
}