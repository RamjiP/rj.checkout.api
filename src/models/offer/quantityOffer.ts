import { OfferType } from '../../enums/offerType.enum';
import { Offer } from './offer';
import { OfferOptions } from './offerOptions';
import { OfferResult } from './offerResult';

export class QuantityOffer extends Offer {
  constructor(opts: OfferOptions) {
    super(OfferType.Quantity, opts);
  }

  protected getAppliedOfferResult(
    unitPrice: number,
    quantity: number
  ): OfferResult {
    const result = {
      discountedQuantity: quantity,
      discountedUnitPrice: unitPrice
    };
    if (!this.actual) {
      return result;
    }
    const residue = quantity % this.actual;
    const discountedQuanity =
      ((quantity - residue) / this.actual) * this.discount;
    result.discountedQuantity = discountedQuanity + residue;
    return result;
  }
}
