import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppErro from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private AppointmentsRepository: IAppointmentsRepository,
    ) {}

    async execute({
        date: parsedDate,
        provider_id,
    }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(parsedDate);

        const findAppointmentInSameDate = await this.AppointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate)
            throw new AppErro('This appointment is already booked');

        const appointment = await this.AppointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
