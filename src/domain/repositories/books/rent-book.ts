import { RentedBook } from '@/domain/entities';

export interface RentBookRepository {
  rent(body: RentBookRepository.Body): Promise<RentBookRepository.Result>;
}

export namespace RentBookRepository {
  export type Body = RentedBook;

  export type Result = any;
}
