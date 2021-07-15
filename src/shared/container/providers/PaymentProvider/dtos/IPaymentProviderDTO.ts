export default interface IPaymentProviderDTO {
  value: number;
  paymentId: string;
  payday: Date;
  card: {
    cardId: string;
    number: string;
    holder: string;
    expiresAt: string;
    cvv: string;
    installments: number;
  };
  user: {
    userId: string;
    name: string;
    document: string;
    email: string;
    address: {
      zipCode: string;
      street: string;
      number: string;
      complement?: string;
      neighborhood: string;
      city: string;
      state: string;
    };
  };
}
