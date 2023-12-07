import { Request, Response } from 'express'
import { UserServices } from './user.service'
import Joi from 'joi'
import userSchemaValidateJoi from './user.validation'
import { User } from './user.interface'
const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body
    const { error, value } = userSchemaValidateJoi.validate(userData)

    if (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Something went wrong',
        error: error.details,
      })
    }

    //will call service
    const result = await UserServices.createUserIntoDB(value)

    //send response
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err.details,
    })
  }
}

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB()
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    })
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Users not found',
      error: {
        code: 404,
        description: 'Users not found',
      },
    })
  }
}

const getAUserById = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId)
    console.log(userId)
    const result = await UserServices.getAUserByIdFromDB(userId)
    console.log(result)
    if (result) {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      })
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found',
      },
    })
  }
}

const updateAUserById = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId)

    const userData = req.body.user

    const user = await UserServices.getAUserByIdFromDB(userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      })
    }

    // update data:
    const result = await UserServices.updateAUserByIdFromDB(userId, userData)

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User didnt updated',
        error: {
          code: 500,
          description: 'User didnt updated',
        },
      })
    }

    res.status(200).send({
      success: true,
      message: 'User updated successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).send({
      success: false,
      message: err.message,
      error: {
        code: 500,
        description: err.message,
      },
    })
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId)
    const result = await UserServices.deleteUserByIdFromDB(userId)
    if (result) {
      res.status(200).json({
        success: true,
        message: 'User Deleted succesfully',
        data: result,
      })
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      })
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found',
      },
    })
  }
}

//createOrder

const AddOrderById = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId)
    const orderData = req.body

    const user = await UserServices.getAUserByIdFromDB(userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    }

    const result = await UserServices.AddAnOrderByIdIntoDB(userId, orderData)

    if (!result.modifiedCount) {
      return res.status(400).json({
        success: false,
        message: "Order didn't placed successfully",
        error: {
          code: 400,
          description: "Order didn't placed successfully",
        },
      })
    }

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: {
        code: 404,
        description: err.message,
      },
    })
  }
}
//get all order

const getAllOrderById = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId)
    const orderData = req.body

    const user = await UserServices.getAUserByIdFromDB(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      })
    }

    const result = await UserServices.getAllOrderByIdFromDB(userId)

    if (!result) {
      return res.status(500).json({
        success: false,
        message: 'Orders not found',
        error: {
          code: 500,
          description: 'Order not found!',
        },
      })
    }

    res.status(200).json({
      success: true,
      message: 'all order fetched succesfully!',
      data: result[0],
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: {
        code: 404,
        description: err.message,
      },
    })
  }
}

export const UserController = {
  createUser,
  getAllUser,
  getAUserById,
  updateAUserById,
  deleteUser,
  AddOrderById,
  getAllOrderById,
}
