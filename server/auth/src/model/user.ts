import mongoose from 'mongoose';
import { toHash } from '../service/passwordService';

export interface UserAttrs {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  buildUser: (attrs: UserAttrs) => UserDoc;
}

export interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.buildUser = (attrs: UserAttrs) => {
  return new User(attrs);
};
userSchema.set('toJSON', {
  transform: function (_doc, ret) {
    ret.id = ret._id;
    delete ret.password;
    delete ret._id;
    delete ret.__v;
  },
});

userSchema.pre('save', async function (done) {
  console.log('executing pre save hook');
  if (this.isModified('password')) {
    const hashed = await toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

export const User = mongoose.model<UserDoc, UserModel>('User', userSchema);
