import 'reflect-metadata';
import { container } from 'tsyringe';
import * as sinon from 'sinon';
import { OfferType } from '../enums/offerType.enum';
import { CustomerRepository } from '../db/customer.repository';
import { ProductRepository } from '../db/product.repository';
import { Cart } from '../models/cart/cart';
import { DiscountService } from './discount.service';

function createCart(customer, items) {
  return new Cart({
    customer,
    items
  });
}

const cr = sinon.createStubInstance(CustomerRepository);
const pr = sinon.createStubInstance(ProductRepository);
describe('DiscountService', () => {
  describe('applyDiscount', () => {
    beforeEach(() => {
      cr.getByLabel = sinon.stub();
      cr.getByLabel
        .withArgs('Customer 1')
        .returns({
          id: 'c1',
          label: 'Customer 1',
          offers: [
            {
              productId: 'p1',
              type: OfferType.Price,
              discount: 40
            }
          ]
        })
        .withArgs('Customer 2')
        .returns({
          id: 'c2',
          label: 'Customer 2',
          offers: [
            {
              productId: 'p1',
              type: OfferType.Quantity,
              discount: 4,
              actual: 5
            },
            {
              productId: 'p2',
              type: OfferType.Price,
              discount: 25
            }
          ]
        });

      pr.getById = sinon.stub();
      pr.getById
        .withArgs('p1')
        .returns({
          id: 'p1',
          label: 'Product 1',
          price: 50
        })
        .withArgs('p2')
        .returns({
          id: 'p2',
          label: 'Product 2',
          price: 30
        })
        .withArgs('p3')
        .returns({
          id: 'p3',
          label: 'Product 3',
          price: 100
        });

      container.register<ProductRepository>(ProductRepository, {
        useValue: pr
      });
      container.register<CustomerRepository>(CustomerRepository, {
        useValue: cr
      });
    });

    describe.each([
      [
        'Customer 1',
        ['p1', 'p2', 'p1', 'p3'],
        [
          {
            productId: 'p1',
            discountedQuantity: 2,
            discountedUnitPrice: 40,
            discountedTotal: 80
          },
          {
            productId: 'p2',
            discountedQuantity: 1,
            discountedUnitPrice: 30,
            discountedTotal: 30
          },
          {
            productId: 'p3',
            discountedQuantity: 1,
            discountedUnitPrice: 100,
            discountedTotal: 100
          }
        ]
      ],
      [
        'Customer 2',
        ['p1', 'p1', 'p1', 'p3', 'p1', 'p1'],
        [
          {
            productId: 'p1',
            discountedQuantity: 4,
            discountedUnitPrice: 50,
            discountedTotal: 200
          },
          {
            productId: 'p3',
            discountedQuantity: 1,
            discountedUnitPrice: 100,
            discountedTotal: 100
          }
        ]
      ],
      [
        'Customer 2',
        ['p1', 'p2', 'p1', 'p3'],
        [
          {
            productId: 'p1',
            discountedQuantity: 2,
            discountedUnitPrice: 50,
            discountedTotal: 100
          },
          {
            productId: 'p2',
            discountedQuantity: 1,
            discountedUnitPrice: 25,
            discountedTotal: 25
          },
          {
            productId: 'p3',
            discountedQuantity: 1,
            discountedUnitPrice: 100,
            discountedTotal: 100
          }
        ]
      ],
      [
        'Customer 3',
        ['p1', 'p2', 'p1', 'p3'],
        [
          {
            productId: 'p1',
            discountedQuantity: 2,
            discountedUnitPrice: 50,
            discountedTotal: 100
          },
          {
            productId: 'p2',
            discountedQuantity: 1,
            discountedUnitPrice: 30,
            discountedTotal: 30
          },
          {
            productId: 'p3',
            discountedQuantity: 1,
            discountedUnitPrice: 100,
            discountedTotal: 100
          }
        ]
      ]
    ])(
      'customer %s with %o items in cart',
      (customer, items, expectedItems) => {
        it('should return valid applied discounted cart', () => {
          const cart = createCart(customer, items);
          const ds = container.resolve(DiscountService);
          ds.applyDiscount(cart);
          expect(cart.items.length).toBe(expectedItems.length);
          let tot = 0;
          for (const ei of expectedItems) {
            const item = cart.items.find((i) => i.productId === ei.productId);
            expect(item).toBeDefined();
            expect(item.discountedQuantity).toBe(ei.discountedQuantity);
            expect(item.discountedUnitPrice).toBe(ei.discountedUnitPrice);
            expect(item.discountedTotal).toBe(ei.discountedTotal);
            tot += ei.discountedTotal;
          }
          expect(cart.getTotal()).toBe(tot);
        });
      }
    );
  });
});
