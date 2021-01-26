import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let updateProfile: UpdateProfileService;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

describe('UpdateProfileService', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        updateProfile = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('should be able to update the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '132456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@example.com',
        });

        expect(updatedUser.name).toBe('John Trê');
        expect(updatedUser.email).toBe('johntre@example.com');
    });

    it('should not be able to change to another user email', async () => {
        await fakeUsersRepository.create({
            name: 'Test',
            email: 'test@teste.com',
            password: '132456',
        });

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '132456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Trê',
                email: 'test@teste.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update profile with non-existent user', async () => {
        await expect(
            updateProfile.execute({
                user_id: 'non-existent-user',
                name: 'John Trê',
                email: 'test@teste.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '132456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@example.com',
            old_password: '132456',
            password: '123123',
        });

        expect(updatedUser.password).toBe('123123');
    });

    it('should not be able to update the password without old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '132456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Trê',
                email: 'johntre@example.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password wrong old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '132456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Trê',
                email: 'johntre@example.com',
                old_password: 'wrong-old-password',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
