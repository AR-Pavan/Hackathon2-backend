import express from 'express'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import cors from 'cors'
import bcrypt from 'bcrypt'
import { usersRouter } from './routes/users.js'
import { adminRouter } from './routes/admin.js'
import { ordersRouter } from './routes/orders.js'
import {cartRouter} from './routes/cart.js'
import { productsRouter } from './routes/products.js';

const app = express()

dotenv.config()

// const mongo = require("./mongo");

const PORT = process.env.PORT

const MONGO_URL = process.env.MONGO_URL

async function createConnection() {
	const client = new MongoClient(MONGO_URL)
	await client.connect()
	console.log('Connected to MongoDB')
	return client
}

export const client = await createConnection()

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello World')
})

app.use('/users', usersRouter)
app.use('/admin', adminRouter)
app.use('/cart', cartRouter)
app.use('/products',productsRouter)
app.use('/orders',ordersRouter);

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`)
})

// async function genPassword(password){
// 	const NO_OF_ROUNDS = 10;
// 	const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
// 	const hashedPassword = await bcrypt.hash(password,salt);
// 	return {salt,hashedPassword};
// } 

// console.log(await genPassword('password@123'));