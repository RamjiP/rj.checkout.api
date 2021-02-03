import { Cart } from '../models/cart/cart';
import { CheckoutRequest } from '../models/checkoutRequest';
import { inject, injectable } from 'tsyringe';
import { DiscountService } from './discount.service';

@injectable()
export class CartService {
  constructor(
    @inject(DiscountService) private discountService: DiscountService
  ) {}

  checkout(checkoutRequest: CheckoutRequest): Cart {
    const cart = new Cart(checkoutRequest);
    this.discountService.applyDiscount(cart);
    return cart;
  }
}
