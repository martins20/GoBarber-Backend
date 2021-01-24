import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let updateUserAvatar: UpdateUserAvatarService;
let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;

describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeStorageProvider = new FakeStorageProvider();
        updateUserAvatar = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider,
        );
    });

    it('should be able to update avatar', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '132456',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar.jpg',
        });

        expect(user.avatar).toBe('avatar.jpg');
    });

    it('should not be able to update avatar from non existing user', async () => {
        expect(
            updateUserAvatar.execute({
                user_id: 'non-exinting-user',
                avatarFileName: 'avatar.jpg',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be delete old avata when updating new one', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '132456',
        });

        const deleteFileMethod = jest.spyOn(fakeStorageProvider, 'deleteFile');

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar.jpg',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar2.jpg',
        });

        expect(deleteFileMethod).toHaveBeenCalledWith('avatar.jpg');
        expect(user.avatar).toBe('avatar2.jpg');
    });
});
