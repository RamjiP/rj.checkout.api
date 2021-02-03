import { OfferType } from '../../enums/offerType.enum';
import { CartItem } from '../cart/cartItem';
import { OfferOptions } from './offerOptions';
import { OfferResult } from './offerResult';

export abstract class Offer {
  type: OfferType;
  productId: string;
  actual?: number;
  discount: number;

  constructor(type: OfferType, opts: OfferOptions) {
    this.type = type;
    this.productId = opts.productId;
    this.actual = opts.actual;
    this.discount = opts.discount;
  }

  public applyOffer(item: CartItem) {
    const result = this.getAppliedOfferResult(
      item.discountedUnitPrice,
      item.discountedQuantity
    );
    if (item.productId !== this.productId) {
      return result;
    }
    item.updateDiscountedResult(result);
  }
  protected abstract getAppliedOfferResult(
    unitPrice: number,
    quantity: number
  ): OfferResult;
}
