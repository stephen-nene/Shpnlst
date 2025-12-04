export interface HistoryEvent {
  id: string;
  type: 'item_added' | 'item_deleted' | 'item_completed' | 'item_edited';
  itemName: string;
  itemId: string;
  price?: number;
  quantity?: number;
  timestamp: string;
  details?: string;
}

export interface HistoryStats {
  totalItems: number;
  totalSpent: number;
  mostFrequentItems: { name: string; count: number }[];
  recentActivity: HistoryEvent[];
}

const HISTORY_KEY = 'shoppingHistory';

export const addHistoryEvent = (event: Omit<HistoryEvent, 'id' | 'timestamp'>) => {
  const historyEvent: HistoryEvent = {
    ...event,
    id: `hist-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    timestamp: new Date().toISOString()
  };

  const history = getHistory();
  history.unshift(historyEvent);
  
  if (history.length > 1000) {
    history.splice(1000);
  }
  
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};

export const getHistory = (): HistoryEvent[] => {
  try {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
};

export const deleteHistoryEvent = (id: string) => {
  const history = getHistory();
  const filtered = history.filter(e => e.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
};

export const clearAllHistory = () => {
  localStorage.removeItem(HISTORY_KEY);
};

export const getHistoryStats = (): HistoryStats => {
  const history = getHistory();
  
  const totalItems = history.filter(e => e.type === 'item_added').length;
  const totalSpent = history
    .filter(e => e.type === 'item_completed' && e.price)
    .reduce((sum, e) => sum + (e.price! * (e.quantity || 1)), 0);

  const itemCounts: Record<string, number> = {};
  history.forEach(event => {
    if (event.type === 'item_added') {
      itemCounts[event.itemName] = (itemCounts[event.itemName] || 0) + 1;
    }
  });

  const mostFrequentItems = Object.entries(itemCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  return {
    totalItems,
    totalSpent,
    mostFrequentItems,
    recentActivity: history.slice(0, 10)
  };
};