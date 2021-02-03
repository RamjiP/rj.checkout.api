import { OfferType } from '../../enums/offerType.enum';

export interface CustomerOffer {
  type: OfferType;
  productId: string;
  actual?: number;
  discount: number;
}
