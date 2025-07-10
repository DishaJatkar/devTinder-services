const adminAuth = (req, res, next) => {
  const token = "xyz0";
  const isAdminAuthorized = "xyz0" === token;
  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized access");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
    const token = "abc0";
    const isUserAuthorized = "abc0" === token;
    if (!isUserAuthorized) {
        res.status(401).send("Unauthorized access");
        }
    else {
        next();
    }
};

module.exports = { adminAuth,userAuth };
