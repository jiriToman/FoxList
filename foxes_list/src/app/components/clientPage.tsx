"use client";
import ItemList from "./itemList";
import { createItemHandler, Item, getItemsHandler } from "../api/api";
import { useState, useEffect } from 'react';
import UpdateForm from './updateForm';

interface ClientPageProps {
    initialItems: Item[];
}

export default function ClientPage({ initialItems }: ClientPageProps) {
    const [items, setItems] = useState<Item[]>(initialItems);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [nameFilter, setNameFilter] = useState<string>('');
    const [minStockFilter, setMinStockFilter] = useState<number | null>(null);
    const [maxStockFilter, setMaxStockFilter] = useState<number | null>(null);
    const [includeInactiveFilter, setIncludeInactiveFilter] = useState<boolean>(false);

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

    const fetchFilteredItems = async () => {
        const filteredItems = await getItemsHandler(nameFilter, minStockFilter, maxStockFilter, includeInactiveFilter);
        setItems(filteredItems);
    };

    useEffect(() => {
        fetchFilteredItems();
    }, [nameFilter, minStockFilter, maxStockFilter, includeInactiveFilter]);

    return (
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
            <div className="flex justify-center w-full gap-4">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                />
                <input
                    type="number"
                    placeholder="Min stock"
                    value={minStockFilter === null ? '' : minStockFilter}
                    onChange={(e) => setMinStockFilter(e.target.value === '' ? null : Number(e.target.value))}
                    className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                />
                <input
                    type="number"
                    placeholder="Max stock"
                    value={maxStockFilter === null ? '' : maxStockFilter}
                    onChange={(e) => setMaxStockFilter(e.target.value === '' ? null : Number(e.target.value))}
                    className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                />
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={includeInactiveFilter}
                        onChange={(e) => setIncludeInactiveFilter(e.target.checked)}
                        className="mr-2"
                    />
                    <label>Include Inactive</label>
                </div>
            </div>
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
