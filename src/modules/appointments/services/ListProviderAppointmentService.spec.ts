import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentService from './ListProviderAppointmentService';

let listProviderAppointment: ListProviderAppointmentService;
let fakeAppoitmentsRepository: FakeAppointmentsRepository;

describe('ListProviderAppointmentService', () => {
    beforeEach(() => {
        fakeAppoitmentsRepository = new FakeAppointmentsRepository();
        listProviderAppointment = new ListProviderAppointmentService(
            fakeAppoitmentsRepository,
        );
    });

    it('should be able to list the appoitments on a specific day', async () => {
        const appoitment1 = await fakeAppoitmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2021, 1, 21, 8, 0, 0),
        });

        const appoitment2 = await fakeAppoitmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2021, 1, 21, 9, 0, 0),
        });

        const appoitments = await listProviderAppointment.execute({
            provider_id: 'provider',
            year: 2021,
            month: 1,
            day: 21,
        });

        expect(appoitments).toEqual([appoitment1, appoitment2]);
    });
});
