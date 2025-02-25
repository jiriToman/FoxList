"use client";
import React, { useState, useEffect } from 'react';
import TableItem from './tableItem';
import { Item } from '@/app/api/api';

interface ItemListProps {
    items: Item[];
    onItemDeleted: (itemId: number) => void;
    onItemUpdated: (updatedItem: Item) => void;
}
const ItemList: React.FC<ItemListProps> = ({ items, onItemDeleted, onItemUpdated }) => {
    const [localItems, setLocalItems] = useState<Item[]>(items);

    useEffect(() => {
        setLocalItems(items);
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
