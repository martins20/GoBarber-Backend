import AppError from '@shared/errors/AppError';

import CreateAppointmentService from './CreateAppointmentService';
import FakeAppoitmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let createAppointment: CreateAppointmentService;
let fakeAppointmentsRepository: FakeAppoitmentsRepository;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppoitmentsRepository();
        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );
    });

    it('should be able to create a new appointment', async () => {
        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: '123123',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123123');
    });

    it('should not be able to create two appointments on the same time', async () => {
        const appointmentDate = new Date(2021, 0, 22, 13);

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: '123123',
        });

        expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
