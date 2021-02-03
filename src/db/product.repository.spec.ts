import 'reflect-metadata';
import { ProductRepository } from './product.repository';

describe('ProductRepository', () => {
  let pr: ProductRepository;
  beforeEach(() => {
    pr = new ProductRepository();
  });

  it('getAll should return 3 products', () => {
    const products = pr.getAll();
    expect(products.length).toBe(3);
  });

  describe.each([
    ['classic', 269.99],
    ['standout', 322.99],
    ['premium', 394.99]
  ])('The ad %s', (ad, cost) => {
    it(`should cost $${cost}`, () => {
      const p = pr.getById(ad);
      expect(p.id).toBe(ad);
      expect(p.price).toBe(cost);
    });
  });
});
