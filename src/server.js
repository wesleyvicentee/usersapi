import express from 'express'
import { PrismaClient } from './generated/prisma/index.js'

const app = express()
const port = 3000
const prisma = new PrismaClient()

app.use(express.json())

app.post('/users', async (req, res) => {
    await prisma.user.create({
        data: {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
    })

    console.log(req)
    res.send('foi')
})

app.get('/users', async (req, res) => {
    let users = []

    if(req.query) {
        const queryName = req.query.name
        const queryAge = req.query.age
        const queryEmail = req.query.email

        users = await prisma.user.findMany({
            where: {
                name: queryName,
                age: queryAge,
                email: queryEmail,
            }
        })
    } else {
        users = await prisma.user.findMany()
    }

    res.json(users)
})

app.put('/users/:id', async (req, res) => {
    const id = req.params.id

    await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        }
    })
    res.status(201).json(req.body)
})

app.delete('/users/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id,
        },
    })
    res.status(200).json({ message: "Usuário excluído" })
})

app.listen(port)
