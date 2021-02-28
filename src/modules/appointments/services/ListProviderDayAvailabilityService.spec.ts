import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;
let fakeAppoitmentsRepository: FakeAppointmentsRepository;

describe('ListProviderDayAvailabilityService', () => {
    beforeEach(() => {
        fakeAppoitmentsRepository = new FakeAppointmentsRepository();
        listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
            fakeAppoitmentsRepository,
        );
    });

    it('should be able to list the day availability from provider', async () => {
        await fakeAppoitmentsRepository.create({
            provider_id: 'user',
            date: new Date(2021, 1, 21, 14, 0, 0),
        });

        await fakeAppoitmentsRepository.create({
            provider_id: 'user',
            date: new Date(2021, 1, 21, 15, 0, 0),
        });

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 1, 21, 11).getTime();
        });

        const availability = await listProviderDayAvailabilityService.execute({
            provider_id: 'user',
            year: 2021,
            month: 2,
            day: 21,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { hour: 8, available: false },
                { hour: 9, available: false },
                { hour: 10, available: false },
                { hour: 13, available: true },
                { hour: 14, available: false },
                { hour: 15, available: false },
                { hour: 16, available: true },
            ]),
        );
    });
});
