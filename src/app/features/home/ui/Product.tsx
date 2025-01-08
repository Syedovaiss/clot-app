export type Product = {
    _id: string,
    title: string,
    description: string,
    price: string,
    size: string[],
    availableQuantity: number,
    availableColors: string[],
    categoryId: string,
    image: string
}