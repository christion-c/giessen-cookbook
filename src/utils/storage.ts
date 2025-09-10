import type { Recipe } from "../types/recipe";

const RECIPES_KEY = "cookbook_recipes";

export function getRecipes(): Recipe[] {
    const raw = localStorage.getItem(RECIPES_KEY);
    return raw ? (JSON.parse(raw) as Recipe[]) : [];
}

export function saveRecipes(list: Recipe[]) : void {
    localStorage.setItem(RECIPES_KEY, JSON.stringify(list));
}

export function addRecipe(recipe: Omit<Recipe, "id" | "createdAt">): Recipe {
    const list = getRecipes();
    const toSave: Recipe = {
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        ...recipe,
    };
    list.push(toSave);
    saveRecipes(list);
    return toSave;
}

export function updateRecipe(id: string, updates: Partial<Recipe>) : void {
    const next = getRecipes().map(r => (r.id === id ? { ...r, ...updates } : r ));
    saveRecipes(next);
}

export function deleteRecipe(id: string): void {
    const next = getRecipes().filter(r => r.id !== id);
    saveRecipes(next);
}