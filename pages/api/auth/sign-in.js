import prisma from "../../../context/prisma";
import {withIronSession} from "next-iron-session";
import getConfig from 'next/config';
import comparePasswordWithHash from "../../../helpers/comparePasswordWithHash";

const {serverRuntimeConfig} = getConfig()

async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).send();
        return;
    }

    const {login, password} = req.body;

    if (!login || !password) {
        res.status(400).json({
            message: "login or password is missing or incorrect"
        })
        return;
    }

    const user = await prisma.user.findUnique({where: {username: login}})

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
}

export default withIronSession(handler, serverRuntimeConfig.ironSessionConfig);