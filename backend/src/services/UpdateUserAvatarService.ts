import { getRepository } from "typeorm";
import { join } from "path";

import { promises, unlink } from "fs";

import uploadConfig from "../config/upload";
import AppErro from "../errors/AppError";

import User from "../models/User";

interface Request {
    user_id: string;
    avatarFileName: string;
}

class UpdateUserAvatarService {
    async execute({ user_id, avatarFileName }: Request): Promise<User> {
        const UsersRepository = getRepository(User);

        const user = await UsersRepository.findOne(user_id);

        if (!user) {
            throw new AppErro(
                "Only authenticated users can change avatar",
                401
            );
        }

        if (user.avatar) {
            //Deletar avatar

            const userAvatarFilePath = join(
                uploadConfig.directory,
                user.avatar
            );

            const userAvatarFileExists = await promises.stat(
                userAvatarFilePath
            );

            if (userAvatarFileExists) {
                await promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFileName;

        await UsersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
