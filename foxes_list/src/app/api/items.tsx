interface Item {
    id: number;
    name: string;
    price: number;
    stockQuantity: number;
  }
  
  async function getItemsHandler(): Promise<Item[]> {
    const res = await fetch('http://localhost:3000/products', {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch items');
    }
    return res.json();
  }
  
  export default getItemsHandler;