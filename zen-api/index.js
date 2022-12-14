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
