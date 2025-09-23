// state/PantryContext.js
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PantryCtx = createContext(null);
const KEY = 'pantryItems';

export function PantryProvider({ children }) {
  const [items, setItems] = useState(['salt', 'olive oil']); // starter items
  const [loaded, setLoaded] = useState(false);

  // load from storage
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) setItems(parsed);
        }
      } catch (_) {}
      setLoaded(true);
    })();
  }, []);

  // persist on change (after initial load)
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(KEY, JSON.stringify(items)).catch(() => {});
  }, [items, loaded]);

  const addItem = useCallback((name) => {
    const val = String(name).trim().toLowerCase();
    if (!val) return;
    setItems(prev => (prev.includes(val) ? prev : [...prev, val]));
  }, []);

  const removeItem = useCallback((name) => {
    setItems(prev => prev.filter(i => i !== name));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  // optional: import from comma-separated string
  const importFromCSV = useCallback((csv) => {
    const list = String(csv)
      .split(',')
      .map(s => s.trim().toLowerCase())
      .filter(Boolean);
    setItems(prev => Array.from(new Set([...prev, ...list])));
  }, []);

  return (
    <PantryCtx.Provider value={{ items, addItem, removeItem, clear, importFromCSV, loaded }}>
      {children}
    </PantryCtx.Provider>
  );
}

export function usePantry() {
  const ctx = useContext(PantryCtx);
  if (!ctx) throw new Error('usePantry must be used within PantryProvider');
  return ctx;
}
