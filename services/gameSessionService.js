import prisma from "../context/prisma";
import {DateTime} from "luxon"

export async function incrementProgress(username) {
    const gameSession = await findGameSession(username);
    return await prisma.gameSession.update({
        where: {username},
        data: {progress: gameSession.progress + 1}
    })
}

export async function findGameSession(username) {
    return await prisma.gameSession.findUnique({where: {username}})
}

export async function setGameSessionStatus(username, status) {
    return await prisma.gameSession.update({where: {username}, data: {status}})
}

export async function activateHint(username, hint) {
    return await prisma.gameSession.update({
        where: {username},
        data: {[hint]: 3}
    })
}

export async function deactivateHint(username, hint) {
    return await prisma.gameSession.update({
        where: {username},
        data: {[hint]: 2}
    })
}

export async function updateGameSessionTime(username, time) {
    return await prisma.gameSession.update({
        where: {username},
        data: {endTime: time}
    })
}

export async function findOrCreateGameSession(username) {
    const endTime = DateTime.local().plus({seconds: 30}).setZone("Europe/Moscow").toISO();
    return await prisma.gameSession.upsert({where: {username}, update: {}, create: {username, endTime}});
}