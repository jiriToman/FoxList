"use client";
import React, { useState, useEffect } from 'react';
import TableItem from './TableItem'; // Corrected import name (uppercase)
import {getItemsHandler} from '@/app/api/api'

interface Item {
    id: number;
    name: string;
    price: number;
    stockQuantity: number;
}

const ItemList: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const fetchedItems = await getItemsHandler();
                setItems(fetchedItems);
            } catch (err: any) {
                setError(err.message || "An error occurred while fetching items.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleItemDeleted = (itemId: number) => {
        setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };
    const handleItemUpdated = (updatedItem: Item) => {
        setItems(prevItems =>
            prevItems.map(item => (item.id === updatedItem.id ? updatedItem : item))
        );
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <table className="w-full">
            <thead>
                <tr className="[&>*:not(:last-child)]:mr-[15px]">
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock Quantity</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <TableItem
                        key={item.id}
                        item={item}
                        onItemDeleted={handleItemDeleted}
                        onItemUpdated={handleItemUpdated} // Add update item
                    />
                ))}
            </tbody>
        </table>
    );
};

export default ItemList;