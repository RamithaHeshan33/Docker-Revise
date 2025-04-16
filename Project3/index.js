const express = require('express');
const app = express();

app.use("/", (req, res) => {
    res.json([
        {
            Name: "Ramitha Heshan",
            Designation: "Project Manager"
        },

        {
            Name: "Nimal Perera",
            Designation: "Software Engineer"
        },

        {
            Name: "Kasun Kumara",
            Designation: "QA Engineer"
        }
    ])
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});