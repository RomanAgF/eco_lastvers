import nc from "next-connect";
import ironSessionMiddleware from "../../../middlewares/ironSessionMiddleware";

export default nc()
  .use(ironSessionMiddleware)
  .get((req, res) => {
    req.session.destroy();
    res.redirect("/");
  })
  .all((req, res) => {
    req.session.destroy();
    res.send("Logged out");
  });
