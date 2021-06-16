import { injectable, inject } from 'tsyringe';

import Appointments from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    month: number;
    year: number;
    day: number;
}

@injectable()
class ListProviderAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appoitmentsRepository: IAppointmentsRepository,
    ) {}

    async execute({
        provider_id,
        day,
        month,
        year,
    }: IRequest): Promise<Appointments[]> {
        const appoitments = await this.appoitmentsRepository.findAllInDayFromProvider(
            { provider_id, day, month, year },
        );

        return appoitments;
    }
}

export default ListProviderAppointmentService;
