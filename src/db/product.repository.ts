import { injectable } from 'tsyringe';
import { Product } from '../models/product/product';

@injectable()
export class ProductRepository {
  getAll(): Product[] {
    return [
      {
        id: 'classic',
        label: 'Classic Ad',
        price: 269.99
      },
      {
        id: 'standout',
        label: 'Stand out Ad',
        price: 322.99
      },
      {
        id: 'premium',
        label: 'Premium Ad',
        price: 394.99
      }
    ];
  }

  getById(id: string): Product {
    return this.getAll().find((p) => p.id === id);
  }
}
