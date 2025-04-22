import React from 'react'
import './Home.css'
import Nav from '../Nav/Nav'
import { Button } from "flowbite-react";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';


function Home() {

    const navigate = useNavigate();

  return (
    <div className='home-container'>
        <Nav />
        <div className='home' >
            <motion.div 
                className='project'
                initial={{ x: -100, opacity: 0 }} // Start off-screen to the left
                animate={{ x: 0, opacity: 1 }}  // Move to position with fade-in
                transition={{ duration: 0.75, ease: "easeInOut" }}  // Smooth transition
            >
                <div className='home-image'>
                    <img src='./res/res2.png' alt='favicon' />
                </div>
            </motion.div>
            
            
            <div className='home-text'>
                <div className='home-text-content'>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }} // Start invisible and slightly smaller
                        animate={{ opacity: 1, scale: 1 }}  // Fade in and return to normal size
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                    <h1>Project Number 01</h1>
                        <p className="para">lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <br />
                        <p className="para">lorem ipsum dolor sit amet, inim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </motion.div>

                    <motion.div
                        initial={{ y: 50, opacity: 0 }} // Start position (from below and invisible)
                        animate={{ y: 0, opacity: 1 }} // End position (in place and visible)
                        transition={{ duration: 1, type: 'spring', stiffness: 120 }} // Animation duration and effect
                    >
                        <Button gradientDuoTone="purpleToBlue" className='btn' onClick={() => navigate('/add')}>Add Animals</Button>
                    </motion.div>
                </div>
            </div>
        </div>
        <div style={{ marginTop: "auto" }}>
            <Footer />
        </div>
    </div>
  )
}

export default Home