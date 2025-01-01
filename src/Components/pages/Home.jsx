import React, { useState, useEffect } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

// Custom ID generator
const generateId = () => {
  return `id-${Math.random().toString(36).substring(2, 11)}`;
};

// Item component
const Item = ({ item, onEdit, onDelete, onCheck }) => {
  return (
    <li
      key={item.id}
      className={`p-4 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 transition-all ${
        item.checked
          ? "bg-gray-400 text-gray-100 dark:bg-gray-950 line-through"
          : "bg-white text-gray-900 dark:text-white"
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-medium">{item.name}</p>
          <p className="text-sm dark:text-gray-400">
            {item.quantity} {item.amount}
          </p>
        </div>
        <div className="flex items-center text-2xl gap-3 space-x-2">
          <button
            onClick={() => onEdit(item.id)}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="text-red-600 dark:text-red-400 hover:text-red-800"
          >
            <FaTrashAlt />
          </button>
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => onCheck(item.id)}
            className="w-5 h-5"
          />
        </div>
      </div>
    </li>
  );
};

// Form component
const ItemForm = ({
  onSubmit,
  name,
  setName,
  quantity,
  setQuantity,
  amount,
  setAmount,
  editingIndex,
}) => {
  return (
    <form onSubmit={onSubmit} className="mb-6">
      <div className="mb-4">
        <label
          htmlFor="item-name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Item Name <span className="text-red-500">*</span>
        </label>
        <input
          id="item-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Rice"
          className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
          required
        />
      </div>

      <div className="mb-4 flex space-x-4">
        <div className="flex-1">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="e.g. 4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
        </div>

        <div className="flex-1">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Amount
          </label>
          <input
            id="amount"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. pieces, Kg, Ml, trays"
            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
        </div>
      </div>

      <button
        type="submit"
        className={`px-4 py-2 bg-green-600 text-white rounded-md flex items-center space-x-2 dark:bg-green-800 ${
          !name ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={!name} 
      >
        <FaPlus />{" "}
        <span>{editingIndex !== null ? "Update Item" : "Add Item"}</span>
      </button>
    </form>
  );
};

// Main component
export default function Home() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [amount, setAmount] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("items"));
    if (savedItems) {
      setItems(savedItems);
    }
  }, []);

  useEffect(() => {
    if (items.length >= 0) {
      localStorage.setItem("items", JSON.stringify(items));
    }
  }, [items]);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Please enter all fields!");
      return;
    }

    const newItem = {
      id: generateId(),
      name,
      amount: amount || "pieces",
      quantity: quantity || 1,
      checked: false,
    };

    if (editingIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editingIndex] = newItem;
      setItems(updatedItems);
      setEditingIndex(null);
    } else {
      setItems([...items, newItem]);
    }

    setName("");
    setQuantity("");
    setAmount("");
  };

  const handleDeleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const handleCheckboxChange = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
  };

  const handleEditItem = (id) => {
    const item = items.find((item) => item.id === id);
    setName(item.name);
    setQuantity(item.quantity);
    setAmount(item.amount);
    setEditingIndex(items.indexOf(item));
  };

  const sortedItems = items.sort((a, b) => a.checked - b.checked);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">
        Shopping List
      </h1>

      <ItemForm
        onSubmit={handleAddItem}
        name={name}
        setName={setName}
        quantity={quantity}
        setQuantity={setQuantity}
        amount={amount}
        setAmount={setAmount}
        editingIndex={editingIndex}
      />

      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Your Items
        </h2>

        {items.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No items in the list yet. Start by adding your first item!
          </p>
        ) : (
          <ul className="space-y-4">
            {sortedItems.map((item) => (
              <Item
                key={item.id}
                item={item}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
                onCheck={handleCheckboxChange}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
