export interface AuthSliceState {
  user: {
    id: string;
    fullName: string;
    employeeCode: string;
    email: string;
  } | null;
  loading: boolean;
  error: string | string[] | null;
  success: boolean | null;
}

export interface SignUpPayload {
  fullName: string;
  employeeCode: string;
  email: string;
  password: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

// signUp
// signIn
// getCurrentUser
// refreshToken
// changePassword

export interface AuthPayload {
  data: {
    data: null;
    error: null;
    message: string;
    statusCode: number | string;
  };
}
