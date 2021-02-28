import { startOfHour, isBefore, getHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppErro from '@shared/errors/AppError';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    user_id: string;
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
        user_id,
        provider_id,
    }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(parsedDate);

        if (isBefore(appointmentDate, Date.now()))
            throw new AppError("You can't create an appoitment on past date");

        if (user_id === provider_id)
            throw new AppError("You can't create an appoitment with yourself");

        if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17)
            throw new AppError(
                'You can only create appoitments between 8am and 5pm',
            );

        const findAppointmentInSameDate = await this.AppointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate)
            throw new AppErro('This appointment is already booked');

        const appointment = await this.AppointmentsRepository.create({
            provider_id,
            user_id,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
