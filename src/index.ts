import 'reflect-metadata';
import { container } from 'tsyringe';
import * as yargs from 'yargs';
import { CheckoutRequest } from './models/checkoutRequest';
import { CartService } from './services/cart.service';
const args = yargs
  .option('customer', {
    alias: 'c',
    description: 'Name of the customer',
    demand: true
  })
  .option('items', {
    alias: 'i',
    description: 'List of items to be added in the cart with space delimiter',
    demand: true,
    type: 'array'
  }).argv;

const cartService = container.resolve(CartService);
const cart = cartService.checkout(args as CheckoutRequest);
console.log(`Total: ${cart.getTotal()}`);
