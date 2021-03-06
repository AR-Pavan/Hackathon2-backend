import express from 'express'
import { genPassword, getUserbyName, verifyPassword } from './helper.js'
import { client } from '../index.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

router.post('/signup', async (req, res) => {
	const { username, password } = req.body
	const hashedPassword = await genPassword(password)
	const user = await getUserbyName(username)
	console.log(user)
	if (user.length < 1) {
		await client
		         .db('database')
				 .collection('users')
				 .insertOne({
			                 username: username,
			                 password: hashedPassword,
			                 role: 'genpop',
		                    })
		res.send('User created')
	} else {
		res.status(400).send('User already exists')
	}
})

router.post('/login', async (req, res) => {
	const { username, password } = req.body
	const user = await getUserbyName(username)

	if (user) {
		const valid = await verifyPassword(password, user[0].password)
		if (valid) {
			const token = jwt.sign(
				{ _id: user[0]._id, role: user[0].role },
				process.env.SECRET
			)
			res
				.header('x-auth-token', token)
				.send({message:"you are logged in", token: token, role: user[0].role })
		} else {
			res.status(400).send('Invalid password')
		}
	} else {
		res.status(400).send('User does not exist')
	}
})

router.get('/',async function(req,res){
	const result = await client
	                    .db('database')
						.collection('users')
						.find()
						.toArray()
			res.send(result)			
})

export const usersRouter = router