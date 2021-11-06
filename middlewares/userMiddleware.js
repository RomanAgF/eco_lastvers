export default function userMiddleware(req, res, next) {
  const user = req.session.get("user");

  if (user) {
    req.user = user;
    return next();
  }

  req.session.destroy();
  res.status(401).send();
}