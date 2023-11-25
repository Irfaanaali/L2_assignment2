"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
const user_model_1 = __importDefault(require("../model/user.model"));
const order_model_1 = __importDefault(require("../model/order.model"));
const user_validation_1 = __importDefault(require("../model/user.validation"));
const order_validation_1 = __importDefault(require("../model/order.validation"));
// import orderValidationSchema from '../model/order.validation';
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const validateData = user_validation_1.default.parse(userData);
        const result = yield user_service_1.userService.createUser(validateData);
        const { userId, username, fullname, age, email, isActive, hobbies, address, } = result;
        const newUser = new user_model_1.default({
            userId,
            username,
            fullname,
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userService.getAllUsers();
        res.status(200).json({
            success: true,
            message: 'User fetch successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const result = yield user_model_1.default.withoutPassword(userId);
        res.status(200).json({
            success: true,
            message: 'User Fetched successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const userId = req.params.userId;
        const result = yield user_model_1.default.updateUser(userId, userData);
        res.status(201).json({
            success: true,
            message: 'User updated successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        const result = yield user_model_1.default.deleteUser(userId);
        res.status(200).json({
            success: true,
            message: 'User Delete successfully',
            data: 'null',
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const orderData = req.body;
        const id = yield user_model_1.default.newid(userId);
        const validateData = order_validation_1.default.parse(orderData);
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        const result = yield order_model_1.default.addOrderToUser(id, validateData);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: 'null',
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const id = yield user_model_1.default.newid(userId);
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        const result = yield order_model_1.default.getAllOrder(id);
        res.status(200).json({
            success: true,
            message: 'Order fetched successfully!',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const totalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const id = yield user_model_1.default.newid(userId);
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        const result = yield order_model_1.default.totalPrice(id);
        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully!',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
exports.userController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
    addOrder,
    getAllOrder,
    totalPrice,
};
