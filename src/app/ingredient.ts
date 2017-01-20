export interface IIngredient {
  $key?: string;
  name: string;
}

export class Ingredient implements IIngredient {
  name: string;

  constructor(name: string) {
      this.name = name;
  }
}
