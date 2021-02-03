import { OfferType } from '../../enums/offerType.enum';
import { OfferBuilder } from './offerBuilder';
import { PriceOffer } from './priceOffer';
import { QuantityOffer } from './quantityOffer';

describe('OfferBuilder', () => {
  describe.each([
    [OfferType.Quantity, QuantityOffer],
    [OfferType.Price, PriceOffer]
  ])('Offer type %s ', (offerType, offerInstanceType) => {
    it(`should create ${offerInstanceType.name} object`, () => {
      const obj = OfferBuilder.construct({
        discount: 5,
        actual: 6,
        type: offerType,
        productId: 'p1'
      });
      expect(obj).toBeInstanceOf(offerInstanceType);
    });
  });
});
