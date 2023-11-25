"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const fullnameSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string()
});
const addressSchema = zod_1.z.object({
    street: zod_1.z.string(),
    city: zod_1.z.string(),
    country: zod_1.z.string()
});
const userSchema = zod_1.z.object({
    useId: zod_1.z.number(),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    fullname: fullnameSchema,
    age: zod_1.z.number(),
    email: zod_1.z.string(),
    isActive: zod_1.z.enum(['active', 'inactive']),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: addressSchema
});
exports.default = userSchema;
