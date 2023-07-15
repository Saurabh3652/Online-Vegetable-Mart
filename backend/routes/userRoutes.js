import express from 'express'
import {authUser, getUserProfile,registerUser, 
    getUsers,updateUserProfile,deleteUser} from '../controllers/userController.js'
const router = express.Router()
import { protect ,farmer} from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect,farmer,getUsers)
router.route('/:id').delete(protect,farmer,deleteUser)
router.post('/login',authUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)


export default router