import 'reflect-metadata';
import { OfferType } from '../enums/offerType.enum';
import { CustomerRepository } from './customer.repository';

describe('CustomerRepository', () => {
  let cr: CustomerRepository;
  beforeEach(() => {
    cr = new CustomerRepository();
  });

  it('getAll should return 3 products', () => {
    const products = cr.getAll();
    expect(products.length).toBe(3);
  });

  describe.each([
    [
      'SecondBite',
      [
        {
          type: OfferType.Quantity,
          productId: 'classic',
          actual: 3,
          discount: 2
        }
      ]
    ],
    [
      'Axil Coffee Roasters',
      [
        {
          type: OfferType.Price,
          productId: 'standout',
          discount: 299.99
        }
      ]
    ],
    [
      'MYER',
      [
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
    ]
  ])('The customer %s', (name, offers) => {
    it(`should have ${offers.length}`, () => {
      const c = cr.getByLabel(name);
      expect(c.label).toBe(name);
      expect(c.offers.length).toBe(offers.length);
      for (const ind in offers) {
        const co = c.offers[ind];
        const offer = offers[ind];
        expect(co).toEqual(offer);
      }
    });
  });
});
