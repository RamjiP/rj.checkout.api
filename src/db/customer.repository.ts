import { OfferType } from '../enums/offerType.enum';
import { Customer } from '../models/customer/customer';
import { injectable } from 'tsyringe';

@injectable()
export class CustomerRepository {
  getAll(): Customer[] {
    return [
      {
        id: 'SecondBite',
        label: 'SecondBite',
        offers: [
          {
            type: OfferType.Quantity,
            productId: 'classic',
            actual: 3,
            discount: 2
          }
        ]
      },
      {
        id: 'axil',
        label: 'Axil Coffee Roasters',
        offers: [
          {
            type: OfferType.Price,
            productId: 'standout',
            discount: 299.99
          }
        ]
      },
      {
        id: 'myer',
        label: 'MYER',
        offers: [
          {
            type: OfferType.Quantity,
            productId: 'standout',
            actual: 5,
            discount: 4
          },
          {
            type: OfferType.Price,
            productId: 'premium',
            discount: 389.99
          }
        ]
      }
    ];
  }

  getByLabel(customerLabel: string): Customer {
    return this.getAll().find((c) => c.label === customerLabel);
  }
}
