const express = require("express");
const app = express();

// Order of the routes matter a lot ->
// app.use("/user/2", (req, res) => {
//   res.send("Hello from the user2");
// });
// app.use("/user", (req, res) => {
//   res.send("Hello from the user");
// });
// app.use("/test", (req, res) => {
//   res.send("Hello from the test");
// });
// app.use("/", (req, res) => {
//   res.send("Hello from the home");
// });

// This will handle all the HTTP methods - API calls to route '/user'
// app.use("/user", (req, res) => {
//   res.send("Hello from the user");
// });

// This will only handle 'GET' API call to '/user'
app.get("/user", (req, res) => {
  res.send({ firstName: "Mradul", lastName: "Tiwari" });
});

// This will only handle 'POST' API call to '/user'
app.post("/user", (req, res) => {
  // Saving data to DB
  res.send("Data successfully saved to the Database!!");
});

// This will only handle 'DELETE' API call to '/user'
app.delete("/user", (req, res) => {
  // Deleting user data
  res.send("Deleted successfully!!");
});

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});
