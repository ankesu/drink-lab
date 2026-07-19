import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'drink-lab-data';
const CUSTOM_KEY = 'drink-lab-custom-recipes';

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { discoveredRecipes: [], darkRecipes: [], brewCount: 0 };
}

function loadCustom() {
  try {
    const raw = localStorage.getItem(CUSTOM_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function useGameState() {
  const [data, setData] = useState(() => loadData());
  const [customRecipes, setCustomRecipes] = useState(() => loadCustom());

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
  }, [data]);

  useEffect(() => {
    try { localStorage.setItem(CUSTOM_KEY, JSON.stringify(customRecipes)); } catch {}
  }, [customRecipes]);

  const discoverRecipe = useCallback((recipeId) => {
    setData(prev => {
      if (prev.discoveredRecipes.includes(recipeId)) return prev;
      return { ...prev, discoveredRecipes: [...prev.discoveredRecipes, recipeId] };
    });
  }, []);

  const addCustomRecipe = useCallback((recipe) => {
    setCustomRecipes(prev => [...prev, { ...recipe, id: Date.now(), isCustom: true }]);
  }, []);

  const updateCustomRecipe = useCallback((id, updates) => {
    setCustomRecipes(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  }, []);

  const deleteCustomRecipe = useCallback((id) => {
    setCustomRecipes(prev => prev.filter(r => r.id !== id));
  }, []);

  const addDarkRecipe = useCallback((dark) => {
    setData(prev => ({
      ...prev,
      darkRecipes: [...prev.darkRecipes, { ...dark, id: Date.now(), date: new Date().toISOString() }],
      brewCount: prev.brewCount + 1
    }));
  }, []);

  const forgetRecipe = useCallback((recipeId) => {
    setData(prev => ({
      ...prev,
      discoveredRecipes: prev.discoveredRecipes.filter(id => id !== recipeId)
    }));
  }, []);

  const deleteDarkRecipe = useCallback((id) => {
    setData(prev => ({
      ...prev,
      darkRecipes: prev.darkRecipes.filter(r => r.id !== id)
    }));
  }, []);

  const incrementBrew = useCallback(() => {
    setData(prev => ({ ...prev, brewCount: prev.brewCount + 1 }));
  }, []);

  return {
    discoveredRecipes: data.discoveredRecipes,
    customRecipes,
    darkRecipes: data.darkRecipes,
    brewCount: data.brewCount,
    discoverRecipe,
    forgetRecipe,
    addCustomRecipe,
    updateCustomRecipe,
    deleteCustomRecipe,
    addDarkRecipe,
    deleteDarkRecipe,
    incrementBrew,
  };
}
