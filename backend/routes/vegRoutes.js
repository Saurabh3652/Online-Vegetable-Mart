import express from 'express'
import {getVegById,getVegies} from '../controllers/vegController.js'
const router = express.Router()


router.route('/').get(getVegies)

router.route('/:id').get(getVegById)

export default router