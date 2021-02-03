import 'reflect-metadata';
import { container } from 'tsyringe';
import { DiscountService } from './discount.service';
import * as sinon from 'sinon';
import { CartService } from './cart.service';

const ds = sinon.createStubInstance(DiscountService);

describe('CartService', () => {
  beforeEach(() => {
    ds.applyDiscount.returnsThis();
    container.register<DiscountService>(DiscountService, {
      useValue: ds
    });
  });

  it('checkout should apply discount and returns cart', () => {
    const cart = container.resolve(CartService).checkout({
      customer: 'ramji',
      items: ['p1', 'p2', 'p1']
    });
    expect(cart).toBeDefined();
    expect(cart.customer).toBe('ramji');
    expect(cart.items.length).toBe(2);
    expect(cart.items[0].productId).toBe('p1');
    expect(cart.items[0].quantity).toBe(2);
    expect(cart.items[1].productId).toBe('p2');
    expect(cart.items[1].quantity).toBe(1);
  });
});
