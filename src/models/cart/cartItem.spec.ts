import { CartItem } from './cartItem';

describe('CartItem', () => {
  let item: CartItem;
  beforeEach(() => {
    item = new CartItem('sample', 50);
  });
  describe('constructor', () => {
    it('initializes with value', () => {
      expect(item).not.toBeNull();
      expect(item.quantity).toBe(50);
      expect(item.total).toBe(0);
      expect(item.unitPrice).toBe(0);
      expect(item.discountedQuantity).toBe(50);
      expect(item.discountedUnitPrice).toBe(0);
      expect(item.discountedTotal).toBe(0);
    });
  });

  describe('updateUnitPrice', () => {
    it('valid unit price should update all relevant info', () => {
      item.updateUnitPrice(100);
      expect(item).not.toBeNull();
      expect(item.quantity).toBe(50);
      expect(item.unitPrice).toBe(100);
      expect(item.total).toBe(5000);
      expect(item.discountedQuantity).toBe(50);
      expect(item.discountedUnitPrice).toBe(100);
      expect(item.discountedTotal).toBe(5000);
    });
  });

  describe('updateDiscountedResult', () => {
    it('valid offer result should update discount total', () => {
      item.updateUnitPrice(100);
      item.updateDiscountedResult({
        discountedQuantity: 25,
        discountedUnitPrice: 75
      });
      expect(item).not.toBeNull();
      expect(item.quantity).toBe(50);
      expect(item.total).toBe(5000);
      expect(item.unitPrice).toBe(100);
      expect(item.discountedQuantity).toBe(25);
      expect(item.discountedUnitPrice).toBe(75);
      expect(item.discountedTotal).toBe(1875);
    });

    it('invalid offer result should NOT update discount ', () => {
      const item = new CartItem('sample', 50);
      item.updateUnitPrice(100);
      item.updateDiscountedResult({
        discountedQuantity: 80,
        discountedUnitPrice: 125
      });
      expect(item).not.toBeNull();
      expect(item.quantity).toBe(50);
      expect(item.total).toBe(5000);
      expect(item.unitPrice).toBe(100);
      expect(item.discountedQuantity).toBe(50);
      expect(item.discountedUnitPrice).toBe(100);
      expect(item.discountedTotal).toBe(5000);
    });
  });
});
