import mongoose from "mongoose";

const { Schema } = mongoose;

const groupSchema = new Schema(
  {
    name: { type: String, require: true },
    members: [{ type: Schema.Types.ObjectId, ref: "users", require: true }],
    bills: [{ type: Schema.Types.ObjectId, ref: "bills", require: true }],
  },
  { timestamps: true }
);

const GroupModel = mongoose.model("groups", groupSchema);

export default GroupModel;
