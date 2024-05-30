const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

const checkUserRole = async (user) => {
    try {
        const dbUser = await prisma.user.findUnique({
            where: {
                id: user.id
            },
            include: {
                role: true
            }
        })
        return dbUser.role
    } catch (TypeError) {
        return null
    }
}

const getUserByEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    return user;
}

const insertKdUser = async (user) => {
    return prisma.user.create(
        {
            data: {
                username: user.username,
                password: user.password,
                email: user.email,
                emailVerified: false,
                userRoleId:
                 (await prisma.userRole.findUnique(
                    {
                        where: {roleName: "Kadet"}
                    })).id
            }
        }
    )
}

const verifyUserEmail = async (email) => {
    await prisma.user.update({
        where: {
            email: email
        },
        data: {
            emailVerified: true
        }
    })
}

module.exports = {
    checkUserRole: checkUserRole,
    getUserByEmail: getUserByEmail,
    insertKdUser: insertKdUser,
    verifyUserEmail: verifyUserEmail
}