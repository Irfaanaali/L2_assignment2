"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
exports.orderSchema = new mongoose_1.Schema({
    orders: [
        {
            productName: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
        },
    ],
});
exports.orderSchema.statics.addOrderToUser = function (userId, orderData) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        const user = yield this.findByIdAndUpdate(userId, {
            $push: { orders: orderData },
        }, { new: true, upsert: true });
    });
};
exports.orderSchema.statics.getAllOrder = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.findById(userId, { orders: 1, _id: 0 });
    });
};
exports.orderSchema.statics.totalPrice = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield this.aggregate([
            { $match: { _id: new mongoose_1.default.Types.ObjectId(userId) } },
            {
                $unwind: '$orders',
            },
            {
                $group: {
                    _id: null,
                    totalPrice: { $sum: { $multiply: ['$orders.price', '$orders.quantity'] } },
                },
            },
            {
                $project: {
                    _id: 0,
                    totalPrice: 1,
                },
            },
        ]);
        return result[0] || 0;
    });
};
const order = (0, mongoose_1.model)('Order', exports.orderSchema);
exports.default = order;
