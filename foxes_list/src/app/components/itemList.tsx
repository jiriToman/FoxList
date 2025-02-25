"use client";
import React, {useState} from 'react';
import TableItem from './tableItem';

interface Item {
  id: number;
  name: string;
  price: number;
  stockQuantity: number;
}

interface ItemListProps {
    items: Item[];
}
const ItemList: React.FC<ItemListProps> = ({items: initialItems}) => {
    const [items, setItems] = useState<Item[]>(initialItems);

    const handleItemDeleted = (itemId: number) => {
        setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Stock Quantity</th>
                <th>Delete Link</th>
            </tr>
            </thead>
            <tbody>
            {items.map(item => (
                <TableItem
                    key={item.id}
                    item={item}
                    onItemDeleted={handleItemDeleted}
                />
            ))}
            </tbody>
        </table>
    );
};

export default ItemList;