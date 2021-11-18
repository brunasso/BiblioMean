import role from '../models/role.js';

const registerRole = async(req, res) => {
    if(!req.body.name || !req.body.description) return res.status(400).send({message: "Incomplete data"});

    const existingRole = await role.findOne({name: req.body.name})
    if(existingRole) return res.status(400).send({message: "Roles is already register."});

    const roleSchema = new role({
        name: req.body.name,
        description: req.body.description,
        dbStatus: true
    })

    const result = await roleSchema.save();
    return !result ?
        res.status(400).send({message: "Failed to register role"})
        : res.status(200).send({ result })

    }

    const listRole = async(req, res) => {
        const roleList = await role.find();
        return roleList.length == 0 ? 
        res.status(400).send({message: "Empty role list"})
        : res.status(200).send({roleList});
    }

    const updateRole = async(req, res) => {
        if(!req.body.name || !req.body.description) return res.status(400).send({message: "Incomplete data"});

    const existingRole = await role.findOne({
        name: req.body.name,
        description: req.body.name
    })
        if(existingRole) return res.status(400).send({message: "Role is already register."});

        const roleUpdate = await role.findByIdAndUpdate(req.body._id, {
            name: req.body.name,
            description: req.body.description, 
        });

        return !roleUpdate
        ? res.status(400).send({ message: "Error editing role" })
        : res.status(200).send({ message: "Role updated" });
    }

    const deleteRole = async(req, res) => {
        const roleDelete = await role.findByIdAndDelete({name: req.params["_id"]});
        return !roleDelete ?
            res.status(400).send({message: "Failed to register role"})
            : res.status(200).send({message: "Role deleted"});
    }

    export default {registerRole, listRole, updateRole, deleteRole}