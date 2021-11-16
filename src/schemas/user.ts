import Joi from "joi";
import { ValidatedRequestSchema, ContainerTypes } from "express-joi-validation";
import { User, UserInternalProps } from "../types/user";

export interface UserRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: Omit<User, UserInternalProps>
}

export const UserSchema = Joi.object({
    login: Joi.string().required(),
    age: Joi.number().min(4).max(130).required(),
    password: Joi.string().pattern(/([a-z][0-9]|[0-9][a-z])+/i).required(),
});
