import { z } from 'zod';

const fullnameSchema = z.object({
  firstName: z.string({
    required_error: 'First Name is required',
    invalid_type_error: 'First Name must be a string',
  }),
  lastName: z.string({
    required_error: 'Last Name is required',
    invalid_type_error: 'Last Name must be a string',
  }),
});

const addressSchema = z.object({
  street: z.string({
    required_error: 'Street is required',
    invalid_type_error: 'Street must be a string',
  }),
  city: z.string({
    required_error: 'City is required',
    invalid_type_error: 'City must be a string',
  }),
  country: z.string({
    required_error: 'Country is required',
    invalid_type_error: 'Country must be a string',
  }),
});

const userValidationSchema = z.object({
  userId: z.number({
    required_error: 'userId is required',
    invalid_type_error: 'userId must be a Number',
  }),
  username: z.string({
    required_error: 'User Name is required',
    invalid_type_error: 'User Name must be a string',
  }),
  password: z.string({
    required_error: 'Password is required',
    invalid_type_error: 'Password must be a string',
  }),
  fullname: fullnameSchema,
  age: z.number({
    required_error: 'Age is required',
    invalid_type_error: 'Age must be a Number',
  }),
  email: z.string({
    required_error: 'Email is required',
    invalid_type_error: 'Email must be a string',
  }),
  isActive: z.boolean({
    required_error: 'IsActive is required',
    invalid_type_error: 'isActive must be a Boolean',
  }),
  hobbies: z.array(
    z.string({
      required_error: 'Hobbies is required',
      invalid_type_error: 'Hobbies must be a array of string',
    }),
  ),
  address: addressSchema,
});

export default userValidationSchema;
