const express = require("express");
const connectDB = require("./config/db");
const postRoute = require("./routes/posts");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//connect to DB
connectDB();



app.use("/post", postRoute);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`server running on port ${port}`));
