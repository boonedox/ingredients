export interface IRecipe {
  $key?: string;
  name: string;
  rank: number;
  ingredients: string[];
}

export class Recipe implements IRecipe {
  name: string;
  rank: number;
  ingredients: string[];

  constructor(name: string, rank: number, ingredients: string[] = []) {
      this.name = name;
      this.rank = rank;
      if (!Array.isArray(ingredients)) {
          ingredients = [];
      }
      this.ingredients = ingredients;
  }
}
