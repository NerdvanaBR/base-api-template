import postmark, { ServerClient } from 'postmark';
import { inject, injectable } from 'tsyringe';
import mailConfig from '@config/mail';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

@injectable()
export default class SESMailProvider implements IMailProvider {
  private client: ServerClient;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = new postmark.Client(mailConfig.postmarkToken);
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { email } = mailConfig.defaults.from;

    await this.client.sendEmail({
      From: from?.email || email,
      To: to.email,
      Subject: subject,
      HtmlBody: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
