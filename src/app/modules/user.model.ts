import { Schema, model } from 'mongoose'
import { Address, Orders, User, fullName } from './user/user.interface'

//schema for User
const nameSchema = new Schema<fullName>({
  firstName: { type: String, required: true },
  lastName: { type: String },
})

const addressSchema = new Schema<Address>({
  street: { type: String },
  city: { type: String },
  country: { type: String },
})

const ordersSchema = new Schema<Orders>({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
})

const userSchema = new Schema<User>({
  userId: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: nameSchema,
  age: { type: Number },
  email: { type: String, required: true },
  isActive: { type: Boolean },
  hobbies: { type: [String] },
  address: addressSchema,
  orders: ordersSchema,
})

//model for User

export const UserModel = model<User>('User', userSchema)
