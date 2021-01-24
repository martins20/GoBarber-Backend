import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

// import AppErro from '@shared/errors/AppError';

// import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
    password: string;
    token: string;
}

@injectable()
class ResetPasswordService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UserTokensRepository')
        private userTokenRepository: IUserTokensRepository,
    ) {}

    async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.userTokenRepository.findByToken(token);

        if (!userToken) throw new AppError('User token does not exists.', 404);

        const user = await this.usersRepository.findById(userToken.user_id);

        if (!user) throw new AppError('User noed not exists', 404);

        user.password = password;

        await this.usersRepository.save(user);
    }
}

export default ResetPasswordService;
