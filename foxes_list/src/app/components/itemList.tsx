"use client";
import React, { useState, useEffect } from 'react';
import TableItem from './tableItem';
import { getItemsHandler, Item } from '@/app/api/api';

interface ItemListProps {
    items: Item[];
    onItemDeleted: (itemId: number) => void;
    onItemUpdated: (updatedItem: Item) => void;
}

function isError(err: unknown): err is Error {
    return err instanceof Error;
}

const ItemList: React.FC<ItemListProps> = ({ items, onItemDeleted, onItemUpdated }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [localItems, setLocalItems] = useState<Item[]>(items)

    useEffect(() => {
        setLocalItems(items);
    }, [items]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const fetchedItems = await getItemsHandler();
                setLocalItems(fetchedItems);
            } catch (err: unknown) { // Change any to unknown
                if (isError(err)) {
                    setError(err.message || "An error occurred while fetching items.");
                } else {
                    setError("An unknown error occurred.");
                }
            } finally {
                setLoading(false);
            }
        };

        if (items.length === 0) {
            fetchData();
        }
    }, [items]);

    const handleItemDeletedLocal = (itemId: number) => {
        setLocalItems(prevItems => prevItems.filter(item => item.id !== itemId));
        onItemDeleted(itemId)
    };
    const handleItemUpdatedLocal = (updatedItem: Item) => {
        setLocalItems(prevItems =>
            prevItems.map(item => (item.id === updatedItem.id ? updatedItem : item))
        );
        onItemUpdated(updatedItem)
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
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock Quantity</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {localItems.map(item => (
                    <TableItem
                        key={item.id}
                        item={item}
                        onItemDeleted={handleItemDeletedLocal}
                        onItemUpdated={handleItemUpdatedLocal}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default ItemList;