import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class AppointmentController {
    async index(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;

        const listProviders = container.resolve(ListProvidersService);

        const providers = await listProviders.execute({
            user_id: id,
        });

        return response.json(providers);
    }
}
