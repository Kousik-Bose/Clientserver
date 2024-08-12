const express = require("express");

const app = express();


app.use((req, res, next) => {
  const currentTime = new Date().toISOString();
  console.log(`[${currentTime}] ${req.method} ${req.url}`);
  next();
});

app.get("/", async (req, res) => {
  if (req.query.message === "Hi") {
    const currentTime = new Date().toISOString();
    console.log(`[${currentTime}] Responding with "hello from server 2"`);
    return res.send("hello from server 2");
  } else {
    res.send('Send "Hi" as a message');
  }
});

const port = 3004;
app.listen(port, () => {
  console.log(`Server running on port ${3004}`);
});
