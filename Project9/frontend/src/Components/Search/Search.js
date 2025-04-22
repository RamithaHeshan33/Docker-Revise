import React, { useEffect, useState } from 'react';
import Nav from '../Nav/Nav';
import axios from 'axios';
import './Search.css';
import { motion } from 'framer-motion';
import Footer from '../Footer/Footer';

const URL = 'http://localhost:5000/animal';

function Search() {
    const [animals, setAnimals] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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

    // Filter animals based on search term
    const filteredAnimals = animals.filter((animal) => 
        animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.age.toString().includes(searchTerm) ||
        animal.sex.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{display: "flex", flexDirection: "column", minHeight: "100vh",}}>
            <Nav />
            <motion.div
                className='project'
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
            >
                <h1 className="text-3xl font-bold text-center text-white text-gray-800 mb-6">Search Animal</h1>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="search-input" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </motion.div>
            
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.75, ease: "easeInOut" }}
            >
                <div className="card-container">
                    {filteredAnimals.length > 0 ? (
                        filteredAnimals.map((animal) => (
                            <div key={animal._id} className="card bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-all w-full">
                                <h2 className="text-xl font-semibold text-purple-700">{animal.name}</h2>
                                <p><strong>Species:</strong> {animal.species}</p>
                                <p><strong>Age:</strong> {animal.age}</p>
                                <p><strong>Sex:</strong> {animal.sex}</p>
                            </div>
                        ))
                    ) : (
                        <h2 className="text-center text-gray-500 text-xl col-span-full">No Animals Found</h2>
                    )}
                </div>
            </motion.div>

            <div style={{ marginTop: "auto" }}>
                <Footer />
            </div>
        </div>
    );
}

export default Search;
