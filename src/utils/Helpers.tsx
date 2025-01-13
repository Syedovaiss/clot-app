import { NewArrival } from "../app/features/home/ui/NewArrival";
import { Product } from "../app/features/home/ui/Product";
import { TopSelling } from "../app/features/home/ui/TopSelling";

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

export function getProduct(item: NewArrival | TopSelling): Product {
    return {
        _id: item._id,
        title: item.title,
        description: item.description,
        price: item.price,
        size: item.size,
        availableQuantity: item.availableQuantity,
        availableColors: item.availableColors,
        categoryId: item.categoryId,
        image: item.image,
    }
}

export function getPriceValue(price?: string): number {
    try {
        if(price === null || price === undefined) {
            return 0;
        }
        const numericPrice = parseInt(price.replace(/[^0-9.-]+/g, ''))
        return numericPrice;
    } catch (error: any) {
        console.log(error)
        return 0
    }

}