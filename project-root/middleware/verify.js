const jwt = require("jsonwebtoken");

const authorizeToken = (req, res, next) => {
  const token = req.headers.authorizeToken?.split(" ")[1];

  if (!token) return res.status(401).send({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(500).send({ message: "Not found, Please login first" });
  }
};

const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return res.status(403).send({ message: "Access Denied" });
    }
    next();
  };
};

module.exports = { authorizeRole, authorizeToken };
