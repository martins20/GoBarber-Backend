import { Router, request, response } from "express";
import { startOfHour, parseISO } from "date-fns";

import AppointmentsRepository from "../repositories/AppointmentsRepository";

const appointmentsRouter = Router();

appointmentsRouter.post("/", (request, response) => {
    const { provider, date } = request.body;

    const parsedDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = AppointmentsRepository.findByDate(
        parsedDate
    );

    if (findAppointmentInSameDate)
        return response.json({
            message: "This appointment is already booked",
        });

    const appointment = AppointmentsRepository.create(provider, parsedDate);

    return response.json(appointment);
});

appointmentsRouter.get("/", (request, response) => {
    const appointments = AppointmentsRepository.all();

    return response.json(appointments);
});

export default appointmentsRouter;
