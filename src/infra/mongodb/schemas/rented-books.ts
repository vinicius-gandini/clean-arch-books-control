import { model, Schema } from 'mongoose';

const RentedBooksSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  bookId: {
    type: String,
    required: true,
  },
  userUsername: {
    type: String,
    required: true,
  },
  bookName: {
    type: String,
    required: true,
  },
});

export const RentedBooksModel = model('RentedBooks', RentedBooksSchema);
