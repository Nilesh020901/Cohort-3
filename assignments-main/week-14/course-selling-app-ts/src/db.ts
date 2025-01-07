import mongoose, { Document, Model, Schema, Types } from "mongoose";

const { ObjectId } = Types;

//interface for schemas

interface IUser extends Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

interface IAdmin extends Document {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

interface ICourse extends Document {
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    creatorId: Types.ObjectId;
}

interface IPurchase extends Document {
    userId: Types.ObjectId;
    courseId: Types.ObjectId;

}

const userSchema = new Schema<IUser>({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
})

const adminSchema = new Schema<IAdmin>({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
})

const courseSchema = new Schema<ICourse>({
    title: { type:String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, required: true },
})

const purchaseSchema = new Schema<IPurchase>({
    userId: { type: Schema.Types.ObjectId, required: true },
  courseId: { type: Schema.Types.ObjectId, required: true },
});

const userModel: Model<IUser> = mongoose.model<IUser>("user", userSchema);
const adminModel: Model<IAdmin> = mongoose.model<IAdmin>("admin", adminSchema);
const courseModel: Model<ICourse> = mongoose.model<ICourse>("course", courseSchema);
const purchaseModel: Model<IPurchase> = mongoose.model<IPurchase>("purchase", purchaseSchema);

export {
  userModel,
  adminModel,
  courseModel,
  purchaseModel,
};