export type Book = {
  id: string;
  name: string;
  author: string;
  publisher: string;
  pages: number;
  synopsis: string;
  status: BookStatus;
};

export enum BookStatus {
  rented = 'rented',
  available = 'available',
  not_available = 'not_available',
}

export type EditBook = {
  name?: string;
  author?: string;
  publisher?: string;
  pages?: number;
  synopsis?: string;
  status?: BookStatus;
};
