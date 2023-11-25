import  mongoose, { Schema, model } from 'mongoose';
import {
  IOrder,
  IOrderDocuments,
  IOrderModel,
} from '../interface/order.interface';

export const orderSchema = new Schema<IOrderDocuments, IOrderModel>({
  orders: [
    {
      productName: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
});





orderSchema.statics.addOrderToUser = async function (
  userId: string,
  orderData: IOrder,
): Promise<void> {
  
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const user = await this.findByIdAndUpdate(
    userId,
    {
      $push: { orders: orderData },
    },
    { new: true, upsert: true },
  );
};

orderSchema.statics.getAllOrder = async function (
  userId: string,
): Promise<IOrderDocuments | null> {
  return await this.findById(userId, { orders: 1, _id: 0 });
};
orderSchema.statics.totalPrice = async function (
  userId: string,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  const result = await this.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(userId)} },
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
};

const order = model<IOrderDocuments, IOrderModel>('Order', orderSchema);

export default order;
