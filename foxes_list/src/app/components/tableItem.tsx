import React, { useState } from 'react';
import { deleteItemHandler, updateItemHandler, Item, getPriceHistoryHandler, PriceHistoryEntry } from '@/app/api/api';
import UpdateForm from './updateForm';
import Popover from './popOver';
import {
    TABLE_CELL_CLASS,
    TABLE_ROW_CLASS,
    PRICE_HISTORY_BUTTON_CLASS,
    ACTION_BUTTON_CLASS,
    PRICE_HISTORY_LABEL_CLASS,
    PRICE_HISTORY_ITEM_CLASS,
    PRICE_HISTORY_LOADING_CLASS,
    PRICE_HISTORY_ERROR_CLASS,
    PRICE_HISTORY_NO_HISTORY_CLASS,
    DELETE_BUTTON_CLASS,
    TABLE_ACTIONS_CLASS
} from '../classConstants';

interface TableItemProps {
    item: Item;
    onItemDeleted: (itemId: number) => void;
    onItemUpdated: (updatedItem: Item) => void;
    isOpen: boolean;
    onPopoverToggle: (itemId: number) => void;
}
function isError(err: unknown): err is Error {
    return err instanceof Error;
}

const TableItem: React.FC<TableItemProps> = ({ item, onItemDeleted, onItemUpdated, isOpen, onPopoverToggle }) => {
    const { id, name, price, stockQuantity } = item;
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [priceHistory, setPriceHistory] = useState<PriceHistoryEntry[]>([]);
    const [isFetchingHistory, setIsFetchingHistory] = useState<boolean>(false);
    const [fetchHistoryError, setFetchHistoryError] = useState<string | null>(null);

    const handleDeleteClick = async () => {
        setIsDeleting(true);
        try {
            await deleteItemHandler(id);
            console.log('Item deleted successfully.');
            alert("Item deleted successfully.");
            onItemDeleted(id);
        } catch (error: unknown) {
            if (isError(error)) {
                console.error('Error deleting item:', error);
                alert("Error deleting item: " + JSON.stringify(error));
            } else {
                alert("An unknown error occurred.");
            }
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
        } catch (error: unknown) {
            if (isError(error)) {
                console.error('Error updating item:', error);
                alert("Error updating item: " + JSON.stringify(error));
            } else {
                alert("An unknown error occurred.");
            }
        } finally {
            setIsUpdating(false);
        }
    };

    const handleShowPriceHistory = async () => {
        if (!isOpen) {
             setIsFetchingHistory(true);
            setFetchHistoryError(null);
            try {
                const data = await getPriceHistoryHandler(id);
                setPriceHistory(data);
            } catch (err: unknown) {
                if (isError(err)) {
                    setFetchHistoryError(err.message || "Failed to fetch price history");
                } else {
                    setFetchHistoryError("An unknown error occurred.");
                }
            } finally {
                setIsFetchingHistory(false);
            }
        }
        onPopoverToggle(id);
       
    };

    return (
        <tr className={TABLE_ROW_CLASS}>
            <td className={TABLE_CELL_CLASS}>{name}</td>
            <td className={TABLE_CELL_CLASS}>${price.toFixed(2)}</td>
            <td className={TABLE_CELL_CLASS}>{stockQuantity}</td>
            <td className={TABLE_ACTIONS_CLASS}>
                <button
                    onClick={handleShowPriceHistory}
                    disabled={isFetchingHistory}
                    className={PRICE_HISTORY_BUTTON_CLASS}
                >
                    Price History
                </button>
                <button onClick={handleDeleteClick} disabled={isDeleting} className={ACTION_BUTTON_CLASS}>
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
                <button onClick={handleUpdateClick} disabled={isUpdating} className={DELETE_BUTTON_CLASS}>
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

                <Popover isOpen={isOpen} onClose={() => onPopoverToggle(id)} className="bg-gray-50">
                    {isFetchingHistory && <div className={PRICE_HISTORY_LOADING_CLASS}>Loading...</div>}
                    {fetchHistoryError && <div className={PRICE_HISTORY_ERROR_CLASS}>Error: {fetchHistoryError}</div>}
                    {!isFetchingHistory && !fetchHistoryError && (
                        <>
                            {priceHistory.length > 0 ? (
                                <ul className='text-gray-700'>
                                    {priceHistory.map((history) => (
                                        <li key={history.id} className={PRICE_HISTORY_ITEM_CLASS}>
                                            <p><span className={PRICE_HISTORY_LABEL_CLASS}>Old Price:</span> ${history.oldPrice.toFixed(2)}</p>
                                            <p><span className={PRICE_HISTORY_LABEL_CLASS}>New Price:</span> ${history.newPrice.toFixed(2)}</p>
                                            <p><span className={PRICE_HISTORY_LABEL_CLASS}>Changed At:</span> {new Date(history.changedAt).toLocaleString()}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className={PRICE_HISTORY_NO_HISTORY_CLASS}>
                                    <p>No price history available.</p>
                                    <p>Current price: <span className={PRICE_HISTORY_LABEL_CLASS}>${price.toFixed(2)}</span></p>
                                </div>
                            )}
                        </>
                    )}
                </Popover>
            </td>
        </tr>
    );
};

export default TableItem;
