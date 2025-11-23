// Handling Auth Middlewares for all HTTP requests

const adminAuth = (req, res, next) => {
  console.log("Admin Auth is getting checked!!");
  const token = "xyz";
  const isAdminAuth = token === "xyz";
  if (isAdminAuth) next();
  else res.status(401).send("Unauthorised access");
};

const userAuth = (req, res, next) => {
  console.log("User Auth is getting checked!!");
  const token = "abc123xyz";
  const isUserAuth = token === "abc";
  if (isUserAuth) next();
  else res.status(401).send("Unauthorised access");
};

module.exports = { adminAuth, userAuth };
