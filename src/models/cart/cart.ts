import { CheckoutRequest } from '../checkoutRequest';
import { CartItem } from './cartItem';

export class Cart {
  public customer: string;
  public items: CartItem[];
  constructor(checkoutRequest: CheckoutRequest) {
    this.customer = checkoutRequest.customer;
    this.constructCartItems(checkoutRequest);
  }

  getTotal(): number {
    return this.items
      .map((i) => i.discountedTotal)
      .reduce((tot, cost) => tot + cost, 0);
  }

  getItem(productId: string): CartItem {
    return this.items.find((i) => i.productId === productId);
  }

  private constructCartItems(checkoutRequest: CheckoutRequest) {
    const groupedItems = this.getGroupedItemsWithQuantity(checkoutRequest);
    const items = [];
    for (const gi in groupedItems) {
      items.push(new CartItem(gi, groupedItems[gi]));
    }
    this.items = items;
  }

  private getGroupedItemsWithQuantity(checkoutRequest: CheckoutRequest) {
    return checkoutRequest.items.reduce((rv, item) => {
      rv[item] = (rv[item] || 0) + 1;
      return rv;
    }, {});
  }
}
