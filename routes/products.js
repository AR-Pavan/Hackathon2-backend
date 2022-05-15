import express from 'express'
import { client } from '../index.js'
import { adminauth } from '../middleware/adminauth.js'
import { auth } from '../middleware/auth.js'
import { ObjectId } from 'mongodb'
import {getProducts } from './helper.js'
import dotenv from 'dotenv'
dotenv.config()
const router = express.Router()

router.get('/', async (req, res) => {
	const filter = req.query
	const allProducts = await getProducts(filter)
	res.send(allProducts)
	
})


export const productsRouter = router

