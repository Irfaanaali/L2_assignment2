"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const fullnameSchema = zod_1.z.object({
    firstName: zod_1.z.string({
        required_error: 'First Name is required',
        invalid_type_error: 'First Name must be a string',
    }),
    lastName: zod_1.z.string({
        required_error: 'Last Name is required',
        invalid_type_error: 'Last Name must be a string',
    }),
});
const addressSchema = zod_1.z.object({
    street: zod_1.z.string({
        required_error: 'Street is required',
        invalid_type_error: 'Street must be a string',
    }),
    city: zod_1.z.string({
        required_error: 'City is required',
        invalid_type_error: 'City must be a string',
    }),
    country: zod_1.z.string({
        required_error: 'Country is required',
        invalid_type_error: 'Country must be a string',
    }),
});
const userValidationSchema = zod_1.z.object({
    userId: zod_1.z.number({
        required_error: 'userId is required',
        invalid_type_error: 'userId must be a Number',
    }),
    username: zod_1.z.string({
        required_error: 'User Name is required',
        invalid_type_error: 'User Name must be a string',
    }),
    password: zod_1.z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
    }),
    fullname: fullnameSchema,
    age: zod_1.z.number({
        required_error: 'Age is required',
        invalid_type_error: 'Age must be a Number',
    }),
    email: zod_1.z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
    }),
    isActive: zod_1.z.boolean({
        required_error: 'IsActive is required',
        invalid_type_error: 'isActive must be a Boolean',
    }),
    hobbies: zod_1.z.array(zod_1.z.string({
        required_error: 'Hobbies is required',
        invalid_type_error: 'Hobbies must be a array of string',
    })),
    address: addressSchema,
});
exports.default = userValidationSchema;
