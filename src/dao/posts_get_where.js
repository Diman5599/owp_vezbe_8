const { PrismaClient } = require('@prisma/client')

const prismaClient = new PrismaClient()

const getPostsWhere = async (query) => {
    const postsList = await prismaClient.post.findMany(query)
    return postsList;
}

module.exports = {
    getPostsWhere: getPostsWhere
}