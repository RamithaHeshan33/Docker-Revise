const AnimalModel = require('../AnimalModel/AnimalModel');

const getAllAnimals = async(req, res, next) => {
    let animals;
    try {
        animals = await AnimalModel.find();
    }

    catch(err) {
        console.log(err);
    }

    if(!animals) {
        return res.status(404).json({
            message: 'No animals found'
        })
    }
    return res.status(200).json({animals});
}

exports.getAllAnimals = getAllAnimals;

//Add Animals
const AddAnimal = async(req, res, next) => {
    const {name, species, age, sex} = req.body;
    let animal;
    try {
        animal = await AnimalModel.create({name, species, age, sex});
    }

    catch(err) {
        console.log(err);
    }

    if(!animal) {
        return res.status(404).json({
            message: 'Animal not added'
        });
    }
    return res.status(200).json({animal});
}

exports.AddAnimal = AddAnimal;

//get animal by id
const getAnimalsById = async(req, res, next) => {
    const id = req.params.id;
    let animal;
    try {
        animal = await AnimalModel.findById(id);
    }

    catch(err) {
        console.log(err);
    }

    if(!animal) {
        return res.status(404).json({
            message: 'Animal not found'
        });
    }
    return res.status(200).json({animal});
}

exports.getAnimalsById = getAnimalsById;

//update animal
const updateAnimal = async(req, res, next) => {
    const id = req.params.id;
    const {name, species, age, sex} = req.body;
    let animal;
    try {
        animal = await AnimalModel.findByIdAndUpdate(id, {name: name, species: species, age: age, sex: sex});
        animal = await animal.save();
    }

    catch(err) {
        console.log(err);
    }

    if(!animal) {
        return res.status(404).json({
            message: 'Animal not updated'
        })
    }
    return res.status(200).json({animal});
}

exports.updateAnimal = updateAnimal;

//delete animal
const deleteAnimal = async(req, res, next) => {
    const id = req.params.id;
    let animal;

    try {
        animal = await AnimalModel.findByIdAndDelete(id);
    }

    catch(err) {
        console.log(err);
    }

    if(!animal) {
        return res.status(404).json({
            message: "Animal not deleted"
        });
    }
    return res.status(200).json({animal});
}

exports.deleteAnimal = deleteAnimal;