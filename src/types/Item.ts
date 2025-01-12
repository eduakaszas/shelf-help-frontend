export interface Item {
    id: number;
    name: string;
    count: number;
    expirationDate?: string;
    consumptionRate: number;
}

export interface CreateItemDTO {
    name: string;
    count: number;
    expirationDate?: string;
    consumptionRate: number;
}