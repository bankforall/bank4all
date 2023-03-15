const jwt = require("jsonwebtoken");

const authSession = async (req, res, next) => {
  try {
    if (req.session?.user?._id) {
      req.user = req.session.user;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const authJwt = async (req, res, next) => {
  try {
    const verify_token = await jwt.verify(
      req.jwt_token,
      process.env.JWT_SECRET
    );
    req.user = verify_token;
    next();
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  const auth_split = authorization?.split(" ");
  // * เช็คว่าเป็น jwt token หรือไม่?
  if (auth_split?.[0] == "Bearer") {
    req.jwt_token = auth_split[1];
    authJwt(req, res, next);
  } else {
    authSession(req, res, next);
  }

  //   next();
};

module.exports = auth;
