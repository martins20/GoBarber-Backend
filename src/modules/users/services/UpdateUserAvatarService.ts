import { join } from 'path';

import { promises } from 'fs';

import uploadConfig from '@config/upload';
import AppErro from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    user_id: string;
    avatarFileName: string;
}

class UpdateUserAvatarService {
    constructor(private usersRepository: IUsersRepository) {}

    async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppErro(
                'Only authenticated users can change avatar',
                401,
            );
        }

        if (user.avatar) {
            const userAvatarFilePath = join(
                uploadConfig.directory,
                user.avatar,
            );

            const userAvatarFileExists = await promises.stat(
                userAvatarFilePath,
            );

            if (userAvatarFileExists) {
                await promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFileName;

        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
