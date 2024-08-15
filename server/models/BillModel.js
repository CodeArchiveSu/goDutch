import mongoose from "mongoose";

const { Schema } = mongoose;

const billSchema = new Schema(
  {
    name: { type: String, require: true },
    payer: { type: Schema.Types.ObjectId, ref: "users", require: true },
    totalAmount: { type: String, require: true },
    group_id: { type: Schema.Types.ObjectId, ref: "groups", require: true },
    bill: [
      {
        amount: { type: Number, require: true },
        user: { type: Schema.Types.ObjectId, ref: "users", require: true },
      },
    ],
  },
  { timestamps: true }
);

const BillModel = mongoose.model("bills", billSchema);

export default BillModel;
