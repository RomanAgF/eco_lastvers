import comparePasswordWithHash from "../../../helpers/comparePasswordWithHash";
import {findUser} from "../../../services/userService";
import nc from "next-connect";
import {ironSessionMiddleware} from "../../../helpers/apiMiddlewares";


export default nc()
    .use(ironSessionMiddleware)
    .post(async (req, res) => {
        const {login, password} = req.body;

        if (!login || !password) {
            res.status(400).json({message: "login or password is missing or incorrect"})
            return;
        }

        const user = await findUser(login);

        if (!user) {
            res.status(403).json({message: "User doesn't exist"});
            return;
        }

        if (comparePasswordWithHash(password, user.password)) {
            req.session.set("user", {login});
            await req.session.save();
            res.status(200).send();
        } else {
            res.status(403).json({message: "login or password is missing or incorrect"});
        }
    })
    .all((req, res) => {
        // Respond with an error if requested method is not allowed
        res.writeHead(405, {Allow: "POST"}).send()
    })