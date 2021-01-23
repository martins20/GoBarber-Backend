import AppError from '@shared/errors/AppError';

import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let createUser: CreateUserService;
let fakeUsersRepository: FakeUsersRepository;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        createUser = new CreateUserService(fakeUsersRepository);
    });

    it('should be able to create a new user', async () => {
        const User = await createUser.execute({
            name: 'john Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        expect(User).toHaveProperty('id');
    });

    it('should not be able to create a new user with same email from another', async () => {
        await createUser.execute({
            name: 'john Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        expect(
            createUser.execute({
                name: 'john Doe',
                email: 'johndoe@example.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
