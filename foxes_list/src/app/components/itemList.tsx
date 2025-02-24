import React from 'react';
import SimpleTableItem from './simpleTableItem';

interface Item {
  name: string;
  price: number;
  stockQuantity: number;
}

interface ItemListProps {
    items: Item[];
}
const ItemList: React.FC<ItemListProps> = ({items}) => {

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Stock Quantity</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <SimpleTableItem
            key={index}
            name={item.name}
            price={item.price}
            stockQuantity={item.stockQuantity}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ItemList;
