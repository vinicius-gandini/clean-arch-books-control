import { container } from 'tsyringe';

import { LoginService } from '@/application/services';
import { Login } from '@/domain/services';

import { ServiceKeys } from './keys';

container.registerSingleton<Login>(ServiceKeys.LOGIN, LoginService);
