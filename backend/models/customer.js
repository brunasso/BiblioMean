import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    roleId: {type: mongoose.Schema.ObjectId, ref: "roles"},
    registerDate: {type: Date, default: Date.now},
    dbStatus: Boolean
});

const customer = mongoose.model('customer', customerSchema);

export default customer;