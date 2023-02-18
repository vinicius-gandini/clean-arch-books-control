export type Books = {
  id: number;
  name: string;
  author: string;
  publisher: string;
  pages: number;
  status: BookStatus;
};

export enum BookStatus {
  rented = 'rented',
  available = 'available',
  not_available = 'not_available',
}
