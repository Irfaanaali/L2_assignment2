"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
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
    password: String,
    fullname: {
        type: fullnameSchema,
        required: true,
    },
    age: Number,
    email: String,
    isActive: {
        type: String,
        enum: {
            values: ['active', 'inactive'],
        },
    },
    hobbies: [String],
    address: {
        type: addressSchema,
        required: true,
    },
});
const user = (0, mongoose_1.model)('User', userSchema);
exports.default = user;
