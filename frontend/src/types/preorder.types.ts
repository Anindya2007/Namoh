export interface PreOrder {
  orderId: number;
  userId: number;
  orderAt: string;
  adress: string;
}

export interface PreOrderResponse {
  success: boolean;
  message: string;
  data: PreOrder | null;
}

