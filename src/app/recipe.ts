export interface IRecipe {
  $key?: string;
  name: string;
  rank: number;
}

export class Recipe implements IRecipe {
  name: string;
  rank: number;

  constructor(name: string, rank: number) {
      this.name = name;
      this.rank = rank;
  }
}
