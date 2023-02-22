import 'reflect-metadata';
import { FindUsersRepository } from "@/domain/repositories";
import { FindUsersRepositoryImpl  } from "@/infra/mongodb/repositories";
import { LoginService } from './login';
import bcrypt from 'bcrypt';

jest.mock('../../../infra/mongodb/repositories/users/find-user')
describe('Login', () => {
  let findUserRepository: FindUsersRepository
  let loginService: LoginService

  beforeEach(() => {
    findUserRepository = new FindUsersRepositoryImpl();
    loginService = new LoginService(findUserRepository)
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('Should login', async () => {
    const payload = {
      username: "jacksparrow",
      password: "jack1234"
    }

    const user = {
      id: '1',
      name: "Jack Sparrow",
      username: "jacksparrow",
      password: "jack1234"
    }

    jest.spyOn(findUserRepository, 'findByUsername').mockImplementationOnce(async () => user)
    jest.spyOn(bcrypt, 'compareSync').mockImplementationOnce(() => true)
    const token = await loginService.execute(payload);

    expect(token).not.toBeNull();
  })

  it('Should not login if username not found', async () => {
    const payload = {
      username: "jacksparrow",
      password: "jack1234"
    }

    jest.spyOn(findUserRepository, 'findByUsername').mockImplementationOnce(async () => null)
    jest.spyOn(bcrypt, 'compareSync').mockImplementationOnce(() => true)

    expect(loginService.execute(payload)).rejects.toThrow(new Error(`username/password provided does not match`))
  })

  it('Should not login if password does not match', async () => {
    const payload = {
      username: "jacksparrow",
      password: "jack1234"
    }

    const user = {
      id: '1',
      name: "Jack Sparrow",
      username: "jacksparrow",
      password: "jack1234"
    }

    jest.spyOn(findUserRepository, 'findByUsername').mockImplementationOnce(async () => user)
    jest.spyOn(bcrypt, 'compareSync').mockImplementationOnce(() => false)

    expect(loginService.execute(payload)).rejects.toThrow(new Error(`username/password provided does not match`))
  })
});
