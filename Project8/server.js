const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/posts", async (req, res) => {
    try {
        const posts = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await posts.json();
        res.json(data);
    }
    catch(error) {
        console.error("Error fetching posts:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/posts/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const data = await post.json();
        res.json(data);
    }
    catch(error) {
        console.error("Error fetching post:", error);
        res.status(500).send("Internal Server Error");
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});