import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export enum CardType {
  NOVA = "nova",
  MARBLE = "marble",
  AURIC = "auric",
}

export interface OrderItem {
  type: CardType;
  name: string;
  email: string;
}

export interface PurchaseRequest {
  items: OrderItem[];
  buyerEmail?: string;
  buyerName?: string;
  paymentReference?: string;
  shippingAddress?: string;
  shippingCity?: string;
  shippingState?: string;
}

export interface PurchaseResponse {
  success: boolean;
  data: any;
}

export const purchaseCards = async (
  request: PurchaseRequest,
): Promise<PurchaseResponse> => {
  const response = await api.post("/orders/purchase", request);
  return response.data;
};
