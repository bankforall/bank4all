const auth = async (req, res, next) => {
  try {
    if (req.session?.user?._id) {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

module.exports = auth;
