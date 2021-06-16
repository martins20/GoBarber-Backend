import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentService from '@modules/appointments/services/ListProviderAppointmentService';

export default class ProviderAppointmentsController {
    async index(request: Request, response: Response): Promise<Response> {
        const provider_id = request.user.id;
        const { day, month, year } = request.body;

        const ProvidercreateProvider = container.resolve(
            ListProviderAppointmentService,
        );

        const appointments = await ProvidercreateProvider.execute({
            provider_id,
            day,
            month,
            year,
        });

        return response.json(appointments);
    }
}
