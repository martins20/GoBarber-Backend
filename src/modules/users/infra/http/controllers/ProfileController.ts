import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
    async show(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;

        const createUser = container.resolve(ShowProfileService);

        const user = await createUser.execute({
            user_id,
        });

        return response.json(classToClass(user));
    }

    async update(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;
        const { name, email, password, old_password } = request.body;

        const createUser = container.resolve(UpdateProfileService);

        const user = await createUser.execute({
            user_id,
            name,
            email,
            old_password,
            password,
        });

        return response.json(classToClass(user));
    }
}
