// components/ItemModal.tsx
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { ShoppingItem, ItemFormData, ModalMode, UnitType } from '../../types/shopping';

interface ItemModalProps {
  isOpen: boolean;
  mode: ModalMode;
  item: ItemFormData;
  editingItem: ShoppingItem | null;
  onClose: () => void;
  onSubmit: (itemData: ItemFormData) => void;
  onFormChange: (field: keyof ItemFormData, value: string | number) => void;
}

const UNIT_OPTIONS: UnitType[] = [
  'items', 'kg', 'g', 'liters', 'ml', 'pieces',
  'boxes', 'cans', 'bottles', 'packages', 'bags'
];

const CATEGORY_OPTIONS = [
  'Produce', 'Dairy', 'Meat', 'Bakery', 'Frozen',
  'Pantry', 'Beverages', 'Household', 'Personal Care', 'Other'
];

export default function ItemModal({
  isOpen,
  mode,
  item,
  // editingItem,
  onClose,
  onSubmit,
  onFormChange
}: ItemModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(item);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/90 bg-opacity-10 flex items-center justify-center p-4 z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {mode === 'create' ? 'Add New Item' : 'Edit Item'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Item Name */}
          <div>
            <label
              htmlFor="item-name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Item Name <span className="text-red-500">*</span>
            </label>
            <input
              id="item-name"
              type="text"
              value={item.name || ''}
              onChange={(e) => onFormChange('name', e.target.value)}
              placeholder="e.g. Organic Brown Rice"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-g ray-700 dark:text-white dark:border-gray-600"
              required
              minLength={2}
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              value={item.category || ''}
              onChange={(e) => onFormChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              <option value="">Select Category</option>
              {CATEGORY_OPTIONS.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity and Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                min="0"
                step="0.01"
                value={item.quantity || ''}
                onChange={(e) => onFormChange('quantity', parseFloat(e.target.value) || 0)}
                placeholder="e.g. 2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>

            <div>
              <label
                htmlFor="unit"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Unit
              </label>
              <select
                id="unit"
                value={item.unit || 'items'}
                onChange={(e) => onFormChange('unit', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600"
              >
                {UNIT_OPTIONS.map(unit => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Price <span className="text-sm text-gray-500">(optional)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500 dark:text-gray-400">
                Ksh
              </span>
              <input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={item.price || ''}
                onChange={(e) => onFormChange('price', parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!item.name?.trim()}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              {mode === 'create' ? 'Add Item' : 'Update Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
