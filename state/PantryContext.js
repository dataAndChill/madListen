// state/PantryContext.js
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PantryCtx = createContext(null);
const KEY = "pantryItems";

export function PantryProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { (async () => {
    try {
      const raw = await AsyncStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
      else setItems(["Kartofler", "Gulerødder", "Linser"]); // default
    } finally { setLoaded(true); }
  })(); }, []);

  useEffect(() => { if (loaded) AsyncStorage.setItem(KEY, JSON.stringify(items)).catch(()=>{}); }, [items, loaded]);

  const addItem = useCallback((name) => {
    const v = String(name).trim();
    if (!v) return;
    setItems(prev => prev.includes(v) ? prev : [...prev, v]);
  }, []);

  const removeItem = useCallback((name) => setItems(prev => prev.filter(i => i !== name)), []);
  const clear = useCallback(() => setItems([]), []);

  return (
    <PantryCtx.Provider value={{ items, addItem, removeItem, clear, loaded }}>
      {children}
    </PantryCtx.Provider>
  );
}
export function usePantry(){ const c = useContext(PantryCtx); if(!c) throw new Error("usePantry outside provider"); return c; }
