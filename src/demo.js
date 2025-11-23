// const express = require("express");
// const app = express();

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

// This will handle all the HTTP methods - API calls to routes that matches '/user'
// app.use("/user", (req, res) => {
//   res.send("Hello from the user");
// });

// This will only handle 'GET' API call to '/user'
// app.get("/user", (req, res) => {
//   res.send({ firstName: "Mradul", lastName: "Tiwari" });
// });

// This will only handle 'POST' API call to '/user'
// app.post("/user", (req, res) => {
//   Saving data to DB
//   res.send("Data successfully saved to the Database!!");
// });

// This will only handle 'DELETE' API call to '/user'
// app.delete("/user", (req, res) => {
//   Deleting user data
//   res.send("Deleted successfully!!");
// });

// app.get("/user/:id/:name/:password", (req, res) => {
//   console.log(req.query);
//   console.log(req.params);
//   res.send("Hello");
// });

// Syntax of 'use' -> (NOTE: The syntax is same for all other HTTP Methods)
// app.use("/route", RH1, RH2, RH3, RH4, ...RHn)
// app.use("/route", [RH1, RH2, RH3, RH4, ...RHn])
// app.use("/route", RH1, [RH2, RH3], RH4, RH5, [RH6] ......)

// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("Handling the route user");
//     next();
//     res.send("Response1");
//   },
//   [(req, res, next) => {
//     console.log("Handling the route user 2");
//     res.send("Response2");
//     next();
//   }],
//   [(req, res, next) => {
//     console.log("Handling the route user 3");
//     res.send("Response3");
//     next();
//   },
//   (req, res, next) => {
//     console.log("Handling the route user 4");
//     res.send("Response4");
//     next();
//   }],
//   (req, res) => {
//     console.log("Handling the route user 5");
//     res.send("Response5");
//   },
// );

// Alternate way to write multiple route-handlers
// app.use("/user", (req, res, next) => {
//   console.log("Handling the route user");
//   next();
// });
// app.use("/user", (req, res) => {
//   console.log("Handling the route user 2");
//   res.send("Response 2");
// });

// API call => Middleware chain => Route/Request handler
// app.use("/", (req, res, next) => {
//   res.send("Handling / route");
//   console.log("Handling / route");
//   next();
// });
// app.get(
//   "/user",
//   (req, res, next) => {
//     console.log("Handling /user route");
//     next();
//   },
//   (req, res, next) => {
//     res.send("1st Route Handler");
//   },
//   (req, res, next) => {
//     res.send("2nd Route Handler");
//   }
// );

// app.listen(7777, () => {
//   console.log("Server is successfully listening on port 7777...");
// });