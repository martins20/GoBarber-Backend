import { isEqual } from "date-fns";

import Appointment from "../models/appointmens";

class AppointmentRepository {
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }

    findByDate(date: Date): Appointment | null {
        const findAppointment = this.appointments.find((appointment) =>
            isEqual(date, appointment.date)
        );

        return findAppointment || null;
    }

    create(provider: string, date: Date): Appointment {
        const appointment = new Appointment(provider, date);

        this.appointments.push(appointment);

        return appointment;
    }
}

export default new AppointmentRepository();
