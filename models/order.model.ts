import mongoose, { model, models, Schema, Types } from 'mongoose';

export interface Product {
  productName: string;
  quantity: number;
}

export interface OrderInterface {
  customerId: number;
  orgId: number;
  mobileNo: string;
  address: string;
  quantity: number;
  deadline: Date;
  advance: number;
  totalAmount: number;
  customer: string;
  products: Product[];
  paymentStatus: 'Paid' | 'Due';
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema = new Schema<OrderInterface>(
  {
    orgId: {
      type: Number,
      required: true,
    },
    customerId: {
      type: Number,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    customer: {
      type: String,
      required: true,
    },
    products: [
      {
        productName: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    paymentStatus: {
      type: String,
      required: true,
    },
    advance: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = models?.Order || model<OrderInterface>('Order', orderSchema);

export default Order;
