const express = require("express");
const dotenv = require("dotenv");

const auth = require("./routes/auth");
const user = require("./routes/user");
const post = require("./routes/post");

const server = express();

dotenv.config();

server.use("/images", express.static("./images"));

server.use("/auth", auth);
server.use("/user", user);
server.use("/post", post);

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`server running on port ${port}...`));
