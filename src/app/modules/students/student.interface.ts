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

export type Student = {
  userId: number
  username: string
  password: string
  fullName: {
    firstName: string
    lastName: string
  }
  age: number
  email: string
  isActive: boolean
  hobbies: [string]
  address: Address
  orders: Orders
}
