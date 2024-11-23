import { CartItem, CartItemWith_Id } from '@types';

export const checkAvailability = async (
  items: CartItem[]
): Promise<{ success: boolean; updatedInventory?: CartItemWith_Id[] }> => {
  try {
    const response = await fetch('/api/inventory/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ items })
    });

    if (!response.ok) {
      throw new Error('Failed to check availability.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in checkAvailability:', error);
    throw error;
  }
};

export const reserveItems = async (items: CartItem[]): Promise<boolean> => {
  try {
    const response = await fetch('/api/inventory/reserve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ items })
    });

    if (!response.ok) {
      throw new Error('Failed to reserve items.');
    }

    const data = await response.json();
    console.log('reserveItems:', data);
    return data.success;
  } catch (error) {
    console.error('Error in reserveItems:', error);
    throw error;
  }
};

export const rollbackReservation = async (items: CartItem[]): Promise<void> => {
  try {
    const response = await fetch('/api/inventory/rollback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ items })
    });

    if (!response.ok) {
      throw new Error('Failed to rollback reservation.');
    }

    console.log('Rollback successful');
  } catch (error) {
    console.error('Error in rollbackReservation:', error);
    throw error;
  }
};
