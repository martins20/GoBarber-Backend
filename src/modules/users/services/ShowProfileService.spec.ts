import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let updateProfile: ShowProfileService;
let fakeUsersRepository: FakeUsersRepository;

describe('ShowProfileService', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        updateProfile = new ShowProfileService(fakeUsersRepository);
    });

    it('should be able to show the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '132456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
        });

        expect(updatedUser).toBeInstanceOf(User);
    });

    it('should not be able to update profile with non-existent user', async () => {
        await expect(
            updateProfile.execute({
                user_id: 'non-existent-user',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
