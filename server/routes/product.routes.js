import express from 'express'
	import productCtrl from '../controllers/product.controller.js' 
	const router = express.Router()
	router.route('/api/products') 
	.get(productCtrl.searchByName)
	.get(productCtrl.list)
	.post(productCtrl.create)
	router.route('/api/products/:id') 
	.get(productCtrl.read)
	.put(productCtrl.update) 
	.delete(productCtrl.remove)
router.param('id', productCtrl.productByID)
// router.route('/api/products').get(productCtrl.searchByName)
// router.route('/api/products').post(productCtrl.create) 
// router.route('/api/products').get(productCtrl.list)
router.route('/api/products/:id').get(productCtrl.read)
router.route('/api/products/:id').put(productCtrl.update)
router.route('/api/products/:id').delete(productCtrl.remove)


export default router
