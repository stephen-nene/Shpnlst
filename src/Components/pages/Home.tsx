// components/ShoppingList.tsx
import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrashAlt, FaEdit, FaShoppingCart } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import ItemModal from '../modals/Item';
import { ShoppingItem, ItemFormData, ModalMode } from '../../types/shopping';
import { addHistoryEvent } from '../../types/history';

// Utility functions
const generateId = (): string => `id-${Math.random().toString(36).substring(2, 11)}`;

const getCurrentDateTime = (): string => new Date().toISOString();

const calculateTotalPrice = (items: ShoppingItem[]): number => {
  return items.reduce((total, item) => {
    if (!item.checked) {
      return total + (item.price * item.quantity);
    }
    return total;
  }, 0);
};

const getDefaultFormData = (): ItemFormData => ({
  name: '',
  quantity: 1,
  unit: 'items',
  price: 0,
  category: ''
});

// Item Component
interface ItemComponentProps {
  item: ShoppingItem;
  onEdit: (item: ShoppingItem) => void;
  onDelete: (id: string) => void;
  onCheck: (id: string) => void;
}

const ItemComponent: React.FC<ItemComponentProps> = ({ item, onEdit, onDelete, onCheck }) => {
  const formatPrice = (price: number): string => {
    return price % 1 === 0 ? price.toString() : price.toFixed(2);
  };

  return (
    <li
      className={`p-3 sm:p-4 border border-gray-300 rounded-lg transition-all duration-200 ${
        item.checked
          ? 'bg-gray-100 text-gray-500 dark:bg-gray-800 line-through'
          : 'bg-white dark:bg-gray-700'
      } hover:shadow-md`}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
            <p className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
              {item.name}
            </p>
            {item.category && (
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200 self-start">
                {item.category}
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-gray-600 dark:text-gray-300">
            <span className="font-medium">
              {item.quantity} {item.unit}
            </span>
            {item.price > 0 && (
              <span className="font-medium">
                Ksh {formatPrice(item.price)} each
              </span>
            )}
            {item.price > 0 && (
              <span className="font-bold text-green-600 dark:text-green-400">
                Total: Ksh {formatPrice(item.price * item.quantity)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-1 sm:gap-2 sm:ml-4">
          <button
            onClick={() => onEdit(item)}
            className="p-3 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors dark:text-blue-400 dark:hover:bg-blue-900 touch-manipulation"
            title="Edit item"
          >
            <FaEdit size={18} className="sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="p-3 sm:p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors dark:text-red-400 dark:hover:bg-red-900 touch-manipulation"
            title="Delete item"
          >
            <FaTrashAlt size={18} className="sm:w-4 sm:h-4" />
          </button>
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => onCheck(item.id)}
            className="w-6 h-6 sm:w-5 sm:h-5 text-blue-600 rounded focus:ring-blue-500 touch-manipulation"
            title="Mark as purchased"
          />
        </div>
      </div>
    </li>
  );
};

// Main Shopping List Component
export default function ShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    mode: ModalMode;
  }>({
    isOpen: false,
    mode: null
  });
  const [formData, setFormData] = useState<ItemFormData>(getDefaultFormData());
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);

  // Load items from localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem('shoppingItems');
    if (savedItems) {
      try {
        setItems(JSON.parse(savedItems));
      } catch (error) {
        console.error('Error loading items from localStorage:', error);
      }
    }
  }, []);

  // Save items to localStorage
  useEffect(() => {
    localStorage.setItem('shoppingItems', JSON.stringify(items));
  }, [items]);

  const handleOpenModal = (mode: ModalMode, item?: ShoppingItem) => {
    if (mode === 'edit' && item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        price: item.price,
        category: item.category
      });
    } else {
      setFormData(getDefaultFormData());
      setEditingItem(null);
    }
    setModalState({ isOpen: true, mode });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, mode: null });
    setFormData(getDefaultFormData());
    setEditingItem(null);
  };

  const handleFormChange = (field: keyof ItemFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitItem = (itemData: ItemFormData) => {
    const trimmedName = itemData.name?.trim() || '';
    if (!trimmedName || trimmedName.length < 2) {
      alert('Please enter a valid item name (at least 2 characters)');
      return;
    }

    const now = getCurrentDateTime();

    if (modalState.mode === 'edit' && editingItem) {
      // Update existing item
      setItems(prev => prev.map(item =>
        item.id === editingItem.id
          ? {
              ...item,
              ...itemData,
              updatedAt: now
            }
          : item
      ));
      addHistoryEvent({
        type: 'item_edited',
        itemName: itemData.name,
        itemId: editingItem.id,
        price: itemData.price,
        quantity: itemData.quantity
      });
    } else {
      // Create new item
      const newItem: ShoppingItem = {
        id: generateId(),
        ...itemData,
        checked: false,
        createdAt: now,
        updatedAt: now
      };
      setItems(prev => [...prev, newItem]);
      addHistoryEvent({
        type: 'item_added',
        itemName: itemData.name,
        itemId: newItem.id,
        price: itemData.price,
        quantity: itemData.quantity
      });
    }

    handleCloseModal();
  };

  const handleDeleteItem = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const item = items.find(i => i.id === id);
      if (item) {
        addHistoryEvent({
          type: 'item_deleted',
          itemName: item.name,
          itemId: id,
          price: item.price,
          quantity: item.quantity
        });
      }
      setItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleCheckItem = (id: string) => {
    const item = items.find(i => i.id === id);
    if (item && !item.checked) {
      addHistoryEvent({
        type: 'item_completed',
        itemName: item.name,
        itemId: id,
        price: item.price,
        quantity: item.quantity
      });
    }
    setItems(prev => prev.map(item =>
      item.id === id
        ? { ...item, checked: !item.checked, updatedAt: getCurrentDateTime() }
        : item
    ));
  };

  const handleClearCompleted = () => {
    if (window.confirm('Remove all completed items?')) {
      setItems(prev => prev.filter(item => !item.checked));
    }
  };

  const sortedItems = [...items].sort((a, b) => {
    // Unchecked items first, then by creation date
    if (a.checked !== b.checked) {
      return a.checked ? 1 : -1;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const totalPrice = calculateTotalPrice(items);
  const uncheckedItems = items.filter(item => !item.checked);
  const checkedItems = items.filter(item => item.checked);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-2 sm:p-4 pb-safe">
      <Helmet>
        <title>Shopping List App</title>
        <meta
          name="description"
          content="Manage your shopping list with ease, add items, track prices, and more."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2 sm:gap-3">
            <FaShoppingCart className="text-blue-600 text-xl sm:text-3xl" />
            <span className="break-words">Shopping List</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 px-4">
            Keep track of your shopping items and expenses
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow">
            <div className="text-lg sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
              {uncheckedItems.length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Items to buy</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow">
            <div className="text-lg sm:text-2xl font-bold text-green-600 dark:text-green-400">
              Ksh {totalPrice.toFixed(2)}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Total cost</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow">
            <div className="text-lg sm:text-2xl font-bold text-gray-600 dark:text-gray-400">
              {checkedItems.length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Completed</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6">
          <button
            onClick={() => handleOpenModal('create')}
            className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors touch-manipulation font-medium"
          >
            <FaPlus size={16} />
            Add New Item
          </button>

          {checkedItems.length > 0 && (
            <button
              onClick={handleClearCompleted}
              className="px-4 py-3 sm:py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors touch-manipulation font-medium"
            >
              Clear Completed ({checkedItems.length})
            </button>
          )}
        </div>

        {/* Items List */}
        {items.length === 0 ? (
          <div className="text-center py-8 sm:py-12 px-4">
            <FaShoppingCart size={40} className="sm:w-12 sm:h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              Your shopping list is empty
            </h3>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4">
              Add some items to get started!
            </p>
            <button
              onClick={() => handleOpenModal('create')}
              className="px-6 py-3 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors touch-manipulation font-medium"
            >
              Add Your First Item
            </button>
          </div>
        ) : (
          <ul className="space-y-2 sm:space-y-3 pb-4">
            {sortedItems.map((item) => (
              <ItemComponent
                key={item.id}
                item={item}
                onEdit={handleOpenModal.bind(null, 'edit')}
                onDelete={handleDeleteItem}
                onCheck={handleCheckItem}
              />
            ))}
          </ul>
        )}
      </div>

      {/* Modal */}
      <ItemModal
        isOpen={modalState.isOpen}
        mode={modalState.mode}
        item={formData}
        editingItem={editingItem}
        onClose={handleCloseModal}
        onSubmit={handleSubmitItem}
        onFormChange={handleFormChange}
      />
    </div>
  );
}
