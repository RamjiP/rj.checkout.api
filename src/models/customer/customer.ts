import { CustomerOffer } from './customerOffer';

export interface Customer {
  id: string;
  label: string;
  offers: CustomerOffer[];
}
