import customer from '../models/customer.js';
import role from '../models/role.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import moment from 'moment';

const registerCustomer = async(req,res) => {
    
    if (!req.body.name || !req.body.email || !req.body.password )  res.status(400).send("Incomplete data");


    const existingBook = await customer.findOne({name: req.body.name});
    if(existingBook) return res.status(400).send("The customer already exist");

    const hash = await bcrypt.hash(req.body.password, 10)
    
    const roleId = await role.findOne({nem: "customer"});
    if(!role) return res.status(400).send({message: "No role was assingned"});

    const customerSchema = new customer({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        roleId: roleId._id,
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

const findCustomer = async(req, res) => {
    const customerId = await customer.findById({_id : req.params["_id"]});
    return !customerId ? res.status(400).send("No search results"): res.status(200).send({customerId});
}

const updateCustomer = async(req, res) => {
    if (!req.body.name || !req.body.email || !req.body.roleId)  res.status(400).send("Incomplete data");

    let pass = "";

    if(req.body.password){
        pass = await bcrypt.hash(req.body.passowrd, 10)
    }else
    {
        const costumerFind = await costumer.findOne({email:req.body.email});
        pass = costumerFind.passowrd;
    }
    const existingCustomer = await customer.findOne({name: req.body.name, email: req.body.email, roleId: req.body.roleId, passowrd: req.body.password}); // Corroboramos que el dato que vamos a ingresar no se encuentre ya en la base de datos.
    if(existingCustomer)    return res.status(400).send("The customer already exist");

    const customerUpdate = await customer.findByIdAndUpdate(req.body._id, {name: req.body.name, email: req.body.email, roleId: req.body.roleId, password : pass});

    return !customerUpdate ? res.status(400).send("Error editing customer"): res.status(200).send({customerUpdate});
}


const deleteCustomer = async(req,res) =>{
    const customerDelete = await customer.findByIdAndDelete({_id: req.params["_id"]});
    return !customerDelete ? res.status(400).send("Customer no found") : res.status(200).send("Customer delete");
}

const login = async(req, res) => {
    if(!req.body.email || !req.body.password) return res.status(400).send({message: "Incomplete data"})

    const customerLogin = await customer.findOne({email: req.body.email});
    if(!customerLogin) return res.status(400).send({message: "Wrong email or password"});

    const hash  = await bcrypt.compare(req.body.password, customerLogin.password);
    if (!hash) return res.status(400).send({message: "Wrong email or password"});

    try {
        return res.status(200).json({
            token: jwt.sign(
                {
                    _id: customerLogin._id,
                    name: customerLogin.name,
                    email: customerLogin.email,
                    roleId: customerLogin.roleId,
                    dbStatus:true,
                    iat: moment().unix()
                },
                process.env.SK_JWT
            )
        })
    } catch (e) {
        return res.status(400).send({message: "Login error"});
    }
}

export default {registerCustomer, listCustomer, findCustomer, updateCustomer, deleteCustomer, login};