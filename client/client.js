const http = require("http");

const servers = [
  { hostname: "192.168.39.157", port: 30081 }, // minikube ip + nodeport
  { hostname: "192.168.39.157", port: 30080 }, // minikube ip + nodeport
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
