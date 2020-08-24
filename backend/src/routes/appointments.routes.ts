import { Router } from "express";
import { startOfHour, parseISO, isEqual } from "date-fns";

const appointmentsRouter = Router();

import Appointment from "../models/appointmens";

const appointments: Appointment[] = [];

appointmentsRouter.post("/", (request, response) => {
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appointments.find((appointment) =>
        isEqual(parsedDate, appointment.date)
    );

    if (findAppointmentInSameDate)
        return response.json({
            message: "This appointmenr is already booked",
        });

    const appointment = new Appointment(provider, parsedDate);

    appointments.push(appointment);

    return response.json(appointment);
});

export default appointmentsRouter;
