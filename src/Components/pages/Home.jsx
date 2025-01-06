import React, { useState, useEffect } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { Helmet } from "react-helmet";

// Custom ID generator
const generateId = () => {
  return `id-${Math.random().toString(36).substring(2, 11)}`;
};

const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => {
    if (item.price) {
      return total + parseFloat(item.price);
    }
    return total;
  }, 0);
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
        <div className="flex-1">
          <p className="text-lg font-medium">{item.name}</p>
          <p className="text-sm dark:text-gray-400">
            {item.quantity} {item.amount}
          </p>
          {item.price && (
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Price: Ksh {item.price}
            </p>
          )}
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
const ItemForm = ({ onSubmit, item, setItem, editingIndex }) => {
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
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
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
            value={item.quantity}
            onChange={(e) => setItem({ ...item, quantity: e.target.value })}
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
            value={item.amount}
            onChange={(e) => setItem({ ...item, amount: e.target.value })}
            placeholder="e.g. pieces, Kg, Ml, trays"
            className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Price per Unit
        </label>
        <input
          id="price"
          type="number"
          value={item.price}
          onChange={(e) => setItem({ ...item, price: e.target.value })}
          placeholder="e.g. 1.99"
          className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
      </div>

      <button
        type="submit"
        className={`px-4 py-2 bg-green-600 text-white rounded-md flex items-center space-x-2 dark:bg-green-800 ${
          !item.name ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={!item.name}
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
  const [item, setItem] = useState({
    name: "",
    quantity: "",
    amount: "",
    price: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const totalPrice = calculateTotalPrice(items);

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("items"));
    if (savedItems) {
      setItems(savedItems);
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("items", JSON.stringify(items));
    } else {
      localStorage.removeItem("items");
    }
  }, [items]);

  const handleAddItem = (e) => {
    e.preventDefault();
    const trimmedName = item.name.trim();
    if (!trimmedName || trimmedName.length < 4) {
      alert("Please enter a name with at least 4 characters!");
      return;
    }

    const newItem = {
      id: generateId(),
      name: trimmedName,
      amount: item.amount || "pieces",
      quantity: item.quantity || 1,
      price: item.price,
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

    setItem({
      name: "",
      quantity: "",
      amount: "",
      price: "",
    });
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
    const itemToEdit = items.find((item) => item.id === id);
    setItem(itemToEdit);
    setEditingIndex(items.indexOf(itemToEdit));
  };

  const sortedItems = items.sort((a, b) => a.checked - b.checked);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Helmet>
        <title>Shopping List App</title>
        <meta
          name="description"
          content="Manage your shopping list with ease, add items, track prices, and more."
        />
        <meta
          name="keywords"
          content="shopping list, price tracker, manage shopping list, add items, shopping app, grocery list"
        />
        <meta property="og:title" content="Shopping List App" />
        <meta
          property="og:description"
          content="Manage your shopping list with ease, track your items and their prices."
        />
        <meta property="og:url" content="https://shpnlst.vercel.app/" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <h1 className="text-4xl font-bold text-center mb-4">Shopping List</h1>
      <ItemForm
        onSubmit={handleAddItem}
        item={item}
        setItem={setItem}
        editingIndex={editingIndex}
      />
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
      <div className="mt-4 text-xl font-semibold">
        Total Price: Ksh {totalPrice.toFixed(2)}
      </div>
    </div>
  );
}
