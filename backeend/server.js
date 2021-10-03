const express = require("express");
const dotenv = require("dotenv");

const auth = require("./routes/auth");

const server = express();

dotenv.config();

server.use("/auth", auth);

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`server running on port ${port}...`));
