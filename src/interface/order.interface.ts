import { Model } from 'mongoose';

interface IOrder {
  productName: string;
  price: number;
  quantity: number;
}
interface IOrderDocuments extends Document {
  orders: IOrder[];
}

interface IOrderModel extends Model<IOrderDocuments> {
  // eslint-disable-next-line no-unused-vars
  addOrderToUser(userId: string, orderData: IOrder): Promise<void>;
  // eslint-disable-next-line no-unused-vars
  getAllOrder(userId: string): Promise<IOrderDocuments>;

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  totalPrice(userId: string): Promise<any>;


 
  
}

export { IOrder, IOrderModel, IOrderDocuments };
