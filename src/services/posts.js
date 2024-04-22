const getPostsWhereDao = require('../dao/posts_get_where.js')
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

const getKdPosts = async (term) => {
    return getPostsWhereDao.getPostsWhere(
        {
            where: 
            {
                userId: {
                    in: (await prisma.user.findMany(
                        {
                            where: {
                                userRoleId: (await prisma.userRole.findUnique({
                                    where: {
                                        roleName: "KdAdmin"
                                    }
                                })).id
                            }
                        }
                    )).map(usr => usr.id)
                },
                title: {
                    contains: term
                }
            },
            include:
            {
                user: true
            }
        }
        )
}

const getStPosts = async (term) => {
    return getPostsWhereDao.getPostsWhere(
        {
            where: 
            {
                userId: {
                    in: (await prisma.user.findMany(
                        {
                            where: {
                                userRoleId: (await prisma.userRole.findUnique({
                                    where: {
                                        roleName: "StAdmin"
                                    }
                                })).id
                            }
                        }
                    )).map(usr => usr.id)
                },
                title: {
                    contains: term
                }
            },
            include:
            {
                user: true
            }}
        )
}

const insertPost = async (post) => {
    const insertedPost = await prisma.post.create({data: {content: post.content, title: post.title, userId: post.user.id}})
}

const deletePost = async (id) => {
    const del = await prisma.post.delete({where: {id: id}})
}

module.exports = {
    getKdPosts: getKdPosts,
    getStPosts: getStPosts,
    insertPost: insertPost,
    deletePost: deletePost
}