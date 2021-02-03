import { OfferType } from '../../enums/offerType.enum';
import { CartItem } from '../cart/cartItem';
import { Offer } from './offer';
import { PriceOffer } from './priceOffer';

describe('QuantityOffer', () => {
  let priceOffer: Offer;
  beforeEach(() => {
    priceOffer = new PriceOffer({
      discount: 50,
      productId: 'p1'
    });
  });
  describe('constructor', () => {
    it('should create', () => {
      expect(priceOffer.type).toBe(OfferType.Price);
      expect(priceOffer.productId).toBe('p1');
      expect(priceOffer.discount).toBe(50);
    });
  });

  describe.each([
    ['p1', 80, 50],
    ['p2', 90, 90]
  ])(
    'applyOffer %s with %i unit price',
    (productId, unitPrice, discountedPrice) => {
      it(`should have quantity reduced to ${discountedPrice}`, () => {
        const item = new CartItem(productId, unitPrice);
        item.updateUnitPrice(90);
        priceOffer.applyOffer(item);
        expect(item.discountedUnitPrice).toBe(discountedPrice);
      });
    }
  );
});
