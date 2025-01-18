import mongoose, { Schema, Document } from "mongoose";



export interface IFine extends Document {
  studentId: string;
  type:string;
  amount : number;
  createdAt : Date;
}



const FineSchema :Schema = new Schema ( 
  {
    studentId : {
      type : Schema.Types.ObjectId,
      ref : 'Student', 
      required :true
    },
    type : {
      type :String,
      required : true,

    },
    amount : {
      type : Number,
      required :true,
    },
    createdAt : {
      type :Date,
      default : Date.now,
    },
  },
)


export default mongoose.models.Fine || mongoose.model<IFine>("Fine" ,FineSchema);