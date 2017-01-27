import { Ingredient } from './ingredient';

export interface ICategory {
  $key?: string;
  name: string;
  ingredients: string[];
}
export class Category {
    name: string;
    ingredients: string[];
    selectedIngredients: Ingredient[];
    constructor(name: string, ingredients: string[], selectedIngredients: Ingredient[]) {
        this.name = name;
        this.ingredients = ingredients;
        this.selectedIngredients = selectedIngredients;
    }
}
