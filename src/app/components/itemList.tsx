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
    const [openPopoverItemId, setOpenPopoverItemId] = useState<number | null>(null);

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

    const handlePopoverToggle = (itemId: number) => {
        setOpenPopoverItemId(prevId => (prevId === itemId ? null : itemId));
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
                        isOpen={openPopoverItemId === item.id}
                        onPopoverToggle={handlePopoverToggle}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default ItemList;