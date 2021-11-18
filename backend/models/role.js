import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
    name: String,
    description: String,
    registerDate: {type: Date, default: new Date()},
    dbStatus: Boolean
})

const role = mongoose.model("roles", roleSchema);

export default role;