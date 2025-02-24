import React from 'react';

interface TableItemProps {
  name: string;
  price: number;
  stockQuantity: number;
}

const TableItem: React.FC<TableItemProps> = ({ name, price, stockQuantity }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>${price.toFixed(2)}</td>
      <td>{stockQuantity}</td>
    </tr>
  );
};

export default TableItem;