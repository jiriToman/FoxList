export interface Item {
  id: number;
  name: string;
  price: number;
  stockQuantity: number;
}

export async function getItemsHandler(): Promise<Item[]> {
  const res = await fetch('http://localhost:3000/products', {
      cache: 'no-store',
  });
  if (!res.ok) {
      throw new Error('Failed to fetch items');
  }
  return res.json();
}

export async function deleteItemHandler(itemId: number): Promise<void> {
  const externalApiUrl = `http://localhost:3000/products/${itemId}`;
  const response = await fetch(externalApiUrl, {
      method: 'DELETE',
  });

  if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
  }
}

export async function updateItemHandler(itemId: number, updateData: { name: string; price: number; stockQuantity: number }): Promise<any> {
  const externalApiUrl = `http://localhost:3000/products/${itemId}`;
  const response = await fetch(externalApiUrl, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
  });

  if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
  }

  return response.json(); // Assuming the server returns the updated item data
}

export async function createItemHandler(createData: { name: string; price: number; stockQuantity: number }): Promise<any> {
  const externalApiUrl = `http://localhost:3000/products`;
  const response = await fetch(externalApiUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(createData),
  });

  if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
  }
  return response.json();
}
