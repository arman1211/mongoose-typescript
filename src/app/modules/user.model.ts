import { Schema, model } from 'mongoose'
import {
  Address,
  Orders,
  User,
  UserMethod,
  UserModels,
  fullName,
} from './user/user.interface'
import bcrypt from 'bcrypt'
import config from '../config'

//schema for User
const nameSchema = new Schema<fullName>({
  firstName: {
    type: String,
    required: true,
    message: 'Firstname is requred',
    trim: true,
  },
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

const userSchema = new Schema<User, UserModels, UserMethod>({
  userId: {
    type: Number,
    required: [true, 'User ID is required and must be unique.'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required and must be unique.'],
    unique: true,
    trim: true,
  },
  password: { type: String, required: [true, 'Password is required.'] },
  fullName: {
    type: nameSchema,
    required: [true, 'Full name is required.'],
  },
  age: { type: Number },
  email: { type: String, required: [true, 'Email is required.'] },
  isActive: { type: Boolean },
  hobbies: { type: [String] },
  address: addressSchema,
  orders: [ordersSchema],
  isDeleted: {
    type: Boolean,
    default: false,
  },
})
//midleware
userSchema.pre('save', async function (next) {
  //hashing password
  const user = this
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt))
  next()
})

userSchema.set('toJSON', {
  transform: function (doc, ret) {
    // hide the password field
    delete ret.password
    delete ret.orders
    delete ret.isDeleted
    return ret
  },
})

userSchema.post('save', function (doc, next) {
  doc.password = ''

  next()
})

//querry midleware
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})
userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})
userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

userSchema.methods.isUserExists = async function (id: number) {
  const existingUser = await UserModel.findOne({ id })
  return existingUser
}

//model for User

export const UserModel = model<User, UserModels>('User', userSchema)
