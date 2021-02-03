import { OfferType } from '../../enums/offerType.enum';
import { CartItem } from '../cart/cartItem';
import { Offer } from './offer';
import { QuantityOffer } from './quantityOffer';

describe('QuantityOffer', () => {
  let quantityOffer: Offer;
  beforeEach(() => {
    quantityOffer = new QuantityOffer({
      discount: 5,
      actual: 6,
      productId: 'p1'
    });
  });
  describe('constructor', () => {
    it('should create', () => {
      expect(quantityOffer.type).toBe(OfferType.Quantity);
      expect(quantityOffer.productId).toBe('p1');
      expect(quantityOffer.discount).toBe(5);
      expect(quantityOffer.actual).toBe(6);
    });
  });

  describe.each([
    ['p1', 8, 7],
    ['p1', 16, 14],
    ['p1', 5, 5]
  ])(
    'applyOffer %s with %i quantity',
    (productId, quantity, discountedQuantity) => {
      it(`should have quantity reduced to ${discountedQuantity}`, () => {
        const item = new CartItem(productId, quantity);
        quantityOffer.applyOffer(item);
        expect(item.discountedQuantity).toBe(discountedQuantity);
      });
    }
  );
});
