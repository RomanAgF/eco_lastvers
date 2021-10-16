import {withIronSession} from "next-iron-session";
import getConfig from 'next/config';
import hashPassword from "../../../helpers/hashPassword";
import {createUser} from "../../../services/userService";

const {serverRuntimeConfig} = getConfig()

async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).send();
        return
    }

    const {login, password1, password2} = req.body;


    if (!login || !password1 || !password2) {
        res.status(400).json({
            message: "login or password is missing or incorrect"
        })
        return
    }

    if (!login.match(/^.{3,32}#[0-9]{4}$/i)) {
        res.status(400).json({
            message: "The username should be your discord username with tag after it, e.g. Qwerty#1234"
        })
        return
    }

    if (password1 !== password2) {
        res.status(400).json({
            message: "passwords doesn't match"
        })
        return
    }

    try {
        await createUser(login, hashPassword(password1))
        req.session.set("user", {login});
        await req.session.save();
    } catch (e) {
        res.status(400).json({
            message: "User with that username already exist"
        })
        return
    }

    res.status(200).send();
}

export default withIronSession(handler, serverRuntimeConfig.ironSessionConfig);