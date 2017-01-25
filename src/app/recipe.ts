import { Ingredient } from './ingredient';

export interface IRecipe {
  $key?: string;
  name: string;
  uses: number;
  dateLastUsed: number;
  selected: boolean;
  ingredients: Ingredient[];
}

export class Recipe implements IRecipe {
  name: string;
  uses: number;
  ingredients: Ingredient[];
  selected: boolean;
  dateLastUsed: number;

  constructor(name: string, uses: number = 0, dateLastUsed: number = 0, ingredients: Ingredient[] = []) {
      this.name = name;
      this.uses = uses;
      this.dateLastUsed = dateLastUsed;
      if (!Array.isArray(ingredients)) {
          ingredients = [];
      }
      this.ingredients = ingredients;
  }
}
