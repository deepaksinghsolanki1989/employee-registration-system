import { axiosClient } from "@/lib/actions/api";
import { SignInPayload, SignUpPayload } from "@/redux/types/auth.type";

export const signup = async (data: SignUpPayload) => {
  return await axiosClient.post("/signup", data);
};

export const signin = async (data: SignInPayload) => {
  return await axiosClient.post("/signin", data);
};
