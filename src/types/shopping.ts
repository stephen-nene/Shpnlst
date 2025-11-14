// types/shopping.ts
export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  unit: UnitType;
  price: number;
  category: string;
  checked: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UnitType =
  | 'items'
  | 'kg'
  | 'g'
  | 'liters'
  | 'ml'
  | 'pieces'
  | 'boxes'
  | 'cans'
  | 'bottles'
  | 'packages'
  | 'bags';

export interface ItemFormData {
  name: string;
  quantity: number;
  unit: UnitType;
  price: number;
  category: string;
}

export type ModalMode = 'create' | 'edit' | null;
