import nc from "next-connect";
import hashPassword from "../../../helpers/hashPassword";
import { createUser } from "../../../services/userService";
import { ironSessionMiddleware } from "../../../helpers/apiMiddlewares";

export default nc()
  .use(ironSessionMiddleware)
  .post(async (req, res) => {
    const { login, password1, password2 } = req.body;

    if (!login || !password1 || !password2) {
      res
        .status(400)
        .json({ message: "login or password is missing or incorrect" });
      return;
    }

    if (!login.match(/^.{3,32}#[0-9]{4}$/i)) {
      res.status(400).json({
        message:
          "The username should be your discord username with tag after it, e.g. Qwerty#1234",
      });
      return;
    }

    if (password1 !== password2) {
      res.status(400).json({ message: "passwords doesn't match" });
      return;
    }

    if (password1.length > 50) {
      res.status(400).json({
        message: "Your password must be shorter than 50 characters",
      });
      return;
    }

    if (password1.length < 6) {
      res.status(400).json({
        message: "Your password must be longer than 5 characters",
      });
      return;
    }

    try {
      await createUser(login, hashPassword(password1));
      req.session.set("user", { login });
      await req.session.save();
    } catch (e) {
      res
        .status(400)
        .json({ message: "User with that username already exist" });
      return;
    }

    res.status(200).send();
  })
  .all((req, res) => {
    // Respond with an error if requested method is not allowed
    res.writeHead(405, { Allow: "POST" }).send();
  });
