import { format } from 'date-fns';
import AppError from '@shared/errors/AppError';
import { galaxPay } from '@utils/axios';
import IPaymentProviderDTO from '../dtos/IPaymentProviderDTO';
import IPaymentProvider from '../models/IPaymentProvider';

type GalaxTokenRequest = {
  token_type: string;
  access_token: string;
  expires_in: number;
};

export default class GalaxPayProvider implements IPaymentProvider {
  private async getGalaxToken(): Promise<void> {
    const galaxConfig = {
      grant_type: 'authorization_code',
      scope:
        'transactions.read transactions.write webhooks.write cards.read cards.write card-brands.read charges.read charges.write',
    };
    try {
      const {
        data: { access_token, token_type },
      } = await galaxPay.post<GalaxTokenRequest>('token', galaxConfig);
      galaxPay.defaults.headers.authorization = `${token_type} ${access_token}`;
    } catch (e: any) {
      throw new AppError(
        'Falha ao realizar pagamento, tente novamente mais tarde!',
        e.response?.status ?? 500,
      );
    }
  }

  public async createPayment({
    value,
    paymentId,
    payday,
    card: { cardId, number, holder, expiresAt, cvv, installments },
    user: { userId, name, email, address },
  }: IPaymentProviderDTO): Promise<void> {
    const galaxPayment = {
      value,
      myId: paymentId,
      payday: format(payday, 'YYYY-MM-dd'),
      mainPaymentMethodId: 'creditcard',
      PaymentMethodCreditCard: {
        Card: {
          myId: cardId,
          number,
          holder,
          expiresAt,
          cvv,
        },
        qtdInstallments: installments,
      },
      Customer: {
        myId: userId,
        name,
        document,
        emails: [email],
        Address: address,
      },
    };

    await this.getGalaxToken();

    try {
      await galaxPay.post('charges', galaxPayment);
    } catch (e: any) {
      await this.cancelPayment(paymentId);
      throw new AppError(
        'Falha ao realizar pagamento, tente novamente mais tarde!',
        e.response?.status ?? 500,
      );
    }
  }

  public async cancelPayment(paymentId: string): Promise<void> {
    await this.getGalaxToken();

    try {
      await galaxPay(`charges/${paymentId}/myId/reverse`);
    } catch (e: any) {
      throw new AppError(
        'Falha ao realizar pagamento, tente novamente mais tarde!',
        e.response?.status ?? 500,
      );
    }
  }
}
