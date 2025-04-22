import React, { useEffect, useState } from 'react';
import './Update.css';
import Nav from '../Nav/Nav';
import axios from 'axios';
import { Button, Modal, TextInput } from "flowbite-react";
import { motion } from 'framer-motion';
import CustomeFooter from '../Footer/Footer';

const URL = 'http://localhost:5000/animal';

function Update() {
  const [animals, setAnimals] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);  // Modal visibility state
  const [selectedAnimal, setSelectedAnimal] = useState(null);  // Selected animal data for update
  const [updatedData, setUpdatedData] = useState({
    name: '',
    species: '',
    age: '',
    sex: ''
  }); // Holds the updated data from the modal
  const [successMessage, setSuccessMessage] = useState('');  // Holds the success message

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await axios.get(URL);
        console.log('API RESPONSE:', response.data);
        setAnimals(response.data.animals || []);
      } catch (err) {
        console.error('API ERROR:', err);
      }
    };
    fetchAnimals();
  }, []);

  // Handle the update of an animal's data
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${URL}/${selectedAnimal._id}`, updatedData);
      console.log('Update successful:', response.data);
      setAnimals(animals.map(animal => 
        animal._id === selectedAnimal._id ? { ...animal, ...updatedData } : animal
      ));
      setModalOpen(false);  // Close modal after successful update
      setSuccessMessage("Animal's data is updated!");  // Set the success message
      setTimeout(() => setSuccessMessage(''), 5000);  // Clear the success message after 3 seconds
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  // Open modal with selected animal's data
  const handleOpenModal = (animal) => {
    setSelectedAnimal(animal);
    setUpdatedData({
      name: animal.name,
      species: animal.species,
      age: animal.age,
      sex: animal.sex
    });
    setModalOpen(true);
  };

  return (
    <div style={{display: "flex", flexDirection: "column", minHeight: "100vh",}}>
      <Nav />
      <motion.div
        className='project'
        initial={{ y: -100, opacity: 0 }} // Start off-screen to the left
        animate={{ y: 0, opacity: 1 }}  // Move to position with fade-in
        transition={{ duration: 1.2, ease: "easeInOut" }}  // Smooth transition
      >
        <h1 className="text-3xl font-bold text-center text-white text-gray-800 mb-6">Update Animal</h1>
      </motion.div>

      {/* Success Message */}
      {successMessage && (
        <div className="text-center text-green-600 font-semibold mt-4 mb-4 ml-4 p-2 bg-green-100 rounded-md">
          {successMessage}
        </div>
      )}

      <motion.div
        initial={{ x: 100, opacity: 0 }} // Start position (from below and invisible)
        whileInView={{ x: 0, opacity: 1 }}  
        viewport={{ once: true, amount: 0 }}  // Trigger when 30% is visible
        transition={{ duration: 0.75, ease: "easeInOut" }} // Animation duration and effect
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 card-container">
          {animals.length > 0 ? (
            animals.map((animal) => (
              <div key={animal._id} className="card bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-all w-full">
                <h2 className="text-xl font-semibold text-purple-700">{animal.name}</h2>
                <p><strong>Species:</strong> {animal.species}</p>
                <p><strong>Age:</strong> {animal.age}</p>
                <p><strong>Sex:</strong> {animal.sex}</p>
                <Button gradientDuoTone="purpleToBlue" className='updateBtn' onClick={() => handleOpenModal(animal)}>Update</Button>
              </div>
            ))
          ) : (
            <h2 className="text-center text-gray-500 text-xl col-span-full">Loading Animals...</h2>
          )}
        </div>
      </motion.div>

      {/* Modal for updating animal data */}
      {modalOpen && (
        <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
          <Modal.Header className='update-title text-3xl font-bold text-center text-gray-800'>Update Animal</Modal.Header>
          <Modal.Body className='update-modal'>
            <div className="flex flex-col gap-4">
                <label className='label'>Animal Name</label>
              <TextInput
                label="Name"
                value={updatedData.name}
                onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
              />
              <label className='label'>Animal Species</label>
              <TextInput
                label="Species"
                value={updatedData.species}
                onChange={(e) => setUpdatedData({ ...updatedData, species: e.target.value })}
              />
              <label className='label'>Animal Age</label>
              <TextInput
                label="Age"
                value={updatedData.age}
                onChange={(e) => setUpdatedData({ ...updatedData, age: e.target.value })}
              />
              <label className='label'>Animal Sex</label>
              <TextInput
                label="Sex"
                value={updatedData.sex}
                onChange={(e) => setUpdatedData({ ...updatedData, sex: e.target.value })}
              />
            </div>
          </Modal.Body>
          <Modal.Footer className='update-modal'>
            <Button color="gray" onClick={() => setModalOpen(false)}>Close</Button>
            <Button color="purple" onClick={handleUpdate}>Update</Button>
          </Modal.Footer>
        </Modal>
      )}

        <div style={{ marginTop: "auto" }}>
            <CustomeFooter />
        </div>
    </div>
  );
}

export default Update;
