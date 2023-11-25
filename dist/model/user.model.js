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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const fullnameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
});
const addressSchema = new mongoose_1.Schema({
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
});
const userSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullname: {
        type: fullnameSchema,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
    },
    hobbies: {
        type: [String],
        required: true,
    },
    address: {
        type: addressSchema,
        required: true,
    },
});
userSchema.statics.withoutPassword = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return this.findOne({ userId: userId }, { password: 0 });
    });
};
userSchema.statics.deleteUser = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = this.findOneAndDelete({ userId: userId });
        return result;
    });
};
userSchema.statics.updateUser = function (userId, userData) {
    return __awaiter(this, void 0, void 0, function* () {
        const filter = { userId: userId };
        return this.findOneAndUpdate(filter, userData);
    });
};
userSchema.statics.newid = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const filter = { userId: parseInt(userId) };
        const ee = yield this.findOne(filter);
        const kk = ee === null || ee === void 0 ? void 0 : ee._id;
        const pp = kk === null || kk === void 0 ? void 0 : kk.toString();
        return pp;
    });
};
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, 10);
        next();
    });
});
const user = (0, mongoose_1.model)('User', userSchema);
exports.default = user;
