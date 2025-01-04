import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
  name: string;
  duration: string;
  fee: number;
}

const CourseSchema: Schema = new Schema({
  name: { type: String, required: true },
  duration: { type: String, required: true },
  fee: { type: Number, required: true },
});

export default mongoose.models.Course ||
  mongoose.model<ICourse>("Course", CourseSchema);
