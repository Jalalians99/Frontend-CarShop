export type Car = Omit<CarData, "_links">;

export type CarData = {
  brand: string;
  model: string;
  color: string;
  fuel: string;
  modelYear: number;
  price: number;
  _links: {
    self: {
      href: string;
    },
    car: {
      href: string;
    }
  }
}