export interface CheckoutFormValues {
  firstName: string;
  lastName: string;
  country: string;
  state: string;
  city: string;
  address: string;
  phone: string;
  postalCode: string;
  email: string;
  orderNote: string;
}

export type FormErrors = Partial<Record<keyof CheckoutFormValues, string>>;
export type IranStatesCities = Record<string, string[]>;
