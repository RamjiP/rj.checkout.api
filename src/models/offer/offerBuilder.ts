import { OfferType } from '../../enums/offerType.enum';
import { CustomerOffer } from '../customer/customerOffer';
import { PriceOffer } from './priceOffer';
import { QuantityOffer } from './quantityOffer';

export class OfferBuilder {
  static construct(customerOffer: CustomerOffer) {
    switch (customerOffer.type) {
      case OfferType.Price:
        return new PriceOffer({
          ...customerOffer
        });
      case OfferType.Quantity:
        return new QuantityOffer({
          ...customerOffer
        });
    }
  }
}
