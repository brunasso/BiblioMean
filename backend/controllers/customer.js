import customer from '../models/customer.js';

const registerCustomer = async(req,res) => {
    
    if (!req.body.name || !req.body.email || !req.body.password )  res.status(400).send("Incomplete data");


    const existingBook = await customer.findOne({name: req.body.name});
    if(existingBook) return res.status(200).send("The customer already exist");
    
    const customerSchema = new customer({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        dbStatus: true
    });
    
    const result = await customerSchema.save();
    if(!result) return res.status(400).send("Failed to register customer");
    
    return res.status(200).send({result});
}

const listCustomer = async(req,res)=> {
    const customerSchema = await customer.find();
    if(!customerSchema || customerSchema.length == 0) return res.status(400).send("Failed to register customer");

    return res.status(200).send(customerSchema)
}


export default {registerCustomer, listCustomer};