const jwt = require("jsonwebtoken");

const authorizeToken = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];

  if (!token) return res.status(401).send({ data: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(500).send({ data: "Invalid token" });
  }
};

const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).send({ data: "Access Denied" });
    }
    next();
  };
};

module.exports = { authorizeRole, authorizeToken };
