import { UserModel } from '../user.model'
import { User } from './user.interface'

const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user)
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

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getAUserByIdFromDB,
}
