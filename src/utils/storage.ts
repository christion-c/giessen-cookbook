import type { Recipe } from "../types/recipe";

const RECIPES_KEY = "cookbook_recipes";

export function getRecipes(): Recipe[] {
    const raw = localStorage.getItem(RECIPES_KEY);
    return raw ? (JSON.parse(raw) as Recipe[]) : [];
}

export function saveRecipes(list: Recipe[]) : void {
    localStorage.setItem(RECIPES_KEY, JSON.stringify(list));
}

