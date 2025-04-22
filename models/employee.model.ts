import mongoose, { model, models, Schema, Types } from 'mongoose';

export interface EmployeeInterface {
  orgId: number;
  attendance: number;
  name: string;
  mobileNo: string;
  // email: string;
  // password: string;
  address: string;
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const employeeSchema = new Schema<EmployeeInterface>(
  {
    orgId: {
      type: Number,
      required: true,
    },
    name: {
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
    attendance: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = models?.Employee || model<EmployeeInterface>('Employee', employeeSchema);

export default Employee;
