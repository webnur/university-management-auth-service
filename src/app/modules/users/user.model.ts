import { Model, Schema, model } from 'mongoose'
import { Users } from './users.interface'

type UserModel = Model<Users, object>

const usersSchema = new Schema<Users>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

export const User = model<Users, UserModel>('Users', usersSchema)
