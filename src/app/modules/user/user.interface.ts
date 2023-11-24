import { Schema, model, connect } from 'mongoose'

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
  orders: Orders
}
