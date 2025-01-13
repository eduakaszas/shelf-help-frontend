import axios from "axios";
import { Item, CreateItemDTO } from "../types/Item";

const API = axios.create({ baseURL: 'http://localhost:5235/api' });

// fetch all items
export const fetchItems = async (): Promise<Item[]> => {
    const response = await API.get('/items');
    return response.data;
}

// add new item
export const addItem = async (item: CreateItemDTO): Promise<Item> => {
    const response = await API.post('/items', item);
    return response.data;
}

// delete item
export const deleteItem = async (itemId: number): Promise<void> => {
    await API.delete(`items/${itemId}`);
};

// Update item
export const updateItem = async (
    itemId: number,
    updatedData: Partial<Item>
): Promise<Item> => {
    const response = await API.put(`items/${itemId}`, updatedData);
    return response.data;
};