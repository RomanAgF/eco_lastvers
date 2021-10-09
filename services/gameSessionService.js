import prisma from "../context/prisma";

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

export async function createGameSession(username) {
    await prisma.gameSession.create({data: {username}})
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