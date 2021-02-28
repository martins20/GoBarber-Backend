import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let listProviderMonthAvailability: ListProviderMonthAvailabilityService;
let fakeAppoitmentsRepository: FakeAppointmentsRepository;

describe('ListProviderMonthAvailabilityService', () => {
    beforeEach(() => {
        fakeAppoitmentsRepository = new FakeAppointmentsRepository();
        listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
            fakeAppoitmentsRepository,
        );
    });

    it('should be able to list the month availability from provider', async () => {
        await fakeAppoitmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2021, 1, 21, 8, 0, 0),
        });

        await fakeAppoitmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2021, 1, 21, 9, 0, 0),
        });

        await fakeAppoitmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2021, 1, 21, 9, 0, 0),
        });

        await fakeAppoitmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2021, 1, 21, 10, 0, 0),
        });

        await fakeAppoitmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2021, 1, 21, 11, 0, 0),
        });

        await fakeAppoitmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2021, 1, 21, 12, 0, 0),
        });

        await fakeAppoitmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2021, 1, 21, 13, 0, 0),
        });

        await fakeAppoitmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2021, 1, 21, 14, 0, 0),
        });

        await fakeAppoitmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2021, 1, 21, 15, 0, 0),
        });

        await fakeAppoitmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2021, 1, 21, 16, 0, 0),
        });

        await fakeAppoitmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2021, 1, 21, 10, 0, 0),
        });

        await fakeAppoitmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2021, 1, 22, 8, 0, 0),
        });

        const availability = await listProviderMonthAvailability.execute({
            provider_id: 'user',
            year: 2021,
            month: 2,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { day: 19, available: true },
                { day: 20, available: true },
                { day: 21, available: false },
                { day: 22, available: true },
            ]),
        );
    });
});
