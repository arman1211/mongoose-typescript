import express from 'express'
import { UserController } from './user.controller'

const router = express.Router()

//will call user controller
router.post('/create-user', UserController.createUser)

export const UserRouter = router
