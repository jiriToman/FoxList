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
    onItemUpdated: (updatedItem: Item) => void;
}

const TableItem: React.FC<TableItemProps> = ({ item, onItemDeleted, onItemUpdated }) => {
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
            onItemUpdated(responseData)
            setShowUpdateForm(false);
        } catch (error) {
            console.error('Error updating item:', error);
            alert("Error updating item: " + JSON.stringify(error));
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <tr className="[&>*:not(:last-child)]:mr-0"> {/*Removed  margin-right */}
            <td className="p-[15px]">{name}</td> {/* Added padding here */}
            <td className="p-[15px]">${price.toFixed(2)}</td> {/* Added padding here */}
            <td className="p-[15px]">{stockQuantity}</td> {/* Added padding here */}
            <td className="p-[15px] flex justify-center"> {/* Added padding here and flex for allignment */}
                <button onClick={handleDeleteClick} disabled={isDeleting} className="px-[5px] py-[2px] mr-2">
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
                <button onClick={handleUpdateClick} disabled={isUpdating} className="px-[5px] py-[2px]">
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