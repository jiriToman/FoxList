import React, {useState} from 'react';

interface Item {
    id: number;
    name: string;
    price: number;
    stockQuantity: number;
}

interface TableItemProps {
    item: Item;
    onItemDeleted: (itemId: number) => void;
}

const TableItem: React.FC<TableItemProps> = ({ item, onItemDeleted }) => {
    const { id, name, price, stockQuantity } = item;
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = async () => {
        setIsDeleting(true);
        try {
            const externalApiUrl = `http://localhost:3000/products/${id}`;
            const response = await fetch(externalApiUrl, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }

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


    return (
        <tr>
            <td>{name}</td>
            <td>${price.toFixed(2)}</td>
            <td>{stockQuantity}</td>
            <td>
                <button onClick={handleDeleteClick} disabled={isDeleting}>
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
            </td>
        </tr>
    );
};

export default TableItem;