import mongoose, { model, models, Schema, Types } from 'mongoose';

export interface OrganizationInterface {
  name: string;
  mobileNo: string;
  email: string;
  password: string;
  gstNo: string;
  address: string;
  employeeDetails: Types.ObjectId[];
  orders: Types.ObjectId[];
  customers: Types.ObjectId[];
  products: Types.ObjectId[];
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const orgSchema = new Schema<OrganizationInterface>(
  {
    name: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gstNo: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    employeeDetails: {
      type: [Schema.Types.ObjectId],
      ref: 'Employee',
      default: [],
    },
    orders: {
      type: [Schema.Types.ObjectId],
      ref: 'Order',
      default: [],
    },
    customers: {
      type: [Schema.Types.ObjectId],
      ref: 'Customer',
      default: [],
    },
    products: {
      type: [Schema.Types.ObjectId],
      ref: 'Product',
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Organization = models?.Organization || model<OrganizationInterface>('Organization', orgSchema);

export default Organization;
