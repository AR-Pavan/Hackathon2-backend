import express from 'express'
import { client } from '../index.js'
import { adminauth } from '../middleware/adminauth.js'
import { auth } from '../middleware/auth.js'
import { ObjectId } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router()

router.get('/',adminauth,async(req,res)=>{
    const orders = await client.db('database')
                            .collection('orders')
                            .find(req.query)
      res.send(orders)
})

export const ordersRouter = router