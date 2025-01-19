import mongoose, { Schema, Document, Types } from "mongoose";

mongoose.connect("Your Connection String");

interface IUser extends Document {
    username: string;
    password: string;
}

const userSchema: Schema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String},
});
const UserModel = mongoose.model<IUser>("User", userSchema);

interface ITag extends Document {
    title: string;
}

const tagSchema: Schema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
})
const TagModel = mongoose.model<ITag>("Tag", tagSchema);

const contentTypes = [
    "image", 
    "video", 
    "article", 
    "audio", 
    "document", 
    "presentation", 
    "spreadsheet", 
    "code-snippet", 
    "ebook", 
    "podcast", 
    "webpage"
  ]; // Extended content types  

interface IContent extends Document {
    link: String;
    type: string;
    title: string;
    tags: Types.ObjectId[];
    userId: Types.ObjectId;
}

const contentSchema: Schema = new mongoose.Schema({
    link: { type: String, required: true},
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true},
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag"}],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const ContentModel = mongoose.model<IContent>("Content", contentSchema);

interface ILink extends Document {
    hash: string;
    userId: Types.ObjectId;
}

const linkSchema: Schema = new mongoose.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const LinkModel = mongoose.model<ILink>("Link", linkSchema);

export {UserModel, TagModel, ContentModel, LinkModel};