import React, { useState } from 'react'
import './About.css'
import Nav from '../Nav/Nav'
import { motion } from 'framer-motion';
import { Button, Label, TextInput } from "flowbite-react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';

const URL = 'http://localhost:5000/animal';

function About() {

    const navigate = useNavigate();
    const [animal, setAnimals] = useState({
        name: '',
        species: '',
        age: '',
        sex: ''
    });

    const handleChange = (e) => {
        setAnimals((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(animal);
        await sendRequest();
        navigate('/search');
    }

    const sendRequest = async() => {
        try
            {await axios.post(URL, {
                name: String(animal.name),
                species: String(animal.species),
                age: parseInt(animal.age),
                sex: String(animal.sex),
            });
            alert('Animal added successfully!');
        }
        catch (err) {
            console.error('API ERROR:', err);
            alert('Something went wrong. Please try again.');
            window.location.reload();
        }
    }

  return (
    <div style={{display: "flex", flexDirection: "column", minHeight: "100vh",}}>
        <Nav />
        <div className='about'>
            <motion.div 
                className='project'
                initial={{ x: -100, opacity: 0 }} // Start off-screen to the left
                animate={{ x: 0, opacity: 1 }}  // Move to position with fade-in
                transition={{ duration: 0.75, ease: "easeInOut" }}  // Smooth transition
            >
                <h1>Add Animals</h1>
                <form onSubmit={handleSubmit}>
                    <Label className='label'>Name</Label>
                    <TextInput className='input' name='name' placeholder="Enetr Animal Name" type='text' onChange={handleChange} required />
                    <Label className='label'>Species</Label>
                    <TextInput className='input' name='species' placeholder="Enter Animal Species" type='text' onChange={handleChange} required/>
                    <Label className='label'>Age (Years)</Label>
                    <TextInput className='input' name='age' placeholder="Enter Animal Age" type='number' onChange={handleChange} required/>
                    <Label className='label'>Sex</Label>
                    <TextInput className='input' name='sex' placeholder="Enter Animal Sex" type='text' onChange={handleChange} required/>

                    <Button gradientDuoTone="purpleToBlue" type='submit' className='updateBtn'>Submit</Button>
                </form>
            </motion.div>

            <motion.div
                initial={{ x: 100, opacity: 0 }} // Start position (from below and invisible)
                animate={{ x: 0, opacity: 1 }} // End position (in place and visible)
                transition={{ duration: 0.75, ease: "easeInOut" }} // Animation duration and effect
            >
                <div className='about-image'>
                    <img src='./res/res1.png' alt='favicon' />
                </div>
            </motion.div>

        </div>
        
        <div style={{ marginTop: "auto" }}>
            <Footer />
        </div>
    </div>
  )
}

export default About