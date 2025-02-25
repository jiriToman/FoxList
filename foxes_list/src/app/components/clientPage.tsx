"use client";
import ItemList from "./itemList";
import { createItemHandler } from "../api/api";
import { useState } from 'react';
import UpdateForm from './updateForm';

interface Item {
    id: number;
    name: string;
    price: number;
    stockQuantity: number;
}

interface ClientPageProps {
    initialItems: Item[];
}

export default function ClientPage({ initialItems }: ClientPageProps) {
    const [items, setItems] = useState<Item[]>(initialItems);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const handleItemCreated = (newItem: Item) => {
        setItems(prevItems => [...prevItems, newItem]);
    };

    const handleCreateClick = () => {
        setShowCreateForm(true);
    };

    const handleCreateCancel = () => {
        setShowCreateForm(false);
    };

    const handleCreateSubmit = async (newItemData: { name: string; price: number; stockQuantity: number }) => {
        setIsCreating(true);
        try {
            const responseData = await createItemHandler(newItemData);
            console.log('Item created successfully:', responseData);
            alert("Item created successfully:" + JSON.stringify(responseData));
            handleItemCreated(responseData);
            setShowCreateForm(false);
        } catch (error) {
            console.error('Error creating item:', error);
            alert("Error creating item: " + JSON.stringify(error));
        } finally {
            setIsCreating(false);
        }
    };
    const handleItemDeleted = (itemId: number) => {
        setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };
    const handleItemUpdated = (updatedItem: Item) => {
        setItems(prevItems =>
            prevItems.map(item => (item.id === updatedItem.id ? updatedItem : item))
        );
    };

    return (
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <div className="flex justify-center w-full">
                <button onClick={handleCreateClick} className="bg-green-600 text-white rounded-md px-4 py-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
                    Create Item
                </button>
            </div>
            {showCreateForm && (
                <UpdateForm
                    initialData={{ name: '', price: 0, stockQuantity: 0 }}
                    onSubmit={handleCreateSubmit}
                    onCancel={handleCreateCancel}
                    isSubmitting={isCreating}
                />
            )}
            <ItemList items={items} onItemDeleted={handleItemDeleted} onItemUpdated={handleItemUpdated} />
        </main>
    );
}