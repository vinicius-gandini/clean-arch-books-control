import 'reflect-metadata';
import { BookStatus } from '@/domain/entities';
import { GetAllUsersRepository } from '@/domain/repositories/users/get-all-users';
import { GetAllUsersRepositoryImpl } from "@/infra/mongodb/repositories";
import { GetAllUsersService } from './get-users';

jest.mock('../../../infra/mongodb/repositories/users/get-all-users')
describe('GetAllUsers', () => {
  let getAllUsersRepository: GetAllUsersRepository
  let getAllUsersService: GetAllUsersService

  beforeEach(() => {
    getAllUsersRepository = new GetAllUsersRepositoryImpl();
    getAllUsersService = new GetAllUsersService(getAllUsersRepository)
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('Should get users', async () => {
    const payload = [{
      id: '1',
      name: "Jack Sparrow",
	    username: "jacksparrow",
	    password: "jack1234"
    }]

    jest.spyOn(getAllUsersRepository, 'getUsers').mockImplementationOnce(async () => payload)

    const users = await getAllUsersService.getUsers()
    expect(users[0].name).toBe(payload[0].name);
  })
});
