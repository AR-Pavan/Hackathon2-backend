import { client } from '../index.js'
import bcrypt from 'bcrypt'
//update product by id
export async function editProductById(id,productObj){
    return await client
	             .db('database')
				 .collection('products')
				 .updateOne({_id:id},{$set:productObj})
}

//deleting the product
export async function deleteProductById(id){
	return await cilent
	                .db('database')
					.collection('products')
					.deleteOne({_id:id})
}

//get product by Id
export async function getProductById(id){
	return await cilent
	                .db('database')
					.collection('products')
					.findOne({_id:id})
}

//adding the products
export async function PostProduct(newProducts){
	return await cilent
	                .db('database')
					.collection('products')
					.insertMany(newProducts)
}



export async function genPassword(password) {
	const NO_OF_ROUNDS = 10
	const salt = await bcrypt.genSalt(NO_OF_ROUNDS)
	const hashedPassword = await bcrypt.hash(password, salt)
	return hashedPassword
}

export async function getUserbyName(username) {
	return await client
		.db('database')
		.collection('users')
		.find({ username: username })
		.toArray()
}

export async function verifyPassword(password, userPassword) {
	return await bcrypt.compare(password, userPassword)
}