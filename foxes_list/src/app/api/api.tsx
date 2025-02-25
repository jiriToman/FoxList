export interface Item {
  id: number;
  name: string;
  price: number;
  stockQuantity: number;
  inactive?: boolean;
}

export async function getItemsHandler(
  name?: string,
  minStock?: number | null,
  maxStock?: number | null,
  includeInactive?: boolean
): Promise<Item[]> {
  const queryParams = new URLSearchParams();
  if (name) {
      queryParams.append('name', name);
  }
  if (minStock !== null && minStock !== undefined) {
      queryParams.append('minStock', minStock.toString());
  }
  if (maxStock !== null && maxStock !== undefined) {
      queryParams.append('maxStock', maxStock.toString());
  }
  if (includeInactive) {
      queryParams.append('includeInactive', includeInactive.toString());
  }

  const url = `http://localhost:3000/products${queryParams.size > 0 ? `?${queryParams.toString()}` : ''}`;

  const res = await fetch(url, {
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

  return response.json();
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
