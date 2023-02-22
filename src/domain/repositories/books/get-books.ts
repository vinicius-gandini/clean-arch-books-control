import { Book } from "@/domain/entities";

export interface GetBooksRepository {
  getBooks(query: GetBooksRepository.Query): Promise<GetBooksRepository.Result>;
}

export namespace GetBooksRepository {
  export type Query = Omit<Book, 'id' | 'pages' | 'synopsis'> & {id?: string, pages?: number, synopsis?: string};

  export type Result = any;
}
