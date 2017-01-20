import { Ingredient } from './ingredient';

export interface IRecipe {
  $key?: string;
  name: string;
  rank: number;
  ingredients: Ingredient[];
}

export class Recipe implements IRecipe {
  name: string;
  rank: number;
  ingredients: Ingredient[];

  constructor(name: string, rank: number, ingredients: Ingredient[] = []) {
      this.name = name;
      this.rank = rank;
      if (!Array.isArray(ingredients)) {
          ingredients = [];
      }
      this.ingredients = ingredients;
  }
}
