import { apiRequest } from './client';
import { PreOrderResponse } from '../types/preorder.types';

export const getMyPreOrder = async (): Promise<PreOrderResponse> => {
  return apiRequest<PreOrderResponse>('/api/preorders/my');
};

export const createPreOrder = async (address: string): Promise<PreOrderResponse> => {
  return apiRequest<PreOrderResponse>('/api/preorders', {
    method: 'POST',
    body: JSON.stringify({ address }),
  });
};

export const cancelPreOrder = async (orderId: number): Promise<{ success: boolean; message: string }> => {
  return apiRequest<{ success: boolean; message: string }>(`/api/preorders/${orderId}`, {
    method: 'DELETE',
  });
};

