import User from '../models/User.js';

const create = (body) => User.create(body)

const findAll = () => User.find();

const findById = (id) => User.findById(id);

const updateService = (id,
    name,
    username,
    email,
    password,
    avatar,
    background
) => 
    User.findOneAndUpdate(
        {_id: id},
        { 
           name,
           username,
           email,
           password,
           avatar,
           background
    });


export default{ 
    create,
    findAll,
    findById, 
    updateService
};