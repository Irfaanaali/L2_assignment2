import { z } from 'zod';

const orderValidationSchema = z.object({
  productName: z.string({
    required_error: 'Product Name is required',
    invalid_type_error: 'Product Name must be a string',
  }),
  price: z.number({
    required_error: 'Price is required',
    invalid_type_error: 'Price must be a Number',
  }),
  quantity: z.number({
    required_error: 'Quantity is required',
    invalid_type_error: 'Quantity must be a number',
  }),
});

export default orderValidationSchema;
