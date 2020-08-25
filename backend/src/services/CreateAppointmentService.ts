import Appointment from "../models/appointment";
import { startOfHour } from "date-fns";

import AppointmentsRepository from "../repositories/AppointmentsRepository";

interface Request {
    provider: string;
    date: Date;
}

// Dependency Inversion (SOLID)

class CreateAppointmentService {
    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }

    execute({ date: parsedDate, provider }: Request): Appointment {
        const appointmentDate = startOfHour(parsedDate);

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
            appointmentDate
        );

        if (findAppointmentInSameDate)
            throw Error("This appointment is already booked");

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
