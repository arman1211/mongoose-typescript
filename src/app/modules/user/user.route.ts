import express from 'express'
import { UserController } from './user.controller'

const router = express.Router()

//will call user controller
router.put('/:userId', UserController.updateAUserById)

router.put('/:userId/orders', UserController.AddOrderById)

router.post('/', UserController.createUser)

router.get('/', UserController.getAllUser)

router.get('/:userId', UserController.getAUserById)

router.get('/:userId/orders', UserController.getAllOrderById)

router.delete('/:userId', UserController.deleteUser)

export const UserRouter = router
