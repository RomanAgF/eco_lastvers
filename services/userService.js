import prisma from "../context/prisma";

export async function findUser(username) {
    return await prisma.user.findUnique({where: {username}})
}

export async function createUser(username, hashedPassword) {
    return await prisma.user.create({
        data: {username, password: hashedPassword}
    })
}