import { REGISTER_USER } from "./constants";

export const RegisterUser = (payload, cb) => ({
    type: REGISTER_USER,
    payload,
    cb
})