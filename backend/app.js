const express = require("express");
const cors = require("cors"); // Import the cors package
const userRouter = require("./src/routes/user");
const { signin } = require("./src/controllers/user");
require("dotenv").config();
require("./src/db/configue");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors()); // Use the cors middleware

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>app test</h1>");
});

app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`server start on port ${PORT}`);
});
