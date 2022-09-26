// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");

// const app = express();

// var corsOptions = {
//   origin: "http://127.0.01:8888" || "http://localhost:8081" ||  "http://localhost:6868",
// };

// app.use(cors(corsOptions));

// // parse requests of content-type - application/json
// app.use(express.json());

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));

// const db = require("./app/models");

// db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// // simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to zen application." });
// });

// require("./app/routes/turorial.routes")(app);

// // set port, listen for requests
// const PORT = process.env.NODE_DOCKER_PORT || 4040;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });
const http = require("http");
const app = require("./app/app");
const Sequelize = require("sequelize");
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
// const port = normalizePort(process.env.PORT || "4040");
 const port = process.env.NODE_DOCKER_PORT || 4040;
app.set("port", port);

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is alread in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
  console.log(process.env.jwt);
});

server.listen(port);
