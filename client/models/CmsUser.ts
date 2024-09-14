import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const CmsUser: Model<IUser> = mongoose.models.CmsUser || mongoose.model<IUser>('CmsUser', userSchema);

export default CmsUser;
