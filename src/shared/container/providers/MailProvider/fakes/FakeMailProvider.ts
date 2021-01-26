import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

export default class FakeEmailProvider implements IMailProvider {
    private messages: ISendMailDTO[] = [];

    async sendMail(message: ISendMailDTO): Promise<void> {
        this.messages.push(message);
    }
}
