import { v4 } from "uuid";

class Appointments {
    id: string;
    provider: string;
    date: Date;

    constructor({ provider, date }: Omit<Appointments, "id">) {
        this.id = v4();
        (this.provider = provider), (this.date = date);
    }
}

export default Appointments;
