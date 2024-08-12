const http = require("http");
const fs = require("fs");

const servers = [
  { hostname: "192.168.39.157", port: 30081 }, // minikube ip + nodeport
  { hostname: "192.168.39.157", port: 30080 }, // minikube ip + nodeport
];

let currentServerIndex = 0;

const logToFile = (message) => {
  fs.appendFile('client.log', message + '\n', (err) => {
    if (err) {
      console.error(`Error writing to file: ${err.message}`);
    }
  });
};

const sendRequest = () => {
  const server = servers[currentServerIndex];

  const options = {
    hostname: server.hostname,
    port: server.port,
    path: "/?message=Hi",
    method: "GET",
  };

  const req = http.request(options, (res) => {
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });
    res.on("end", () => {
      const timestamp = new Date().toISOString();
      const logMessage = `[${timestamp}] Response from ${server.hostname}:${server.port} - ${data}`;
      console.log(logMessage); 
      logToFile(logMessage); 
    });
  });

  req.on("error", (e) => {
    const timestamp = new Date().toISOString();
    const errorMessage = `[${timestamp}] Problem with request: ${e.message}`;
    console.error(errorMessage); 
    logToFile(errorMessage);    
  });

  req.end();

  currentServerIndex = (currentServerIndex + 1) % servers.length;
};

setInterval(sendRequest, 1000);
