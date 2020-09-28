import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

import User from "../models/User";

import AppErro from "../errors/AppError";

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ name, email, password }: Request): Promise<User> {

        const usersRepository = getRepository(User);

        const checkUserExist = await usersRepository.findOne({
            where: { email },
        });

        if (checkUserExist) {
            throw new AppErro("Email address already user");
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;
