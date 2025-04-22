import React, { useEffect, useState } from "react"; // Import React and hooks
import "./Delete.css"; // Import CSS for styling
import Nav from "../Nav/Nav"; // Import navigation component
import { Table } from "flowbite-react"; // Import Table component from Flowbite (UI library)
import axios from "axios"; // Import Axios for API requests
import { Button } from "flowbite-react";
import { motion } from "framer-motion"; // Import Framer Motion for animations
import CustomeFooter from "../Footer/Footer";

// API endpoint URL (where we fetch animal data)
const URL = "http://localhost:5000/animal";

function Delete() {
  // State to store the list of animals fetched from the server
  const [animals, setAnimals] = useState([]);

  // useEffect hook runs the fetch function when the component loads
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        // Fetch data from the API using axios (GET request)
        const response = await axios.get(URL);
        console.log("API RESPONSE:", response.data); // Log data to console for debugging

        // Set the received data into state (assuming 'animals' array exists in the response)
        setAnimals(response.data.animals || []);
      } catch (err) {
        console.error("API ERROR:", err); // Log error if API request fails
      }
    };
    fetchAnimals();
  }, []); // Empty dependency array means this runs only once when the component mounts

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Ensures the layout spans the full viewport height
      }}
    >
      <Nav /> {/* Render navigation bar */}
      <motion.div
        className="project"
        initial={{ y: -100, opacity: 0 }} // Start off-screen to the left
        animate={{ y: 0, opacity: 1 }} // Move to position with fade-in
        transition={{ duration: 1.2, ease: "easeInOut" }} // Smooth transition
      >
        <h1 className="text-3xl font-bold text-center text-white text-gray-800 mb-6">
          Delete Animal
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} // Start invisible and slightly smaller
        animate={{ opacity: 1, scale: 1 }} // Fade in and return to normal size
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ flex: 1 }} // Allow the main content to grow and fill space
      >
        <div className="table">
          <div className="overflow-x-auto">
            <Table>
              <Table.Head className="table-headers">
                <Table.HeadCell>Animal Name</Table.HeadCell>
                <Table.HeadCell>Species</Table.HeadCell>
                <Table.HeadCell>Age</Table.HeadCell>
                <Table.HeadCell>Sex</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Delete</span> {/* Hidden for accessibility */}
                </Table.HeadCell>
              </Table.Head>

              <Table.Body className="divide-y">
                {/* Check if there are animals in state */}
                {animals.length > 0 ? (
                  animals.map((animal) => (
                    // Loop through each animal and display it
                    <Table.Row
                      key={animal._id}
                      className="dark:border-gray-700"
                    >
                      <Table.Cell className="row whitespace-nowrap font-medium dark:text-white">
                        {animal.name} {/* Display animal name */}
                      </Table.Cell>
                      <Table.Cell className="row">{animal.species}</Table.Cell>{" "}
                      {/* Display species */}
                      <Table.Cell className="row">{animal.age}</Table.Cell>{" "}
                      {/* Display age */}
                      <Table.Cell className="row">{animal.sex}</Table.Cell>{" "}
                      {/* Display sex */}
                      <Table.Cell>
                        <Button
                          gradientDuoTone="purpleToBlue"
                          className="updateBtn"
                          onClick={() => handleDelete(animal._id)} // Call delete function on click
                        >
                          Delete
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))
                ) : (
                  <Table.Row>
                    <Table.Cell
                      colSpan="5"
                      className="text-center text-gray-500"
                    >
                      No animals found
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </div>
        </div>
      </motion.div>

      {/* Footer always at the bottom */}
      <div style={{ marginTop: "auto" }}>
        <CustomeFooter />
      </div>
    </div>
  );
}

// Function to handle delete action
const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this animal?")) {
    // Show confirmation before deleting
    try {
      await axios.delete(`${URL}/${id}`); // Send DELETE request to API
      alert("Animal deleted successfully!");
      window.location.reload(); // Refresh page to update list
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete animal.");
    }
  }
};

export default Delete;
