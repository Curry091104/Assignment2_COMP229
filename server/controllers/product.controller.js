import Product from '../models/product.model.js'
	import extend from 'lodash/extend.js'
	import errorHandler from './error.controller.js'
	const create = async (req, res) => { 
const product = new Product(req.body) 
try {
await product.save()
return res.status(200).json({ 
message: "Successfully added a new product!"
})
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}

	const list = async (req, res) => { 
	try {
	let product = await Product.find().select('name price updated created')
	res.json(product)
	} catch (err) {
	return res.status(400).json({
	error: errorHandler.getErrorMessage(err) 
	})
	} 
	}
	const productByID = async (req, res, next, id) => { 
try {
let product = await Product.findById(id) 
if (!product)
return res.status('400').json({ 
error: "Product not found"
})
req.profile = product 
next()
} catch (err) {
return res.status('400').json({ 
error: "Could not retrieve product"
}) 
}
}
	const read = (req, res) => {
	return res.json(req.profile) 
	}

	const searchByName = async (req, res) => {
		try{
			const {name} = req.query;
			const regex = new RegExp(name, 'i');
			const matchesName = await Product.find({ name: regex }).select('name price updated created');
			
			return res.json(matchesName);
		}
		catch (err) {
			return res.status(400).json({
			error: errorHandler.getErrorMessage(err) 
			})
		}
	}

const update = async (req, res) => { 
try {
let product = req.profile
product = extend(product, req.body) 
product.updated = Date.now() 
await product.save()
res.json(product) 
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}
const remove = async (req, res) => { 
try {
let product = req.profile
let deletedProduct = await Product.findByIdAndDelete(product.id)
res.json(deletedProduct) 
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}
const removeAll = async (req, res) => {
	try{
		let deleteProducts = await Product.deleteMany()
		res.json({message: "All products deleted"})
	} catch (err){
	return res.status(400).json({
		error: errorHandler.getErrorMessage(err)
	})
}
}

export default { create, productByID, read, list, remove, update, searchByName, removeAll }
