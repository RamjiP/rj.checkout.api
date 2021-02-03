import { CustomerRepository } from '../db/customer.repository';
import { ProductRepository } from '../db/product.repository';
import { Cart } from '../models/cart/cart';
import { CartItem } from '../models/cart/cartItem';
import { Customer } from '../models/customer/customer';
import { CustomerOffer } from '../models/customer/customerOffer';
import { OfferBuilder } from '../models/offer/offerBuilder';
import { inject, injectable } from 'tsyringe';

@injectable()
export class DiscountService {
  constructor(
    @inject(CustomerRepository) private customerRepository: CustomerRepository,
    @inject(ProductRepository) private productRepository: ProductRepository
  ) {}

  applyDiscount(cart: Cart) {
    const customer = this.customerRepository.getByLabel(cart.customer);

    for (const item of cart.items) {
      this.applyAllCustomerOffersForCartItem(customer, item);
    }
  }

  private applyAllCustomerOffersForCartItem(
    customer: Customer,
    item: CartItem
  ) {
    const product = this.productRepository.getById(item.productId);
    if (!product) {
      return;
    }
    item.updateUnitPrice(product.price);
    if (!customer) {
      return;
    }
    this.applyAllApplicableCustomerOffersForCartItem(customer, item);
  }

  private applyAllApplicableCustomerOffersForCartItem(
    customer: Customer,
    item: CartItem
  ) {
    const applicableOffers = customer.offers.filter(
      (o) => o.productId === item.productId
    );
    for (const customerOffer of applicableOffers) {
      this.applyCustomerOfferForCartItem(customerOffer, item);
    }
  }

  private applyCustomerOfferForCartItem(
    customerOffer: CustomerOffer,
    item: CartItem
  ) {
    const offer = OfferBuilder.construct(customerOffer);
    if (!offer) {
      return;
    }
    offer.applyOffer(item);
  }
}
