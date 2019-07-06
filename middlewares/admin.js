function admin(req, res, next) {
  if (!req.user.isAdmin) return res.status(403).send("Acsess denied");

  next();
}

module.exports = admin;
