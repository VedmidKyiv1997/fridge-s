export enum ListType {
  SHOPPING = 'SHOPPING',
  FRIDGE = 'FRIDGE',
  FREEZER = 'FREEZER',
  HOME = 'HOME',
}

export class Product {
  id: number;
  name: string;
  bought: Date;
  location: ListType;
}
