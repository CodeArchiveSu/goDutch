import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    avatar: {
      public_id: { type: String },
      url: { type: String, default: "user.png" },
    },
    groups: [{ type: Schema.Types.ObjectId, ref: "groups", require: true }],
    owned: [{ type: Schema.Types.ObjectId, ref: "bills", require: true }],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
