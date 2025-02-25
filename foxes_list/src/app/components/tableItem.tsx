import React, { useState } from 'react';
import { deleteItemHandler, updateItemHandler } from '@/app/api/api';
import UpdateForm from './updateForm';

interface Item {
    id: number;
    name: string;
    price: number;
    stockQuantity: number;
}

interface TableItemProps {
    item: Item;
    onItemDeleted: (itemId: number) => void;
    onItemUpdated: (updatedItem: Item) => void; //add missing props
}

const TableItem: React.FC<TableItemProps> = ({ item, onItemDeleted, onItemUpdated }) => { // add missing props
    const { id, name, price, stockQuantity } = item;
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const handleDeleteClick = async () => {
        setIsDeleting(true);
        try {
            await deleteItemHandler(id);
            console.log('Item deleted successfully.');
            alert("Item deleted successfully.");
            onItemDeleted(id);
        } catch (error) {
            console.error('Error deleting item:', error);
            alert("Error deleting item: " + JSON.stringify(error));
        } finally {
            setIsDeleting(false);
        }
    };

    const handleUpdateClick = () => {
        setShowUpdateForm(!showUpdateForm);
    };

    const handleUpdateSubmit = async (updatedData: { name: string; price: number; stockQuantity: number }) => {
        setIsUpdating(true);
        try {
            const responseData = await updateItemHandler(id, updatedData);
            console.log('Item updated successfully:', responseData);
            alert("Item updated successfully:" + JSON.stringify(responseData));
            onItemUpdated(responseData) // add missing method
            setShowUpdateForm(false);
        } catch (error) {
            console.error('Error updating item:', error);
            alert("Error updating item: " + JSON.stringify(error));
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <tr className="[&>*:not(:last-child)]:mr-[15px]">
            <td>{name}</td>
            <td>${price.toFixed(2)}</td>
            <td>{stockQuantity}</td>
            <td>
                <button onClick={handleDeleteClick} disabled={isDeleting}>
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
                <button onClick={handleUpdateClick} disabled={isUpdating}>
                    {isUpdating ? 'Updating...' : 'Update'}
                </button>
                {showUpdateForm && (
                    <UpdateForm
                        initialData={{ name, price, stockQuantity }}
                        onSubmit={handleUpdateSubmit}
                        onCancel={() => setShowUpdateForm(false)}
                        isSubmitting={isUpdating}
                    />
                )}
            </td>
        </tr>
    );
};

export default TableItem;