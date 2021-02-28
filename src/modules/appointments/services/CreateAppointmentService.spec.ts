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
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 1, 19, 12).getTime();
        });

        const appointment = await createAppointment.execute({
            date: new Date(2021, 1, 19, 13),
            user_id: 'user',
            provider_id: '123123',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123123');
        expect(appointment.user_id).toBe('user');
    });

    it('should not be able to create two appointments on the same time', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 1, 19, 10).getTime();
        });

        const appointmentDate = new Date(2021, 2, 19, 11);

        await createAppointment.execute({
            date: appointmentDate,
            provider_id: 'provider-id',
            user_id: 'user-id',
        });

        await expect(
            createAppointment.execute({
                date: appointmentDate,
                provider_id: 'provider-id',
                user_id: 'user-id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appoitment on past date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 1, 19, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2021, 0, 10, 11),
                user_id: 'user',
                provider_id: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appoitment with same user as provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 1, 19, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2021, 1, 19, 13),
                user_id: '123123',
                provider_id: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appoitment before 8am and after 5pm', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 1, 19, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2021, 1, 20, 7),
                user_id: 'user_id',
                provider_id: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);

        await expect(
            createAppointment.execute({
                date: new Date(2021, 1, 20, 18),
                user_id: 'user_id',
                provider_id: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
