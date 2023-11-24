import express from 'express'
import { UserController } from './user.controller'

const router = express.Router()

//will call user controller
router.post('/', UserController.createUser)
router.get('/', UserController.getAllUser)

router.get('/:userId', UserController.getAUserById)

export const UserRouter = router
