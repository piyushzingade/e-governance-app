import mongoose, { Schema, Document } from "mongoose";



enum Course {
  IT = "IT",
  CS = "CS",
  DS = "DS",
}


export interface ICourse extends Document {
  name: string;
  category: Course;
  duration: string;
  batchSize : number;
  fee: number;
}



const CourseSchema: Schema = new Schema<ICourse>({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  batchSize: {
    type: Number,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
});



export default mongoose.models.Course || mongoose.model<ICourse>("Course" , CourseSchema);