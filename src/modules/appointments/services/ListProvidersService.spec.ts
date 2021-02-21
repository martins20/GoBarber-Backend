import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProvidersService from './ListProvidersService';

let updateProfile: ListProvidersService;
let fakeUsersRepository: FakeUsersRepository;

describe('ListProvidersService', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        updateProfile = new ListProvidersService(fakeUsersRepository);
    });

    it('should be able to list the providers', async () => {
        const provider1 = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '132456',
        });

        const provider2 = await fakeUsersRepository.create({
            name: 'John Tre',
            email: 'johntre@example.com',
            password: '132456',
        });

        const loggedUser = await fakeUsersRepository.create({
            name: 'John Qua',
            email: 'johnqua@example.com',
            password: '132456',
        });

        const providers = await updateProfile.execute({
            user_id: loggedUser.id,
        });

        expect(providers).toEqual([provider1, provider2]);
    });
});
