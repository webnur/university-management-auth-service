import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { User } from './user.model'
import { generateUserId } from './user.utils'
import { IUser } from './users.interface'

export const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto generate incremental id

  const id = await generateUserId()
  user.id = id
  // default password
  if (!user.password) {
    user.password = config.default_user_password as string
  }
  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new ApiError(400, 'Failed to Create user')
  }
  return createdUser
}

export default {
  createUser,
}
