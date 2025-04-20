import mongoose, { model, models, Schema } from 'mongoose';

export interface OrganizationInterface {
  name: string;
  mobileNo: string;
  email: string;
  password: string;
  gstNo: string;
  address: string;
  employeeDetails: string;
  orders: string;
  customers: string;
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const orgSchema = new Schema<OrganizationInterface>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    employeeDetails: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
      },
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
      },
    ],
    customers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
      },
    ],
    mobileNo: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const Organization = models?.Organization || model<OrganizationInterface>('Organization', orgSchema);

export default Organization;
