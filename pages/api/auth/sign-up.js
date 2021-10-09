import prisma from "../../../context/prisma";
import {withIronSession} from "next-iron-session";
import getConfig from 'next/config';
import hashPassword from "../../../helpers/hashPassword";
import {createGameSession, findGameSession} from "../../../services/gameSessionService";

const {serverRuntimeConfig} = getConfig()

async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).send();
        return
    }

    const {login, password1, password2} = req.body;

    // TODO: login validator

    if (!login || !password1 || !password2) {
        res.status(400).json({
            message: "login or password is missing or incorrect"
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
        await prisma.user.create({
            data: {
                username: login,
                password: hashPassword(password1)
            }
        })

        const gameSession = await findGameSession(login);
        if (!gameSession) {
            await createGameSession(login);
        }

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