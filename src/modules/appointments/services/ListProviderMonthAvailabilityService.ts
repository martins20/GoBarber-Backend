import { injectable, inject } from 'tsyringe';
import { getDate, getDaysInMonth } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    month: number;
    year: number;
}

type IResponse = Array<{
    day: number;
    available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appoitmentsRepository: IAppointmentsRepository,
    ) {}

    async execute({ provider_id, year, month }: IRequest): Promise<IResponse> {
        const appoitments = await this.appoitmentsRepository.findAllInMonthFromProvider(
            { provider_id, month, year },
        );

        const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

        const eachDayArray = Array.from(
            { length: numberOfDaysInMonth },
            (value, index) => index + 1,
        );

        const availability = eachDayArray.map(day => {
            const appointmentInDay = appoitments.filter(appointment => {
                return getDate(appointment.date) === day;
            });

            return {
                day,
                available: appointmentInDay.length < 10,
            };
        });

        return availability;
    }
}

export default ListProviderMonthAvailabilityService;
