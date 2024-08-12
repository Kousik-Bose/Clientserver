const http = require("http");

const servers = [
  { hostname: "host.docker.internal", port: 3000 }, // Server 1 we have to add a port which we will get after running a command in sever1 folder
  { hostname: "host.docker.internal", port: 3004 }, // Server 2 we have to add a port which we will get after running a command in sever2 folder
];

let currentServerIndex = 0;

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
      console.log(`[${timestamp}] Response from ${server.hostname}:${server.port} - ${data}`);
    });
  });

  req.on("error", (e) => {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] Problem with request: ${e.message}`);
  });

  req.end();


  currentServerIndex = (currentServerIndex + 1) % servers.length;
};

setInterval(sendRequest, 1000);
