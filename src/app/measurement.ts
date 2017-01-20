export interface IMeasurement {
  $key?: string;
  quantity: number;
  unit: string;
}

export class Measurement implements IMeasurement {
  quantity: number;
  unit: string;

  constructor(quantity: number, unit: string) {
      this.quantity = quantity;
      this.unit = unit;
  }
}
