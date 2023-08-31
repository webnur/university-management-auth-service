import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwt.helper';

// const loginUser = async (payload: ILoginUser) => {
//   const { id, password } = payload;
//   // check user exist
//   const isUserExist = await User.findOne(
//     { id },
//     { id: 1, password: 1, needPasswordChange: 1 }
//   ).lean();

//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User does not found!');
//   }

//   // Match Password
//   const isPasswordMatched = await bcrypt.compare(
//     password,
//     isUserExist?.password
//   );

//   if (!isPasswordMatched) {
//     throw new ApiError(httpStatus.UNAUTHORIZED, 'password is incorrect!');
//   }

//   // create access token
// };

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  // creating instance of user
  // const user = new User();
  // check user exist
  // access to our instance methods
  // const isUserExist = await user.isUserExist(id);

  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not found!');
  }

  // Match Password

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'password is incorrect!');
  }

  // create access token and refresh token
  const { id: userId, role, needsPasswordChange } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { id: userId, role: role },
    config.jwt.secret as Secret,
    config.jwt.jwt_expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { id: isUserExist?.id, role: isUserExist?.role },
    config.jwt.refresh_secret as Secret,
    config.jwt.jwt_refresh_expires_in as string
  );

  // const accessToken = Jwt.sign({
  //   id: isUserExist?.id,
  //   role: isUserExist?.role
  // }, config.jwt.refresh_secret as Secret, {
  //   expiresIn: config.jwt.jwt_refresh_expires_in
  // })
  // const refreshToken = Jwt.sign({
  //   id: isUserExist?.id,
  //   role: isUserExist?.role
  // }, config.jwt.secret as Secret, {
  //   expiresIn: config.jwt.jwt_expires_in
  // })

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    // err
    throw new ApiError(httpStatus.FORBIDDEN, 'invalid refresh  token');
  }

  // checking deleted user's refresh token
  const { id } = verifiedToken;

  const isUserExist = await User.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user docs not exist');
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.jwt_expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
