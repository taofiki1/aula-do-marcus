import express from 'express';
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient();

const app = express();

app.use(express.json())
app.use(cors('exp://192.168.0.147:8081'))



app.get('/users', async (req, res) => {
  let users = [];
  if (req.query) {
    users = await prisma.user.findMany({
      where: {
        name: req.query.name,
        email: req.query.email,
        password: req.query.password
      }
    })
  } else {
    users = await prisma.user.findMany()
  }

  res.status(200).json(users)

})

app.post('/users', async (req, res) => {

  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,

    }
  })
  res.status(201).json(req.body)

})
app.put('/users/:id', async (req, res) => {

  await prisma.user.update({
    where: {
      id: req.params.id
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password

    }
  })
  res.status(201).json(req.body)
})

app.delete('/users/:id', async (req, res) => {

  await prisma.user.delete({
    where: {
      id: req.params.id
    },

  })
  res.status(200).json({ message: "Usuario deletado" })
})


app.listen(3000)