import { createContext, useContext, useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { recipes as DEFAULTS } from "../data/recipes";

const RecipesCtx = createContext(null);
const KEY = "recipes";

export function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { (async () => {
    try {
      const raw = await AsyncStorage.getItem(KEY);
      setRecipes(raw ? JSON.parse(raw) : DEFAULTS);
    } finally { setLoaded(true); }
  })(); }, []);

  useEffect(() => { if (loaded) AsyncStorage.setItem(KEY, JSON.stringify(recipes)).catch(()=>{}); }, [recipes, loaded]);

  const addRecipe = useCallback((r) => {
    // r: {name, ingredients:[], co2, description}
    if (!r?.name) return;
    setRecipes(prev => prev.find(x => x.name === r.name) ? prev : [...prev, r]);
  }, []);

  const removeRecipe = useCallback((name) => setRecipes(prev => prev.filter(r => r.name !== name)), []);
  const updateRecipe = useCallback((name, patch) => {
    setRecipes(prev => prev.map(r => r.name === name ? { ...r, ...patch } : r));
  }, []);

  return (
    <RecipesCtx.Provider value={{ recipes, addRecipe, removeRecipe, updateRecipe, loaded }}>
      {children}
    </RecipesCtx.Provider>
  );
}
export function useRecipes(){ const c = useContext(RecipesCtx); if(!c) throw new Error("useRecipes outside provider"); return c; }
