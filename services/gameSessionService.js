import prisma from "../context/prisma";
import {DateTime} from "luxon"

export async function incrementProgress(username) {
    const gameSession = await findGameSession(username);
    await prisma.gameSession.update({
        where: {username},
        data: {progress: gameSession.progress + 1}
    })
}

export async function findGameSession(username) {
    return await prisma.gameSession.findUnique({where: {username}})
}

export async function setGameSessionStatus(username, status) {
    await prisma.gameSession.update({where: {username}, data: {status}})
}

export async function activateHint(username, hint) {
    await prisma.gameSession.update({
        where: {username},
        data: {[hint]: 3}
    })
}

export async function deactivateHint(username, hint) {
    await prisma.gameSession.update({
        where: {username},
        data: {[hint]: 2}
    })
}

export async function updateGameSessionTime(username, time) {
    await prisma.gameSession.update({
        where: {username},
        data: {endTime: time}
    })
}

export async function findOrCreateGameSession(username) {
    const now = DateTime.local().setZone("Europe/Moscow").toISO();
    const endTime = DateTime.local().plus({seconds: 30}).setZone("Europe/Moscow").toISO();
    console.log("findOrCreate:", now)
    console.log("findOrCreate:", endTime)
    return await prisma.gameSession.upsert({where: {username}, update: {}, create: {username, endTime}});
}