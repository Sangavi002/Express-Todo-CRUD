// Import required modules
const express = require('express');
const fs = require('fs');

// Initialize Express server
const server = express();

// Middleware to parse JSON requests
server.use(express.json());

// Route to get all todos from the database
server.get("/data",(req,res) => {
  const data = fs.readFileSync("./db.json","utf-8");
  res.send(data);
})

// Route to add a new todo to the database
server.post("/addData",(req,res) => {
  console.log(req.body);
  const data = fs.readFileSync("./db.json","utf-8");
  const parsedData = JSON.parse(data);
  parsedData.todos.push(req.body);
  fs.writeFileSync("./db.json",JSON.stringify(parsedData));
  res.send("got the data")
})

// Route to update the status of todos with even IDs from false to true
server.put("/updateStatus", (req, res) => {
  const data = fs.readFileSync("./db.json", "utf-8");
  const parsedData = JSON.parse(data);
  
  // Iterate through todos and update status for even IDs if status is false
  parsedData.todos.forEach(todo => {
    if (todo.id % 2 === 0 && todo.status === false) {
      todo.status = true;
    }
  });

  fs.writeFileSync("./db.json", JSON.stringify(parsedData));
  res.send("Status updated for todos with even IDs if status was false.");
});

// Route to delete all todos whose status is true
server.delete("/delete", (req, res) => {
  const data = fs.readFileSync("./db.json", "utf-8");
  const parsedData = JSON.parse(data);

  // Filter out todos with status true
  parsedData.todos = parsedData.todos.filter(todo => !todo.status);

  fs.writeFileSync("./db.json", JSON.stringify(parsedData));
  res.send("Todos with status true deleted successfully.");
});

// Start the server and listen on port 3000
server.listen(3000,() => {
    console.log("server is running")
});