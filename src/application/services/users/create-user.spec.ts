import 'reflect-metadata';
import { CreateUserRepository, FindUsersRepository } from "@/domain/repositories";
import { CreateUserRepositoryImpl, FindUsersRepositoryImpl,  } from "@/infra/mongodb/repositories";
import { CreateUserService } from "./create-user";

jest.mock('../../../infra/mongodb/repositories/users/create-user')
jest.mock('../../../infra/mongodb/repositories/users/find-user')
describe('CreateUser', () => {
  let createUserRepository: CreateUserRepository
  let findUserRepository: FindUsersRepository
  let createUserService: CreateUserService

  beforeEach(() => {
    createUserRepository = new CreateUserRepositoryImpl();
    findUserRepository = new FindUsersRepositoryImpl();
    createUserService = new CreateUserService(createUserRepository, findUserRepository)
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('Should create a user', async () => {
    const payload = {
      name: "Jack Sparrow",
	    username: "jacksparrow",
	    password: "jack1234"
    }

    jest.spyOn(findUserRepository, 'findByUsername').mockImplementationOnce(async () => null)
    jest.spyOn(createUserRepository, 'create').mockImplementationOnce(async (payload) => payload)
    const createdUser = await createUserService.create(payload);

    expect(createdUser.name).toBe(payload.name);
  })

  it('Should not create a user with the same username', async () => {
    const payload = {
      name: "Jack Sparrow",
	    username: "jacksparrow",
	    password: "jack1234"
    }

    jest.spyOn(findUserRepository, 'findByUsername').mockImplementationOnce(async () => payload)
    jest.spyOn(createUserRepository, 'create').mockImplementationOnce(async (payload) => payload)

    expect(createUserService.create(payload)).rejects.toThrow(new Error(`User with the username: ${payload.username} already exists`))
  })
});
