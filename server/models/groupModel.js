import mongoose from "mongoose";

const { Schema } = mongoose;

const groupSchema = new Schema({
  name: { type: String, require: true },
  date: { type: String, require: true },
  members: [{ type: String, require: true }],
});

const GroupModel = mongoose.model("group", groupSchema);

export default GroupModel;
