import mongoose from 'mongoose'
import config from '../../config'
import { UserModel } from '../user.model'
import { User } from './user.interface'
import bcrypt from 'bcrypt'

const createUserIntoDB = async (userData: User) => {
  //instance method
  const user = new UserModel(userData)

  if (await user.isUserExists(userData.userId)) {
    throw new Error('user already exists')
  }
  const result = await user.save()
  return result
}

const getAllUserFromDB = async () => {
  const result = UserModel.find()
  return result
}

const getAUserByIdFromDB = async (userId: number) => {
  const result = UserModel.findOne({ userId })
  return result
}

const updateAUserByIdFromDB = async (userId: number, userData: User) => {
  if (userData.password) {
    userData.password = await bcrypt.hash(
      userData.password,
      Number(config.bcrypt_salt),
    )
  }

  const result = await UserModel.findOneAndUpdate({ userId }, userData, {
    new: true,
  })

  return result
}

const deleteUserByIdFromDB = async (userId: number) => {
  const result = UserModel.updateOne({ userId }, { isDeleted: true })
  return result
}

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getAUserByIdFromDB,
  updateAUserByIdFromDB,
  deleteUserByIdFromDB,
}
