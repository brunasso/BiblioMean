import mongoose from 'mongoose';
import moment from 'moment';

const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    yearPublication: String,
    registerDate: {type: Date, default: Date.now},
    pages: String,
    gender: String,
    price : Number
});

const book = mongoose.model("books", bookSchema);

export default book;