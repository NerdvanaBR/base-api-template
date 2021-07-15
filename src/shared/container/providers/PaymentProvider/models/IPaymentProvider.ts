import IPaymentProviderDTO from '../dtos/IPaymentProviderDTO';

export default interface IPaymentProvider {
  createPayment(data: IPaymentProviderDTO): Promise<void>;
  cancelPayment(paymentId: string): Promise<void>;
}
