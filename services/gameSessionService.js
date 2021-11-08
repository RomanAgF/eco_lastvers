import prisma from "../context/prisma";

export async function incrementProgress(username) {
  const gameSession = await findGameSession(username);
  return await prisma.gameSession.update({
    where: { username },
    data: { progress: gameSession.progress + 1 },
  });
}

export async function findGameSession(username) {
  return await prisma.gameSession.findUnique({ where: { username } });
}

export async function setGameSessionStatus(username, status) {
  return await prisma.gameSession.update({
    where: { username },
    data: { status },
  });
}

export async function setGameSessionAnswer(username, answer) {
  return await prisma.gameSession.update({
    where: { username },
    data: { answer },
  });
}

export async function findOrCreateGameSession(username, ip) {
  return await prisma.gameSession.upsert({
    where: { username },
    update: {},
    create: { username, ip },
  });
}
