"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderValidationSchema = zod_1.z.object({
    productName: zod_1.z.string({
        required_error: 'Product Name is required',
        invalid_type_error: 'Product Name must be a string',
    }),
    price: zod_1.z.number({
        required_error: 'Price is required',
        invalid_type_error: 'Price must be a Number',
    }),
    quantity: zod_1.z.number({
        required_error: 'Quantity is required',
        invalid_type_error: 'Quantity must be a number',
    }),
});
exports.default = orderValidationSchema;
