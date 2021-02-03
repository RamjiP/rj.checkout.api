import { OfferType } from '../../enums/offerType.enum';
import { Offer } from './offer';
import { OfferOptions } from './offerOptions';
import { OfferResult } from './offerResult';

export class PriceOffer extends Offer {
  constructor(opts: OfferOptions) {
    super(OfferType.Price, opts);
  }

  protected getAppliedOfferResult(
    unitPrice: number,
    quantity: number
  ): OfferResult {
    const result = {
      discountedQuantity: quantity,
      discountedUnitPrice: this.discount
    };
    return result;
  }
}
