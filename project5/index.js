const express = require('express');
const app = express();

app.use("/", (req, res) => {
    res.json([
        {
            StudentName: "Ramitha Heshan",
            Email: "ramitha@gmail.com"
        },

        {
            StudentName: "Nimal Perera",
            Email: "nimal@gmail.com"
        },

        {
            StudentName: "Kasun Kumara",
            Email: "kasun@gmail.com"
        }
    ])
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});