import { Cart } from './cart';

describe('Cart', () => {
  let cart: Cart;
  beforeEach(() => {
    cart = new Cart({ customer: 'Ramji', items: ['p1', 'p2', 'p2'] });
  });
  describe('constructor', () => {
    it('should create valid object', () => {
      expect(cart).toBeDefined();
      expect(cart.customer).toBe('Ramji');
      expect(cart.items.length).toBe(2);
    });
  });

  describe('getTotal', () => {
    it('should return 0', () => {
      expect(cart.getTotal()).toBe(0);
    });
  });
  describe.each([
    ['p1', 1],
    ['p2', 2]
  ])('getItem %s', (productId, quantity) => {
    it('should return appropriate item', () => {
      const p = cart.getItem(productId);
      expect(p).toBeDefined();
      expect(p.quantity).toBe(quantity);
    });
  });
});
