const express = require('express');
const AnimalController = require('../AnimalControllers/AnimalController');
const AnimalModel = require('../AnimalModel/AnimalModel');
const router = express.Router();

//routes
router.get('/', AnimalController.getAllAnimals);
router.post('/', AnimalController.AddAnimal);
router.get('/:id', AnimalController.getAnimalsById);
router.put('/:id', AnimalController.updateAnimal);
router.delete('/:id', AnimalController.deleteAnimal);

module.exports = router;
