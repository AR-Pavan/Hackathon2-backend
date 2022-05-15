import express from 'express'
import { ObjectId } from 'mongodb'
import { client } from '../index.js'

const router = express.Router()

router.get('/', async (req, res) => {
	res.send(await client.db('database').collection('cart').find(req.query))
})

export const cartRouter = router