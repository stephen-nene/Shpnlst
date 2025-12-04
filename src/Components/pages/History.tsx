import  { useState, useEffect } from 'react';
import { FaHistory, FaShoppingCart, FaTrophy, FaTrash } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import { HistoryEvent, HistoryStats, getHistory, getHistoryStats, deleteHistoryEvent, clearAllHistory } from '../../types/history';

export default function History() {
  const [history, setHistory] = useState<HistoryEvent[]>([]);
  const [stats, setStats] = useState<HistoryStats | null>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    setHistory(getHistory());
    setStats(getHistoryStats());
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this history item?')) {
      deleteHistoryEvent(id);
      loadHistory();
    }
  };

  const handleClearAll = () => {
    if (confirm('Clear all history? This cannot be undone.')) {
      clearAllHistory();
      loadHistory();
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'item_added': return '➕';
      case 'item_deleted': return '🗑️';
      case 'item_completed': return '✅';
      case 'item_edited': return '✏️';
      default: return '📝';
    }
  };

  const getEventText = (event: HistoryEvent) => {
    switch (event.type) {
      case 'item_added': return `Added "${event.itemName}"`;
      case 'item_deleted': return `Deleted "${event.itemName}"`;
      case 'item_completed': return `Completed "${event.itemName}"`;
      case 'item_edited': return `Edited "${event.itemName}"`;
      default: return event.itemName;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-2 sm:p-4">
      <Helmet>
        <title>Shopping History - Shpnlst</title>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2 sm:gap-3">
            <FaHistory className="text-blue-600 text-xl sm:text-3xl" />
            Shopping History
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
            Track your shopping patterns and spending
          </p>
        </div>

        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow">
              <div className="text-lg sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
                {stats.totalItems}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Total Items</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow">
              <div className="text-lg sm:text-2xl font-bold text-green-600 dark:text-green-400">
                Ksh {stats.totalSpent.toFixed(2)}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Total Spent</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow col-span-2 sm:col-span-1">
              <div className="text-lg sm:text-2xl font-bold text-purple-600 dark:text-purple-400">
                {stats.mostFrequentItems.length}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Frequent Items</div>
            </div>
          </div>
        )}

        {stats?.mostFrequentItems && stats.mostFrequentItems.length > 0 && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <FaTrophy className="text-yellow-500" />
              Most Purchased Items
            </h2>
            <div className="space-y-2">
              {stats.mostFrequentItems.map((item, index) => (
                <div key={item.name||index} className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                    {item.count}x
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <FaShoppingCart className="text-blue-600" />
              Recent Activity
            </h2>
            {history.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm flex items-center gap-1"
              >
                <FaTrash /> Clear All
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="p-8 text-center">
              <FaHistory size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No history yet. Start shopping to see your activity!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {history.map((event) => (
                <div key={event.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-xl">{getEventIcon(event.type)}</span>
                      <div className="flex-1">
                        <p className="text-gray-900 dark:text-white font-medium">
                          {getEventText(event)}
                        </p>
                        {event.price && (
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Ksh {event.price} × {event.quantity || 1}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(event.timestamp)}
                      </span>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="opacity-0 group-hover:opacity-100 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-opacity"
                        title="Delete"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
