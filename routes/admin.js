import express from 'express'
import { getUserbyName, genPassword } from './helper.js'
import { client } from '../index.js'
import { adminauth } from '../middleware/adminauth.js'
import { ObjectId } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router()
//getting users list
router.get('/',adminauth,async(req,res)=>{
	const user = await getUserbyName(req.nody.username)
	if(user.role == 'admin'){
		res.send('you are admin')
	}else{
		res.send('Not a Admin')
	}
})

//creating the Admin
router.post('/createadmin',adminauth,async(req,res)=>{
	const {username,password} = req.body
	const hashedPassword = await genPassword(password);
	console.log(username,hashedPassword)
	res.send(
		await client 
		        .db('database')
				.collection('users')
				.inserOne({username,password:hashedPassword,role:'admin'})
	)
})

//Creating the Product
router.put('/addProducts',adminauth,async (req,res)=>{
	const {
		productName,
		productCompany,
		productCategory,
		productImage,
		productAmount,
		productDuration
	} = req.body
	const product = await client.db('database')
	                            .collections('products')
								.findOne({name:productName})
    if(product){
		res.status(400).send('Product Already exists');
	}else{								
	res.send(await client
		                 .db('database')
						 .collection('products')
						 .insertOne({
							 name:productName,
							 company:productCompany,
							 category:productCategory,
							 image:productImage,
							 amount:productAmount,
							 duration:productDuration
						 })
						 )
	}
})



export const adminRouter = router