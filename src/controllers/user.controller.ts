import { Request, Response } from 'express';
import { userService } from '../services/user.service';
import user from '../model/user.model';
import order from '../model/order.model';
import userValidationSchema from '../model/user.validation';
import orderValidationSchema from '../model/order.validation';
// import orderValidationSchema from '../model/order.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    const validateData = userValidationSchema.parse(userData);

    const result = await userService.createUser(validateData);

    const {
      userId,
      username,
      fullName,
      age,
      email,
      isActive,
      hobbies,
      address,
    } = result;
    const newUser = new user({
      userId,
      username,
      fullName,
      age,
      email,
      isActive,
      hobbies,
      address,
    });
    res.status(201).json({
      success: true,
      message: 'User create successfully',
      data: newUser,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsers();

    if (result) {
      res.status(200).json({
        success: true,
        message: 'User Fetched successfully',
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: 500,
        description: 'Internal Server Error',
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const result = await user.withoutPassword(userId);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'User Fetched successfully',
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: 500,
        description: 'Internal Server Error',
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const userId = req.params.userId;

    const result = await user.updateUser(userId, userData);

    if (result) {
      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: 500,
        description: 'Internal Server Error',
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const result = await user.deleteUser(userId);

    if (result) {
      res.status(200).json({
        success: true,
        message: 'User Delete successfully',
        data: 'null',
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: {
        code: 500,
        description: 'Internal Server Error',
      },
    });
  }
};

const addOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const orderData = req.body;
    const id = await user.newid(userId);
    const validateData = orderValidationSchema.parse(orderData);
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const result = await order.addOrderToUser(id, validateData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: 'null',
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const id = await user.newid(userId);

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const result = await order.getAllOrder(id);

    if (result) {
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
const totalPrice = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const id = await user.newid(userId);

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const result = await order.totalPrice(id);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addOrder,
  getAllOrder,
  totalPrice,
};
