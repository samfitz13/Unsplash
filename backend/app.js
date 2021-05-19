const express = require("express");
const connectDB = require("./config/db");
const postRoute = require("./routes/posts");
const cors = require("cors");

const app = express();

//connect to DB
connectDB();

app.get("/", (req, res) => res.send("test"));
app.use(cors());

app.use(express.json());

app.use("/post", postRoute);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`server running on port ${port}`));
