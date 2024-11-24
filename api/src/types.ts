export interface EmailOptions {
  from?: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export type SignUpResponse = {
  id: string;
  fullName: string;
  employeeCode: string;
  email: string;
};
