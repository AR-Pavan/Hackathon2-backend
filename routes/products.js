import express from 'express'
import { ObjectId } from 'mongodb'

import dotenv from 'dotenv'
import {client} from '../index.js'
dotenv.config()
const router = express.Router()

router.get('/', async (req, res) => {
	res.send(await client.db('database')
	                 .collection('products')
					 .find(req.query))
	
})

router.put('/addProduct',async(req,res)=>{
	const{
		id,
		name,
		category,
		image,
		duration,
		cost
	} = req.body
  const product = await client.db('database')
                               .collection('products')
							   .findOne({name:name})
			if(product){
				res.status(400).send('Product already there!')
			}
			else{
				res.send(await client.db('database')
				               .collection("products").insertOne({
								   id:id,
								   name:name,
								   category:category,
								   image:image,
								   duration:duration,
								   cost:cost,
							   }))
			}
})


export const productsRouter = router

