import { OfferResult } from '../offer/offerResult';

export class CartItem {
  private _unitPrice: number;
  private _total: number;
  private _discountedQuantity: number;
  private _discountedUnitPrice: number;

  constructor(public productId: string, public quantity: number) {
    this._discountedQuantity = quantity;
    this.updateUnitPrice(0);
  }

  updateUnitPrice(unitPrice: number) {
    this._unitPrice = unitPrice;
    if (!this._discountedUnitPrice) {
      this._discountedUnitPrice = unitPrice;
    }
    this._total = unitPrice * this.quantity;
  }

  updateDiscountedResult(result: OfferResult) {
    this._discountedQuantity =
      result.discountedQuantity <= this._discountedQuantity
        ? result.discountedQuantity
        : this._discountedQuantity;
    this._discountedUnitPrice =
      result.discountedUnitPrice <= this._discountedUnitPrice
        ? result.discountedUnitPrice
        : this._discountedUnitPrice;
  }

  get unitPrice() {
    return this._unitPrice;
  }

  get total() {
    return this._total;
  }

  get discountedTotal() {
    return this._discountedQuantity * this._discountedUnitPrice;
  }

  get discountedQuantity() {
    return this._discountedQuantity;
  }

  get discountedUnitPrice() {
    return this._discountedUnitPrice;
  }
}
