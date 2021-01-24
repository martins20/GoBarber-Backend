import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import { v4 } from 'uuid';
import User from '../../infra/typeorm/entities/User';

class FakeUserRepository implements IUsersRepository {
    private users: User[] = [];

    async findById(id: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.id === id);

        return findUser;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.email === email);

        return findUser;
    }

    async create(userData: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, { id: v4(), ...userData });

        this.users.push(user);

        return user;
    }

    async save(user: User): Promise<User> {
        const findIndex = this.users.findIndex(
            findUser => findUser.id === user.id,
        );

        this.users[findIndex] = user;

        return user;
    }
}

export default FakeUserRepository;
