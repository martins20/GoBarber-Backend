import Appointment from "../models/appointment";
import { startOfHour } from "date-fns";
import { getCustomRepository } from "typeorm";

import AppointmentsRepository from "../repositories/AppointmentsRepository";

interface Request {
    provider: string;
    date: Date;
}

// Dependency Inversion (SOLID)

class CreateAppointmentService {
    async execute({
        date: parsedDate,
        provider,
    }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository
        );

        const appointmentDate = startOfHour(parsedDate);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(
            appointmentDate
        );

        if (findAppointmentInSameDate)
            throw Error("This appointment is already booked");

        const appointment = appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
