const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const rand = require('../src/utils/rand.js')


const prismaClient = new PrismaClient()

const initDB = async () => {

    await prismaClient.post.deleteMany()
    await prismaClient.user.deleteMany()
    await prismaClient.userRole.deleteMany()


    const roleCount = await prismaClient.userRole.createMany({
        data: [
            {roleName: "SuperAdmin"},
            {roleName: "KdAdmin"},
            {roleName: "StAdmin"},
            {roleName: "Kadet"},
            {roleName: "Staresina"},
        ]
    })

    const userCount = await prismaClient.user.createMany(
        {
            data: [
                {
                    username: "suad1",
                    password: bcrypt.hashSync("suad1", 10),
                
                    email: "user1@mail.com",
                    userRoleId:
                     (await prismaClient.userRole.findUnique(
                        {
                            where: {roleName: "SuperAdmin"}
                        })).id
                },
                {
                    username: "kdad1",
                    password:  bcrypt.hashSync("kdad1", 10),
                    email: "user2@mail.com",
                    userRoleId:
                     (await prismaClient.userRole.findUnique(
                        {
                            where: {roleName: "KdAdmin"}
                        })).id
                },
                {
                    username: "stad1",
                    password:  bcrypt.hashSync("stad1", 10),
                    email: "user3@mail.com",
                    userRoleId:
                     (await prismaClient.userRole.findUnique(
                        {
                            where: {roleName: "StAdmin"}
                        })).id
                },
                {
                    username: "kadet1",
                    password:  bcrypt.hashSync("kadet1", 10),
                    email: "user4@mail.com",
                    userRoleId:
                     (await prismaClient.userRole.findUnique(
                        {
                            where: {roleName: "Kadet"}
                        })).id
                },
                {
                    username: "staresina1",
                    password:  bcrypt.hashSync("staresina1", 10),
                    email: "user5@mail.com",
                    userRoleId:
                     (await prismaClient.userRole.findUnique(
                        {
                            where: {roleName: "Staresina"}
                        })).id
                }
            ]
        }
    )

    const kdPostCount = await prismaClient.post.createMany({data:
        [
            {userId: (await prismaClient.user.findUnique({where: {username: "kdad1"}})).id, title: "Хуманитарна акција - Осми март", content: "Позивамо вас да се придружите нашој хуманитарној акцији скупљања новца поводом Међународног дана Жена, који се обележава 8. марта. Овај дан је прилика да показујемо солидарност и подршку женама широм света, као и да се заједно ангажујемо у борби зa родну равноправност и права жена. Новац прикупљен овом акцијом"},
            {userId: (await prismaClient.user.findUnique({where: {username: "kdad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)},
            {userId: (await prismaClient.user.findUnique({where: {username: "kdad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)},
            {userId: (await prismaClient.user.findUnique({where: {username: "kdad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)},
            {userId: (await prismaClient.user.findUnique({where: {username: "kdad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)},
            {userId: (await prismaClient.user.findUnique({where: {username: "kdad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)},
            {userId: (await prismaClient.user.findUnique({where: {username: "kdad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)},
            {userId: (await prismaClient.user.findUnique({where: {username: "kdad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)},
            {userId: (await prismaClient.user.findUnique({where: {username: "kdad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)},
            {userId: (await prismaClient.user.findUnique({where: {username: "kdad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)},
            {userId: (await prismaClient.user.findUnique({where: {username: "kdad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)},
            {userId: (await prismaClient.user.findUnique({where: {username: "kdad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)}
        ]
    })

    
    const stPostCount = await prismaClient.post.createMany({data:
        [
            {userId: (await prismaClient.user.findUnique({where: {username: "stad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)},
            {userId: (await prismaClient.user.findUnique({where: {username: "stad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)},
            {userId: (await prismaClient.user.findUnique({where: {username: "stad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)},
            {userId: (await prismaClient.user.findUnique({where: {username: "stad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)},
            {userId: (await prismaClient.user.findUnique({where: {username: "stad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)},
            {userId: (await prismaClient.user.findUnique({where: {username: "stad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)},
            {userId: (await prismaClient.user.findUnique({where: {username: "stad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)},
            {userId: (await prismaClient.user.findUnique({where: {username: "stad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)},
            {userId: (await prismaClient.user.findUnique({where: {username: "stad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)},
            {userId: (await prismaClient.user.findUnique({where: {username: "stad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)},
            {userId: (await prismaClient.user.findUnique({where: {username: "stad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)},
            {userId: (await prismaClient.user.findUnique({where: {username: "stad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)},
            {userId: (await prismaClient.user.findUnique({where: {username: "stad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)},
            {userId: (await prismaClient.user.findUnique({where: {username: "stad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)},
            {userId: (await prismaClient.user.findUnique({where: {username: "stad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)},
            {userId: (await prismaClient.user.findUnique({where: {username: "stad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)},
            {userId: (await prismaClient.user.findUnique({where: {username: "stad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)},
            {userId: (await prismaClient.user.findUnique({where: {username: "stad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)},
            {userId: (await prismaClient.user.findUnique({where: {username: "stad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)},
            {userId: (await prismaClient.user.findUnique({where: {username: "stad1"}})).id, title: rand.getRandString(10), content: rand.getRandString(200)}
        ]
    })

    console.log(kdPostCount + "\n===============================================================\n" + stPostCount)
}

const checkDB = async () => {


   /* console.log("===================!!!!!===================")
    console.log(stPosts)
    console.log("=====================================================")
    console.log(kdPosts)*/
}

initDB().then(() => checkDB())