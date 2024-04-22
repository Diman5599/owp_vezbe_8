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

module.exports = {
    checkUserRole: checkUserRole
}