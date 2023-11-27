import { Schema, model, connect, Model } from 'mongoose'

export type Orders = {
  productName: string
  price: number
  quantity: number
}
export type Address = {
  street: string
  city: string
  country: string
}
export type fullName = {
  firstName: string
  lastName: string
}

//type for User

export type User = {
  userId: number
  username: string
  password: string
  fullName: fullName
  age: number
  email: string
  isActive: boolean
  hobbies: Array<string>
  address: Address
  orders: Array<Orders>
  isDeleted: boolean
}

export type UserMethod = {
  isUserExists(id: number): Promise<User | null>
}

export type UserModels = Model<User, {}, UserMethod>
