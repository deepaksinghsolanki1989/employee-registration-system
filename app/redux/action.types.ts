// Auth action types
export const SIGNUP = "auth/signup";
export const SIGNUP_SUCCESS = "auth/signupSuccess";
export const SIGNUP_FAILED = "auth/signupFailed";

export const SIGNIN = "auth/signin";
export const SIGNIN_SUCCESS = "auth/signinSuccess";
export const SIGNIN_FAILED = "auth/signinFailed";

export const SIGNOUT = "auth/signout";

export const GET_CURRENT_USER = "auth/getCurrentUser";
export const GET_CURRENT_USER_SUCCESS = "auth/getCurrentUserSuccess";
export const GET_CURRENT_USER_FAILED = "auth/getCurrentUserFailed";

export const REFRESH_TOKEN = "auth/refreshToken";
export const REFRESH_TOKEN_SUCCESS = "auth/refreshTokenSuccess";
export const REFRESH_TOKEN_FAILED = "auth/refreshTokenFailed";

export const CHANGE_PASSWORD = "auth/changePassword";
export const CHANGE_PASSWORD_SUCCESS = "auth/changePasswordSuccess";
export const CHANGE_PASSWORD_FAILED = "auth/changePasswordFailed";

// Employee action types
export const GET_EMPLOYEES = "employees/getEmployees";
export const GET_EMPLOYEES_SUCCESS = "employees/getEmployeesSuccess";
export const GET_EMPLOYEES_FAILED = "employees/getEmployeesFailed";

export const APPROVE_EMPLOYEE = "employees/approveEmployees";
export const APPROVE_EMPLOYEE_SUCCESS = "employees/approveEmployeesSuccess";
export const APPROVE_EMPLOYEE_FAILED = "employees/approveEmployeesFailed";

export const DELETE_EMPLOYEE = "employees/deleteEmployees";
export const DELETE_EMPLOYEE_SUCCESS = "employees/deleteEmployeesSuccess";
export const DELETE_EMPLOYEE_FAILED = "employees/deleteEmployeesFailed";

// Painting Jobs action types
export const GET_PAINTING_JOBS = "paintingJobs/getPaintingJobs";
export const GET_PAINTING_JOBS_SUCCESS = "paintingJobs/getPaintingJobsSuccess";
export const GET_PAINTING_JOBS_FAILED = "paintingJobs/getPaintingJobsFailed";

export const CREATE_PAINTING_JOB = "paintingJobs/createPaintingJob";
export const CREATE_PAINTING_JOB_SUCCESS = "paintingJobs/createPaintingJobSuccess";
export const CREATE_PAINTING_JOB_FAILED = "paintingJobs/createPaintingJobFailed";

export const DELETE_PAINTING_JOB = "paintingJobs/deletePaintingJob";
export const DELETE_PAINTING_JOB_SUCCESS = "paintingJobs/deletePaintingJobSuccess";
export const DELETE_PAINTING_JOB_FAILED = "paintingJobs/deletePaintingJobFailed";
