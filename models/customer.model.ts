import mongoose, { model, models, Schema, Types } from 'mongoose';

export interface CustomerInterface {
  name: string;
  mobileNo: string;
  gstNo: string;
  address: string;
  orders: Types.ObjectId[];
  email?: string;
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema = new Schema<CustomerInterface>(
  {
    name: {
      type: String,
      required: true,
    },
    gstNo: {
      type: String,
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
    email: {
      type: String,
      required: true,
    },
    orders: {
      type: [Schema.Types.ObjectId],
      ref: 'Order',
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Order = models?.Order || model<CustomerInterface>('Order', orderSchema);

export default Order;
